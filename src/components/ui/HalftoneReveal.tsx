"use client";

import { useEffect, useRef, useState } from "react";

interface HalftoneRevealProps {
  imageSrc: string;
  dotSize?: number;
  revealRadius?: number;
  inkColor?: [number, number, number]; // RGB 0-1
  className?: string;
  priority?: boolean;
}

export default function HalftoneReveal({
  imageSrc,
  dotSize = 10.0,
  revealRadius = 180.0,
  inkColor = [0.93, 0.92, 0.89], // #edeae4 warm white
  className = "",
}: HalftoneRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [r, g, b] = inkColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    // Enable standard alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Vertex Shader: full-screen quad
    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Halftone grid with mouse reveal spotlight
    const fsSource = `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      uniform vec2 uImageResolution;
      uniform vec2 uMouse;
      uniform float uRevealRadius;
      uniform float uDotSize;
      uniform vec3 uInkColor;
      uniform float uHoverActive;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        float canvasAspect = uResolution.x / uResolution.y;
        float imageAspect = uImageResolution.x / uImageResolution.y;

        vec2 texUv = vUv;
        if (canvasAspect < 1.0) {
          // Mobile view: prominent in middle of hero section with larger size
          float mobZoom = 2.45;
          float scale = (canvasAspect / imageAspect) * mobZoom;
          texUv.x = (vUv.x - 0.5) / mobZoom + 0.538;
          texUv.y = (vUv.y - 0.51) / scale + 0.380;
        } else {
          // Laptop / Desktop: exact original contain scaling
          if (canvasAspect > imageAspect) {
            float scale = imageAspect / canvasAspect;
            texUv.x = (vUv.x - 0.5) / scale + 0.5;
          } else {
            float scale = canvasAspect / imageAspect;
            texUv.y = vUv.y / scale;
          }
        }

        // Discard fragments outside image bounds
        if (texUv.x < 0.0 || texUv.x > 1.0 || texUv.y < 0.0 || texUv.y > 1.0) {
          discard;
        }

        vec4 texColor = texture2D(uTexture, texUv);
        if (texColor.a < 0.05) {
          discard;
        }

        // Pixel screen coordinates (gl_FragCoord)
        vec2 screenCoord = gl_FragCoord.xy;

        // Halftone dot cell
        vec2 grid = fract(screenCoord / uDotSize) - 0.5;
        float dotDist = length(grid);

        // Calculate luminance of underlying photo
        float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

        // Dot radius proportional to luminance
        float maxDotRadius = 0.52;
        float dotRadius = clamp(luminance * maxDotRadius, 0.03, maxDotRadius);
        float dotMask = smoothstep(dotRadius, dotRadius - 0.12, dotDist);

        // Distance from cursor
        float mouseDist = distance(screenCoord, uMouse);

        // Reveal window (soft edges)
        float reveal = smoothstep(uRevealRadius, uRevealRadius * 0.45, mouseDist) * uHoverActive;

        // Halftone print color
        vec3 halftoneRgb = mix(vec3(0.04, 0.04, 0.04), uInkColor, dotMask);

        // Blend halftone with full-color crisp photo
        vec3 finalRgb = mix(halftoneRgb, texColor.rgb, reveal);

        gl_FragColor = vec4(finalRgb, texColor.a);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (-1 to 1)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPositionLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uImageResolutionLoc = gl.getUniformLocation(program, "uImageResolution");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uRevealRadiusLoc = gl.getUniformLocation(program, "uRevealRadius");
    const uDotSizeLoc = gl.getUniformLocation(program, "uDotSize");
    const uInkColorLoc = gl.getUniformLocation(program, "uInkColor");
    const uHoverActiveLoc = gl.getUniformLocation(program, "uHoverActive");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");

    gl.uniform1f(uDotSizeLoc, dotSize);
    gl.uniform1f(uRevealRadiusLoc, revealRadius);
    gl.uniform3f(uInkColorLoc, r, g, b);

    // Create & upload texture
    const texture = gl.createTexture();
    const image = new Image();
    if (imageSrc.startsWith("http")) {
      image.crossOrigin = "anonymous";
    }
    image.src = imageSrc;

    let imgWidth = 1024;
    let imgHeight = 576;

    image.onerror = () => {
      console.warn("HalftoneReveal: fallback on image load for", imageSrc);
    };

    image.onload = () => {
      imgWidth = image.naturalWidth || 1024;
      imgHeight = image.naturalHeight || 576;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      setImageLoaded(true);
    };

    // Mouse coordinates tracking & smooth lerp
    let mouseTarget = { x: -1000, y: -1000 };
    let mouseCurrent = { x: -1000, y: -1000 };
    let hoverTarget = 0;
    let hoverCurrent = 0;
    let cachedRect = canvas.getBoundingClientRect();

    const updateCachedRect = () => {
      cachedRect = canvas.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseTarget = {
        x: (e.clientX - cachedRect.left) * dpr,
        y: (cachedRect.bottom - e.clientY) * dpr, // Invert Y for WebGL screen coordinates
      };
      hoverTarget = 1.0;
    };

    const handleMouseEnter = () => {
      hoverTarget = 1.0;
    };

    const handleMouseLeave = () => {
      hoverTarget = 0.0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        mouseTarget = {
          x: (touch.clientX - cachedRect.left) * dpr,
          y: (cachedRect.bottom - touch.clientY) * dpr,
        };
        hoverTarget = 1.0;
      }
    };

    const handleTouchEnd = () => {
      hoverTarget = 0.0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", updateCachedRect, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Resize handling
    let dpr = 1;
    const resize = () => {
      updateCachedRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(container.clientWidth * dpr);
      const displayHeight = Math.floor(container.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    // Render loop with visibility throttling
    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;

      const currentTime = (performance.now() - startTime) * 0.001;

      // Smooth lerp mouse
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.15;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.15;
      hoverCurrent += (hoverTarget - hoverCurrent) * 0.08;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uImageResolutionLoc, imgWidth, imgHeight);
      gl.uniform2f(uMouseLoc, mouseCurrent.x, mouseCurrent.y);
      gl.uniform1f(uHoverActiveLoc, hoverCurrent);
      gl.uniform1f(uTimeLoc, currentTime);
      gl.uniform1f(uRevealRadiusLoc, revealRadius * dpr);
      gl.uniform1f(uDotSizeLoc, dotSize * dpr);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          updateCachedRect();
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("scroll", updateCachedRect);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
    };
  }, [imageSrc, dotSize, revealRadius, r, g, b]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-auto"
      />
    </div>
  );
}

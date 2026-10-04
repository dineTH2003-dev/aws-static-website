import { useEffect, useRef } from "react";

export default function LightPillar({
  topColor = "#84CC16",
  bottomColor = "#F43F5E",
  intensity = 1,
  rotationSpeed = 0.3,
  interactive = false,
  glowAmount = 0.002,
  pillarWidth = 3.1,
  pillarHeight = 0.4,
  noiseIntensity = 0,
  pillarRotation = 25,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
    if (!gl) return;

    let animId;
    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const startTime = performance.now();

    const resize = () => {
      const p = canvas.parentElement;
      const w = p ? p.clientWidth : 1080;
      const h = p ? p.clientHeight : 1080;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1.0 - (e.clientY - r.top) / r.height;
    };
    if (interactive) window.addEventListener("mousemove", onMove);

    /* ── shaders ── */
    const vert = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main(){
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // fBm turbulence flame shader matching the react-bits look
    const frag = `
      precision highp float;
      varying vec2 v_uv;

      uniform float u_time;
      uniform vec2  u_res;
      uniform vec3  u_colA;   // topColor
      uniform vec3  u_colB;   // bottomColor
      uniform float u_intensity;
      uniform float u_rotSpeed;
      uniform float u_pWidth;
      uniform float u_pHeight;
      uniform float u_pRot;
      uniform vec2  u_mouse;

      // --- hash / noise helpers ---
      vec2 hash2(vec2 p){
        p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
        return -1.0 + 2.0 * fract(sin(p)*43758.5453123);
      }
      float gnoise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(dot(hash2(i+vec2(0,0)),f-vec2(0,0)),
                       dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),
                   mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),
                       dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
      }

      // fBm — 6 octaves of turbulence
      float fbm(vec2 p){
        float v = 0.0, a = 0.5;
        mat2 rot = mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
        for(int i=0;i<6;i++){
          v += a * gnoise(p);
          p  = rot * p * 2.1;
          a *= 0.5;
        }
        return v;
      }

      mat2 rot2(float a){ return mat2(cos(a),-sin(a),sin(a),cos(a)); }

      void main(){
        float aspect = u_res.x / u_res.y;
        vec2 uv = v_uv;

        // aspect-corrected centred coords
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

        // mouse warp
        if(u_mouse.x >= 0.0){
          vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);
          p -= m * 0.10;
        }

        // tilt the pillar
        float baseAngle = u_pRot * 3.14159265 / 180.0;
        vec2 q = rot2(baseAngle) * p;

        // slow spin
        float t = u_time * u_rotSpeed;

        // --- turbulence displacement ---
        // two layers of fbm warping for the twisting flame look
        float scale = 2.5 + u_pWidth * 0.3;
        vec2 q1 = q * scale + vec2(0.0, -u_time * 0.18);
        float f1 = fbm(q1 + vec2(fbm(q1 + vec2(t*0.3, t*0.2)),
                                  fbm(q1 + vec2(t*0.2, t*0.3))));

        vec2 q2 = rot2(t * 0.4) * q * (scale * 0.8) + vec2(0.0, -u_time * 0.22);
        float f2 = fbm(q2 + vec2(fbm(q2), fbm(q2 + vec2(1.7, 9.2))));

        float field = mix(f1, f2, 0.45) * 0.5 + 0.5; // 0..1

        // pillar mask: narrow corridor along q.x
        float hw   = 0.04 * u_pWidth;
        float mask = smoothstep(hw * 2.5, 0.0, abs(q.x));

        // vertical fade — brighter in the middle, fade to top/bottom
        float vFade = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.65, uv.y);
        // extra long tail downward
        vFade = max(vFade, smoothstep(0.0, 0.45, uv.y) * 0.4);

        // core beam
        float core = pow(smoothstep(hw, 0.0, abs(q.x)), 1.6);

        // outer glow that follows the turbulence displacement
        float glowW = hw * (4.0 + u_pWidth);
        float outerGlow = exp(-abs(q.x + (f1-0.5)*hw*3.0) / glowW);
        outerGlow *= exp(-abs(q.x - (f2-0.5)*hw*3.0) / (glowW * 1.5));

        // combine
        float brightness = (
          core        * 1.0 +
          outerGlow   * 0.7 * field +
          mask        * field * 0.5
        ) * vFade * u_intensity;

        // colour: vertical gradient along original UV
        vec3 col = mix(u_colB, u_colA, uv.y);

        // tint darker regions toward the secondary colour
        col = mix(col * 0.4, col, field * 0.8 + 0.2);

        brightness = clamp(brightness, 0.0, 1.5);
        vec3 finalCol = col * brightness;

        // additive alpha
        float alpha = clamp(brightness * 0.9, 0.0, 1.0);
        gl_FragColor = vec4(finalCol, alpha);
      }
    `;

    function mkShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(s));
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
      console.error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {
      time:      gl.getUniformLocation(prog, "u_time"),
      res:       gl.getUniformLocation(prog, "u_res"),
      colA:      gl.getUniformLocation(prog, "u_colA"),
      colB:      gl.getUniformLocation(prog, "u_colB"),
      intensity: gl.getUniformLocation(prog, "u_intensity"),
      rotSpeed:  gl.getUniformLocation(prog, "u_rotSpeed"),
      pWidth:    gl.getUniformLocation(prog, "u_pWidth"),
      pHeight:   gl.getUniformLocation(prog, "u_pHeight"),
      pRot:      gl.getUniformLocation(prog, "u_pRot"),
      mouse:     gl.getUniformLocation(prog, "u_mouse"),
    };

    const hex = (h) => [
      parseInt(h.slice(1,3),16)/255,
      parseInt(h.slice(3,5),16)/255,
      parseInt(h.slice(5,7),16)/255,
    ];
    const colA = hex(topColor);
    const colB = hex(bottomColor);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // additive blending = glow

    const draw = (now) => {
      const t = (now - startTime) / 1000;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;

      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(U.time, t);
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform3fv(U.colA, colA);
      gl.uniform3fv(U.colB, colB);
      gl.uniform1f(U.intensity, intensity);
      gl.uniform1f(U.rotSpeed, rotationSpeed);
      gl.uniform1f(U.pWidth, pillarWidth);
      gl.uniform1f(U.pHeight, pillarHeight);
      gl.uniform1f(U.pRot, pillarRotation);
      gl.uniform2f(U.mouse,
        interactive ? mouse.x : -1.0,
        interactive ? mouse.y : -1.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (interactive) window.removeEventListener("mousemove", onMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [topColor, bottomColor, intensity, rotationSpeed, interactive,
      glowAmount, pillarWidth, pillarHeight, noiseIntensity, pillarRotation]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

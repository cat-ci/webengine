const THREE_LOADED = new Promise((e, t) => {
  if (window.THREE) e();
  else {
      let s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js", s.onload = () => e(), s.onerror = () => t(Error("Failed to load Three.js")), document.head.appendChild(s)
  }
});
class NormalImg extends HTMLElement {
  constructor() {
      super(), this._shadow = this.attachShadow({
          mode: "open"
      });
      let e = document.createElement("style");
      e.textContent = `
      :host { display: block; position: relative; }
      canvas { width: 100%; height: 100%; display: block; }
    `, this._shadow.appendChild(e), this._canvas = document.createElement("canvas"), this._shadow.appendChild(this._canvas)
  }
  async connectedCallback() {
      await THREE_LOADED, this._readAttributes(), this._initThree()
  }
  disconnectedCallback() {
      this._resizeObserver && this._resizeObserver.disconnect()
  }
  _readAttributes() {
      if (this._normalSrc = this.getAttribute("normal-src"), this._colorSrc = this.getAttribute("color-src"), !this._normalSrc || !this._colorSrc) {
          console.error('<normal-img> requires both "normal-src" and "color-src".');
          return
      }
      let e = document.querySelector('define[feature="normal-images"][enabled="true"] define[defaults]'),
          t = [0, 0, 2],
          s = .5,
          i = .2,
          r = "#ffffff",
          a = 1,
          h = 0;
      if (e) {
          let n = t => e.querySelector(t)?.getAttribute("value");
          n("light") && (t = n("light").split(",").map(e => parseFloat(e))), n("intensity") && (s = parseFloat(n("intensity"))), n("opacity") && (i = parseFloat(n("opacity"))), n("light-color") && (r = n("light-color")), n("roughness") && (a = parseFloat(n("roughness"))), n("metalness") && (h = parseFloat(n("metalness")))
      }
      let o = e => this.getAttribute(e);
      this._light = o("light") ? o("light").split(",").map(e => parseFloat(e)) : t, this._intensity = o("intensity") ? parseFloat(o("intensity")) : s, this._opacity = o("opacity") ? parseFloat(o("opacity")) : i, this._lightColor = o("light-color") || r, this._roughness = o("roughness") ? parseFloat(o("roughness")) : a, this._metalness = o("metalness") ? parseFloat(o("metalness")) : h
  }
  _initThree() {
      let e = window.THREE;
      this._renderer = new e.WebGLRenderer({
          canvas: this._canvas,
          alpha: !0,
          antialias: !0
      }), this._scene = new e.Scene, this._camera = new e.OrthographicCamera, this._scene.add(this._camera);
      let t = new e.TextureLoader,
          s, i, r = () => {
              s && i && (this._setupScene(s, i), this._setupResizeObserver(), this._onResize())
          };
      t.load(this._colorSrc, e => {
          s = e, r()
      }), t.load(this._normalSrc, e => {
          i = e, r()
      })
  }
  _setupScene(e, t) {
      let s = window.THREE;
      this._colorMat = new s.MeshBasicMaterial({
          map: e
      }), this._shadeMat = new s.MeshStandardMaterial({
          color: 16777215,
          metalness: this._metalness,
          roughness: this._roughness,
          normalMap: t,
          normalScale: new s.Vector2(this._intensity, this._intensity),
          transparent: !0,
          opacity: this._opacity,
          depthWrite: !1
      });
      let i = new s.PlaneGeometry(1, 1);
      this._meshColor = new s.Mesh(i, this._colorMat), this._meshShade = new s.Mesh(i, this._shadeMat), this._meshShade.position.z = .01, this._scene.add(this._meshColor), this._scene.add(this._meshShade);
      let r = new s.DirectionalLight(new s.Color(this._lightColor), 1);
      r.position.set(...this._light), this._scene.add(r)
  }
  _setupResizeObserver() {
      this._resizeObserver || (this._resizeObserver = new ResizeObserver(() => this._onResize()), this._resizeObserver.observe(this))
  }
  _onResize() {
      let e = this.clientWidth,
          t = this.clientHeight;
      if (0 === e || 0 === t) return;
      let s = window.devicePixelRatio || 1;
      this._renderer.setSize(Math.floor(e * s), Math.floor(t * s), !1), this._camera.left = -e / 2, this._camera.right = e / 2, this._camera.top = t / 2, this._camera.bottom = -t / 2, this._camera.near = -1e3, this._camera.far = 1e3, this._camera.position.z = 100, this._camera.updateProjectionMatrix(), this._meshColor.scale.set(e, t, 1), this._meshShade.scale.set(e, t, 1), this._renderer.render(this._scene, this._camera)
  }
}
customElements.define("normal-img", NormalImg);

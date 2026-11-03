// Adapted from unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.
// Split into modules; see ../../UPSTREAM.md for source and changes.
export function controller() {
  return `  const kinds = { audit, spacing, details };
  const managed = new WeakMap();
  let current = null;
  let stepping = false;

  window.__story = {
    install() {
      const style = document.createElement("style");
      style.id = "story-style";
      style.textContent = css;
      document.head.appendChild(style);
      document.querySelectorAll(".swap > .to").forEach(letters);
      document.querySelectorAll("[data-out]").forEach((el) => {
        const b = box(el);
        if (getComputedStyle(el).display === "inline") el.style.display = "inline-block";
        el.style.overflow = "hidden";
        el.style.maxHeight = Math.ceil(b.height) + "px";
        el.style.maxWidth = Math.ceil(b.width) + "px";
      });
      document.querySelectorAll("body *").forEach((el) => {
        const b = box(el);
        const wave = Math.round(Math.min(420, Math.max(0, b.top) / innerHeight * 320 + Math.max(0, b.left) / innerWidth * 100));
        el.style.setProperty("--wave", wave + "ms");
      });
      document.querySelectorAll("*").forEach((el) => {
        if (getComputedStyle(el).animationName !== "none") el.style.animationPlayState = "paused";
      });
      document.documentElement.offsetHeight;
      document.documentElement.classList.add("story-live");
      const follow = () => {
        if (current && !stepping) current();
        requestAnimationFrame(follow);
      };
      requestAnimationFrame(follow);
    },
    reset() {
      const root = document.documentElement;
      root.classList.remove("story-live", ...steps.map((_, index) => "s" + (index + 1)));
      layer().className = "";
      layer().innerHTML = "";
      current = null;
      root.offsetHeight;
      root.classList.add("story-live");
    },
    tick(ms) {
      stepping = true;
      for (const animation of [...document.getAnimations(), ...window.parent.document.getAnimations()]) {
        if (!managed.has(animation)) {
          if (animation.playState !== "running") continue;
          managed.set(animation, ms);
          animation.pause();
        }
        const time = ms - managed.get(animation);
        const end = animation.effect ? animation.effect.getComputedTiming().endTime : Infinity;
        if (Number.isFinite(end) && time >= end) animation.finish();
        else animation.currentTime = time;
      }
      if (current) current();
    },
    step(k) {
      document.documentElement.classList.add("s" + k);
    },
    show(kind) {
      const node = layer();
      node.className = "";
      node.innerHTML = "";
      const update = (kinds[kind] || (() => {}))();
      current = typeof update === "function" ? update : null;
      if (current) current();
      node.offsetHeight;
      node.classList.add("s-on");
    },
    settle() {
      layer().classList.add("s-on", "s-fixed");
    },
    clear() {
      layer().classList.remove("s-on");
    },
  };
})();
`;
}

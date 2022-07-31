export default function scrollSmooth(scrollRef, { speed: speedVal }) {
  const scrollable = scrollRef.current;
  let current = 0;
  let target = 0;
  let ease = speedVal;

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }
  const init = () => {
    document.body.style.height = `${
      scrollable.getBoundingClientRect().height
    }px`;
  };
  const smoothScroll = () => {
    target = window.scrollY;
    current = lerp(current, target, ease);
    scrollable.style.transform = `translate3d(0, ${-current}px, 0)`;
    requestAnimationFrame(smoothScroll);
  };
  init();
  smoothScroll();
}

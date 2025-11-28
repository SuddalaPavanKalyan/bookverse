import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export function useCustomSwipeable<T>(items: T[]) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i < items.length - 1 ? i + 1 : i));
  const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));
  const reset = () => setIndex(0);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    delta: 20,
    trackTouch: true,
    trackMouse: false,
    touchEventOptions: { passive: false },
  });

  return {
    index,
    item: items[index],
    next,
    prev,
    reset,
    setIndex, // ← added
    handlers,
  };
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScreenWidth } from "./screenSlice";
import type { AppDispatch, RootState } from "./store";

export const useScreenWidthTracker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const width = useSelector((state: RootState) => state.screen.width);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return width;
};

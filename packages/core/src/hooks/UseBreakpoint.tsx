import { useContext } from "react";
import { useWindowSize } from "usehooks-ts"
import { ValenceContext } from "..";
import { Breakpoint } from "@valence-ui/utils";


export function useBreakpoint(): Breakpoint { 
  const theme = useContext(ValenceContext);
  const { width, height } = useWindowSize();

  const isMobile: boolean = width <= theme.breakpoints.mobileWidth;
  const isMobileTall: boolean = isMobile && height >= theme.breakpoints.mobileTallHeight;

  return {
    isMobile: isMobile,
    isMobileTall: isMobileTall,
  }
}
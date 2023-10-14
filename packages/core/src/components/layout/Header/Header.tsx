import { useContext, useState } from "react";
import { Flex, FlexProps } from "../Flex";
import { ValenceContext, useBreakpoint } from "../../..";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import styled from "styled-components";
import { getReactiveProp } from "@valence-ui/utils";

export type HeaderProps = FlexProps & {
  /** The height of this header for regular devices. Defaults to `100`. */
  regularHeight?: number;
  /** The height of this header for tall mobile devices. Defaults to `150`. */
  tallHeight?: number;
  /** The height of this header when it has been compacted. Defaults to `75`. */
  compactHeight?: number;

  /** Whether this header should compact when the user scrolls down (mobile). Defaults to `true`. */
  compactOnScroll?: boolean;
}

function interpolateHeight(max: number, min: number, scrollY: number) {
  return Math.max(max + scrollY, min);
}


/** A layout component that helps position `Title` and similar components.
 * 
 * On desktop devices, the `Header` will act as a static container that can be placed anywhere and will scroll with the content. On mobile devices, however, the `Header` will become fixed tot he top of the screen and can shrink as the user scrolls.
 */
export function Header(props: HeaderProps) {
  const theme = useContext(ValenceContext);


  // Defaults
  const {
    regularHeight = 100,
    tallHeight = 150,
    compactHeight = 75,
    compactOnScroll = true,

    backgroundColor = theme.getColor("white")?.base,

    children,
    style,
    ...rest
  } = props;


  // Hooks & States
  const breakpoint = useBreakpoint();
  const [height, setHeight] = useState(
    props.height ?? breakpoint.isMobileTall ? tallHeight : regularHeight,
  );


  // Scroll listener
  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (!compactOnScroll || !breakpoint.isMobile) return;
      setHeight(interpolateHeight(
        props.height ?? breakpoint.isMobileTall ? tallHeight : regularHeight,
        compactHeight,
        (prevPos.y + currPos.y) / 2,
      ));
    }
  )


  // Styles
  const StyledHeader = styled.header({
    backgroundColor: getReactiveProp(backgroundColor, breakpoint),
    position: breakpoint.isMobile ? "fixed" : undefined,
    top: 0,
    zIndex: 150,
    width: "100%",

    ...style
  });


  return (
    <StyledHeader
      as={Flex}
      direction="column"
      justify="center"
      height={height}

      {...rest}
    >
      {children}
    </StyledHeader>
  )
}
import { ReactNode, useContext } from "react";
import { CSSProperties } from "styled-components";
import { ComponentSize, GenericReactiveLayoutProps, ReactiveProp } from "@valence-ui/utils";
import { Flex, Header, ValenceContext, useBreakpoint } from "@valence-ui/core";

export type AppContainerProps = GenericReactiveLayoutProps & {
  /** The primary root navigation element. This element should be consistent across pages; its recommended to be based off the `<Nav />` component. */
  nav?: ReactNode;
  /** The header containing the `<h1>` for this page. */
  header: ReactNode;
  /** An optional sidebar element used for navigation or page-level actions. */
  sidebar?: ReactNode;

  /** The border radius of the page container. Defaults to `5px` larger than the theme default. */
  radius?: ComponentSize;

  /** Properties to apply to the nav container element */
  navContainerProps?: GenericReactiveLayoutProps;
  /** Properties to apply to the page container element */
  pageProps?: GenericReactiveLayoutProps;

  /** The maximum width of this page's content */
  contentWidth?: number;
  /** The width of the sidebar element */
  sidebarWidth?: number;
  /** The width of the nav element */
  navWidth?: number;
}


/**
 * The `AppContainer` component is a layout component that provides a consistent layout for pages in the application. It includes a navigation element, a header element, and an optional sidebar element. The `AppContainer` component is responsive and adjusts its layout based on the screen size.
 */
export function AppContainer(props: AppContainerProps) {
  const theme = useContext(ValenceContext);
  const breakpoint = useBreakpoint();


  // Defaults
  const {
    nav,
    header,
    sidebar,
    radius = theme.defaultRadius,
    navContainerProps,
    pageProps,

    contentWidth = 700,
    sidebarWidth = 270,
    navWidth = 65,

    children,
    ...rest
  } = props;

  const borderRadius = theme.sizeClasses.radius[radius] as number + 5;


  // Styles
  const pageContainerStyle: ReactiveProp<CSSProperties> = {
    default: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
    }, mobile: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100vw",
      zIndex: 999,
    }
  };
  const sidebarContainerStyle: ReactiveProp<CSSProperties> = {
    default: {
      width: sidebar ? sidebarWidth : 0,
      backgroundColor: theme.getColor("white")?.base,
      borderRadius: `${borderRadius}px 0px 0px ${borderRadius}px`,
      padding: 10,
    }, mobile: {
      backgroundColor: theme.getColor("white")?.base,
      borderRadius: `0px 0px ${borderRadius}px ${borderRadius}px`,
      overflow: "auto",
      padding: `0px 10px`,
    }
  };
  const contentContainerStyle: ReactiveProp<CSSProperties> = {
    default: {
      backgroundColor: theme.getColor("white")?.base,
      paddingLeft: props.sidebar ? sidebarWidth + navWidth : navWidth,
      paddingRight: 30,
      width: "100vw",
    }, mobile: {
      backgroundColor: theme.getColor("white")?.base,
      padding: 20,
    }
  };
  const contentStyle: CSSProperties = {
    width: `min(${contentWidth}px, 100%)`,
    minHeight: "100vh"
  }


  return (
    <>
      {/* Nav & sidebar */}
      <Flex
        direction={{ default: "row", mobile: "column-reverse" }}
        backgroundColor="primary"
        style={pageContainerStyle}
        gap={0}
        {...rest}
      >
        {/* Nav */}
        <Flex
          direction="column"
          align="center"
          margin={10}
          {...navContainerProps}
        >
          {nav}
        </Flex>

        {/* Sidebar */}
        <Flex
          direction="column"
          style={sidebarContainerStyle}
        >
          {sidebar &&
            <>
              {!breakpoint.isMobile && header}
              {sidebar}
            </>
          }
        </Flex>
      </Flex>


      {/* Page content */}
      <Flex
        align="center"
        justify="center"
        grow={true}
        style={contentContainerStyle}
      >
        <Flex
          direction="column"
          style={contentStyle}
          {...pageProps}
        >
          {!props.sidebar || breakpoint.isMobile ? header : <Header />}
          {children}
        </Flex>
      </Flex>
    </>
  )
}
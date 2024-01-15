import React, { forwardRef } from "react";
import { useValence } from "../../../ValenceProvider";
import { useResponsiveProps } from "../../../responsive";
/** This is the new wrapper component for Tabler Icons, designed to pass them
 * the necessary props to conform with the theme standards. This component
 * replaces the `useDefaultIconProps` hook.
 *
 * ```tsx
 * <Icon color="black">
 *  <Icon123 />
 * </Icon>
 * ```
*/
export const Icon = forwardRef(function Icon(props, ref) {
    const theme = useValence();
    const { size = theme.getSize("iconSize", theme.defaults.size), stroke = 1.5, color, children, } = useResponsiveProps(props);
    if (children === undefined)
        return children;
    return React.cloneElement(children, {
        size: size,
        stroke: stroke,
        color: color ? theme.getColorHex(color) : undefined,
        ref,
    });
});

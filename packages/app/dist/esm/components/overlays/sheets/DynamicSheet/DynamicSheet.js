import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef } from "react";
import { SideSheet } from "../SideSheet";
import { BottomSheet } from "../BottomSheet";
import { useResponsiveProps } from "@valence-ui/core";
export const DynamicSheet = forwardRef(function DynamicSheet(props, ref) {
    // Defaults
    const { type = { default: "standard", desktopThin: "overlay", mobile: "bottom" }, disclosure, title, sideSheetProps, bottomSheetProps, children } = useResponsiveProps(props);
    return (_jsx(_Fragment, { children: type === "bottom" ? (_jsx(BottomSheet, Object.assign({ disclosure: disclosure, title: title }, bottomSheetProps, { children: children }))) : (_jsx(SideSheet, Object.assign({ type: type, disclosure: disclosure, title: title }, sideSheetProps, { children: children }))) }));
});

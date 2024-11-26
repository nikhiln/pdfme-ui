import { Plugin } from "@pdfme/common";
import React from "react";
interface PluginIconProps {
    plugin: Plugin<any>;
    label: string;
    size?: number;
    styles?: React.CSSProperties;
}
declare const PluginIcon: (props: PluginIconProps) => React.JSX.Element;
export default PluginIcon;

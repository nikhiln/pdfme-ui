import { Plugin } from "@pdfme/common";
import { Tooltip, theme } from "antd";
import React, { useContext } from "react";
import { OptionsContext } from "../../contexts";

interface PluginIconProps {
  plugin: Plugin<any>;
  label: string;
  size?: number;
  styles?: React.CSSProperties;
}

const getWithModifiedSize = (
  htmlString: string,
  label: string,
  size: number,
  styles?: React.CSSProperties
) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const modifyNode = (node: HTMLElement) => {
    if (node.tagName === "SVG" || node.tagName === "svg") {
      node.setAttribute("width", size.toString());
      node.setAttribute("height", size.toString());
    }
    Array.from(node.children).forEach((child) =>
      modifyNode(child as HTMLElement)
    );
  };

  Array.from(doc.body.children).forEach((child) =>
    modifyNode(child as HTMLElement)
  );

  return (
    <div
      style={styles}
      dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
    />
  );
};

const PluginIcon = (props: PluginIconProps) => {
  const { plugin, label, size, styles } = props;
  const options = useContext(OptionsContext);
  const icon =
    options.icons?.[plugin.propPanel.defaultSchema.type] ?? plugin.icon;
  const iconStyles = {
    color: "inherit",
    display: "flex",
    justifyContent: "center",
    marginRight: "4px",
  };

  const textStyles = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: 12,
    flexShrink: 1,
    minWidth: 0,
  };

  const renderedIcon = icon ? (
    size ? (
      getWithModifiedSize(icon, label, size, iconStyles)
    ) : (
      <div style={iconStyles} dangerouslySetInnerHTML={{ __html: icon }} />
    )
  ) : undefined;

  return (
    <Tooltip
      title={label}
      destroyTooltipOnHide
      overlayStyle={{
        fontSize: "12px",
      }}
      arrow={false}
      placement="left"
    >
      <div
        style={{
          ...styles,
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          padding: "8px",
        }}
      >
        {renderedIcon}
        <div style={{ ...textStyles }}>{label}</div>
      </div>
    </Tooltip>
  );
};

export default PluginIcon;

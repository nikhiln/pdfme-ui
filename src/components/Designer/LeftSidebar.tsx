import React, { useContext, useState, useEffect, useMemo } from "react";
import { Schema, Plugin, BasePdf } from "@pdfme/common";
import { theme, Button, Input } from "antd";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Renderer from "../Renderer";
import { LEFT_SIDEBAR_WIDTH } from "../../constants";
import { PluginsRegistry } from "../../contexts";
import PluginIcon from "./PluginIcon";

const Draggable = (props: {
  plugin: Plugin<any>;
  scale: number;
  basePdf: BasePdf;
  children: React.ReactNode;
}) => {
  const { scale, basePdf, plugin } = props;
  const { token } = theme.useToken();
  const defaultSchema = plugin.propPanel.defaultSchema as Schema;
  const draggable = useDraggable({
    id: defaultSchema.type,
    data: defaultSchema,
  });
  const { listeners, setNodeRef, attributes, transform, isDragging } =
    draggable;
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {isDragging && (
        <div style={{ transform: `scale(${scale})` }}>
          <Renderer
            schema={{ ...defaultSchema, id: defaultSchema.type }}
            basePdf={basePdf}
            value={defaultSchema.content || ""}
            onChangeHoveringSchemaId={() => {
              void 0;
            }}
            mode={"viewer"}
            outline={`1px solid ${token.colorPrimary}`}
            scale={scale}
          />
        </div>
      )}
      <div style={{ visibility: isDragging ? "hidden" : "visible" }}>
        {props.children}
      </div>
    </div>
  );
};

const LeftSidebar = ({
  height,
  scale,
  basePdf,
}: {
  height: number;
  scale: number;
  basePdf: BasePdf;
}) => {
  const { token } = theme.useToken();
  const pluginsRegistry = useContext(PluginsRegistry);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const [search, setSearch] = useState("");
  const filteredPlugins = useMemo(
    () =>
      Object.entries(pluginsRegistry).filter(([label, plugin]) => {
        if (!plugin?.propPanel.defaultSchema) return false;
        return !search || label.toLowerCase().includes(search.toLowerCase());
      }),
    [search, pluginsRegistry]
  );

  const { Search } = Input;

  return (
    <div
      style={{
        left: 0,
        right: 0,
        position: "absolute",
        zIndex: 1,
        height,
        width: LEFT_SIDEBAR_WIDTH,
        background: token.colorBgLayout,
        textAlign: "center",
        overflow: isDragging ? "visible" : "auto",
      }}
    >
      <div style={{ height: "2rem", padding: "8px", display: "flex" }}>
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          allowClear
          placeholder="Search..."
        />
      </div>

      {filteredPlugins.map(([label, plugin]) => {
        if (!plugin?.propPanel.defaultSchema) return null;

        return (
          <Draggable
            key={label}
            scale={scale}
            basePdf={basePdf}
            plugin={plugin}
          >
            <Button
              onMouseDown={() => setIsDragging(true)}
              style={{
                width: "90%",
                height: 35,
                marginTop: "0.25rem",
                padding: "0px",
              }}
            >
              <PluginIcon plugin={plugin} label={label} size={16} />
            </Button>
          </Draggable>
        );
      })}
    </div>
  );
};

export default LeftSidebar;

import { BLANK_PDF } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { Button } from "antd";
import { Designer } from "pdfme-ui/";
import { useEffect, useRef } from "react";
import { utility } from "./plugins";

const DesignerDemo = () => {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);

  const plugins = {
    ["Utilitiy"]: utility,
  };

  useEffect(() => {
    if (!designerRef.current) {
      return;
    }
    const template = {
      schemas: [],
      basePdf: BLANK_PDF,
    };

    designer.current = new Designer({
      domContainer: designerRef.current,
      template,
      plugins,
    });

    return () => {
      designer.current?.destroy();
    };
  }, [designerRef]);

  const downloadPdf = () => {
    const inputs = [{ a: "a1", b: "b1", c: "c1" }];
    const template = designer.current?.getTemplate();
    if (!template) {
      return;
    }
    generate({ template, inputs, plugins }).then((pdf) => {
      // Browser
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    });
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Button onClick={downloadPdf}>Download</Button>
      <div ref={designerRef} style={{ width: "100%", height: `calc(100vh)` }} />
    </div>
  );
};

export default DesignerDemo;

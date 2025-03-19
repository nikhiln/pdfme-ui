import { BLANK_PDF } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { Button } from "antd";
import { Designer } from "pdfme-ui/";
import { useEffect, useRef } from "react";
import { checkboxField, signature, textField, utility } from "./plugins";

const DesignerDemo = () => {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);

  const plugins = {
    ["Utilitiy"]: utility,
    "Text Field": textField,
    Checkbox: checkboxField,
    Signature: signature,
  };

  useEffect(() => {
    if (!designerRef.current) {
      return;
    }
    const template = {
      schemas: [
        [
          {
            rotate: 0,
            backgroundColor: "",
            valueExpression: "signature",
            readOnlyValue: "signature",
            underline: false,
            editable: false,
            readOnly: true,
            type: "signature",
            content: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="153.64366149902344 45.37834930419922 151.46934509277344 70.76083374023438" width="536" height="268"><path d="M 224.563,67.078 C 224.371,71.587 224.438,71.588 224.313,76.098" stroke-width="5.366" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 224.313,76.098 C 224.313,81.191 224.246,81.190 224.313,86.285" stroke-width="3.988" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 224.313,86.285 C 224.313,91.283 224.313,91.283 224.313,96.281" stroke-width="3.720" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 224.313,96.281 C 224.313,102.166 224.313,102.166 224.313,108.051" stroke-width="3.491" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 224.313,108.051 C 224.313,111.629 224.313,111.629 224.313,115.207" stroke-width="3.806" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 223.230,71.160 C 225.791,73.566 225.848,73.498 228.465,75.836" stroke-width="5.412" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 228.465,75.836 C 230.507,77.434 230.441,77.513 232.531,79.055" stroke-width="4.591" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 232.531,79.055 C 234.872,81.080 234.943,80.986 237.336,82.941" stroke-width="4.255" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 237.336,82.941 C 239.927,84.819 239.887,84.869 242.563,86.633" stroke-width="4.260" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 242.563,86.633 C 245.744,89.187 245.882,88.917 249.246,91.137" stroke-width="3.939" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 249.246,91.137 C 253.403,94.273 251.637,92.468 254.348,93.195" stroke-width="4.666" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 254.348,93.195 C 254.416,89.599 255.551,91.822 253.543,86.234" stroke-width="5.006" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 253.543,86.234 C 252.065,82.195 252.471,82.105 250.457,78.207" stroke-width="4.043" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 250.457,78.207 C 248.050,72.059 247.989,72.089 245.391,66.023" stroke-width="3.387" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 245.391,66.023 C 243.702,62.156 243.693,62.172 241.742,58.434" stroke-width="3.590" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 241.742,58.434 C 240.317,55.059 240.081,55.279 238.148,52.270" stroke-width="3.843" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 238.148,52.270 C 236.222,49.272 236.174,49.731 233.457,47.777" stroke-width="3.999" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 233.457,47.777 C 230.032,46.349 230.381,46.114 226.465,45.953" stroke-width="3.911" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 226.465,45.953 C 220.681,45.122 220.817,45.326 215.027,45.730" stroke-width="3.510" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 215.027,45.730 C 207.223,46.675 207.329,46.559 199.762,48.828" stroke-width="3.021" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 199.762,48.828 C 191.627,51.659 191.516,51.208 183.613,54.797" stroke-width="2.859" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 183.613,54.797 C 177.245,57.311 177.244,57.290 170.996,60.090" stroke-width="3.035" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 170.996,60.090 C 166.317,62.073 166.370,62.147 161.863,64.469" stroke-width="3.362" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 161.863,64.469 C 156.863,65.393 158.547,66.253 155.457,68.449" stroke-width="3.672" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 155.457,68.449 C 152.949,74.797 153.344,73.042 154.824,79.766" stroke-width="4.018" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 154.824,79.766 C 159.045,86.259 157.355,86.469 164.270,91.793" stroke-width="3.215" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 164.270,91.793 C 168.899,96.795 168.844,96.638 174.422,100.523" stroke-width="3.167" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 174.422,100.523 C 182.383,106.458 182.413,105.918 191.297,110.039" stroke-width="2.704" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 191.297,110.039 C 200.897,113.695 200.576,113.767 210.809,115.141" stroke-width="2.611" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 210.809,115.141 C 220.149,116.271 219.928,116.471 229.359,115.590" stroke-width="2.665" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 229.359,115.590 C 239.181,114.809 239.022,114.875 248.555,112.348" stroke-width="2.575" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 248.555,112.348 C 257.124,109.326 257.302,110.051 265.602,106.074" stroke-width="2.674" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 265.602,106.074 C 269.474,104.907 269.329,104.645 272.965,102.984" stroke-width="3.389" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 272.965,102.984 C 283.390,97.225 283.349,97.264 293.352,90.789" stroke-width="2.585" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 293.352,90.789 C 296.986,88.124 297.125,88.351 300.434,85.238" stroke-width="3.264" stroke="#111111" fill="none" stroke-linecap="round"></path><path d="M 300.434,85.238 C 302.837,83.157 302.867,83.202 305.113,80.945" stroke-width="3.763" stroke="#111111" fill="none" stroke-linecap="round"></path></svg>`,
            required: false,
            name: "field22",
            width: 45,
            fontSize: 13,
            lineHeight: 1,
            position: { x: 121.22, y: 102.17 },
            strikethrough: false,
            alignment: "left",
            opacity: 1,
            verticalAlignment: "top",
            fontColor: "#000000",
            height: 10,
            characterSpacing: 0,
          },
        ],
      ],
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

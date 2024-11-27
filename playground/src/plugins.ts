import { PDFRenderProps, Plugin, UIRenderProps } from "@pdfme/common";
import { checkbox, text } from "@pdfme/schemas";
import type { TextSchema } from "@pdfme/schemas/dist/types/src/text/types";

export const utility: Plugin<TextSchema> = {
  ui: async (arg: UIRenderProps<TextSchema>) => {
    const displayType = arg.schema.displayType ?? "text";
    return displayType === "text"
      ? text.ui({ ...arg, value: arg.schema.value ?? arg.value })
      : checkbox.ui({ ...arg, value: "true" });
  },
  pdf: (arg: PDFRenderProps<TextSchema>) => {
    const displayType = arg.schema.displayType ?? "text";
    return displayType === "text"
      ? text.pdf({ ...arg, value: arg.schema.value ?? arg.value })
      : checkbox.pdf({ ...arg, value: "true" });
  },
  propPanel: {
    ...text.propPanel,
    defaultSchema: {
      ...text.propPanel.defaultSchema,
      type: "text",
      name: "longText2",
      alignment: "left",
      editable: false,
      readOnly: true,
      readOnlyValue: "Select utility",
      placeholder: "Select utility",
      valueOptions: [
        {
          label: "Water",
          value: "water",
        },
        {
          label: "Electricity",
          value: "electricity",
        },
        {
          label: "Gas",
          value: "gas",
        },
      ],
      displayTypes: [
        {
          label: "Text",
          value: "text",
        },
        {
          label: "Checkbox",
          value: "checkbox",
        },
      ],
    },
  },
  icon: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4"></path>
  <text x="19" y="12" font-size="11" text-anchor="middle" fill="inherit" font-weight="bold">1</text>
</svg>`,
};

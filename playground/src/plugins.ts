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
  icon: text.icon,
};

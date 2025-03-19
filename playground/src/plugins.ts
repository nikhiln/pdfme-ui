import {
  Font,
  PDFRenderProps,
  Plugin,
  PropPanel,
  PropPanelSchema,
  UIRenderProps,
  getDefaultFont,
  getFallbackFontName,
} from "@pdfme/common";
import { PDFDocument, PDFFont, TextAlignment } from "@pdfme/pdf-lib";
import { checkbox, image, svg, text } from "@pdfme/schemas";
import type { CheckboxSchema } from "@pdfme/schemas/dist/types/src/checkbox/types";
import type { TextSchema } from "@pdfme/schemas/dist/types/src/text/types";
import {
  convertForPdfLayoutProps,
  hex2PrintingColor,
} from "@pdfme/schemas/utils";

const getAlignment = (str: string) => {
  const alignmentMap: Record<string, TextAlignment> = {
    left: TextAlignment.Left,
    center: TextAlignment.Center,
    right: TextAlignment.Right,
  };
  return alignmentMap[str] || TextAlignment.Left;
};

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

type TextFieldSchema = TextSchema & {};

const textFieldPropPanel: PropPanel<TextFieldSchema> = {
  ...text.propPanel,
  schema: ({ i18n }) => {
    const textSchema: Record<string, PropPanelSchema> = {
      fontColor: {
        title: i18n("schemas.textColor"),
        type: "string",
        widget: "color",
        rules: [
          {
            pattern: "^#(?:[A-Fa-f0-9]{6})$",
            message: i18n("validation.hexColor"),
          },
        ],
      },
      alignment: {
        title: "Alignment",
        type: "string",
        widget: "select",
        props: {
          options: [
            {
              label: "Left",
              value: "left",
            },
            {
              label: "Center",
              value: "center",
            },
            {
              label: "Right",
              value: "right",
            },
          ],
        },
      },
      backgroundColor: {
        title: i18n("schemas.bgColor"),
        type: "string",
        widget: "color",
        rules: [
          {
            pattern: "^#(?:[A-Fa-f0-9]{6})$",
            message: i18n("validation.hexColor"),
          },
        ],
      },
      borderColor: {
        title: i18n("schemas.borderColor"),
        type: "string",
        widget: "color",
        rules: [
          {
            pattern: "^#(?:[A-Fa-f0-9]{6})$",
            message: i18n("validation.hexColor"),
          },
        ],
      },
      borderWidth: {
        title: i18n("schemas.borderWidth"),
        type: "number",
        widget: "inputNumber",
        props: { min: 0 },
      },
    };

    return textSchema;
  },
  defaultSchema: {
    ...text.propPanel.defaultSchema,
    dynamicFontSize: undefined,
    type: "textField",
    alignment: "left",
    editable: false,
    readOnly: true,
  },
};

const embedAndGetFontObj = async ({
  pdfDoc,
  font,
  _cache,
}: {
  pdfDoc: PDFDocument;
  font: Font;
  _cache: Map<unknown, unknown>;
}) => {
  if (_cache.has(pdfDoc)) {
    return _cache.get(pdfDoc) as { [key: string]: PDFFont };
  }

  const fontEntries = Object.entries(font);
  const fontValues = await Promise.all(
    fontEntries.map(async ([_key, v]) => {
      let fontData = v.data;
      if (typeof fontData === "string" && fontData.startsWith("http")) {
        fontData = await fetch(fontData).then((res) => res.arrayBuffer());
      }
      return pdfDoc.embedFont(fontData, {
        subset: v.subset ?? true,
      });
    })
  );

  const fontObj = fontEntries.reduce(
    (acc, [key], i) => ({ ...acc, [key]: fontValues[i] }),
    {} as { [key: string]: PDFFont }
  );

  _cache.set(pdfDoc, fontObj);
  return fontObj;
};

const checkboxFieldPropPanel: PropPanel<CheckboxFieldSchema> = {
  ...checkbox.propPanel,
  schema: ({ i18n }) => {
    const checkboxSchema: Record<string, PropPanelSchema> = {
      backgroundColor: {
        title: i18n("schemas.bgColor"),
        type: "string",
        widget: "color",
        rules: [
          {
            pattern: "^#(?:[A-Fa-f0-9]{6})$",
            message: i18n("validation.hexColor"),
          },
        ],
      },
      borderColor: {
        title: i18n("schemas.borderColor"),
        type: "string",
        widget: "color",
        rules: [
          {
            pattern: "^#(?:[A-Fa-f0-9]{6})$",
            message: i18n("validation.hexColor"),
          },
        ],
      },
      borderWidth: {
        title: i18n("schemas.borderWidth"),
        type: "number",
        widget: "inputNumber",
        props: { min: 0 },
      },
    };

    return checkboxSchema;
  },
  defaultSchema: {
    ...checkbox.propPanel.defaultSchema,
    dynamicFontSize: undefined,
    type: "checkboxField",
    alignment: "left",
    editable: false,
    readOnly: true,
  },
};

export const textField: Plugin<TextFieldSchema> = {
  ui: (arg: UIRenderProps<CheckboxFieldSchema>) => {
    const { rootElement, schema } = arg;
    const div = document.createElement("div");
    div.style.backgroundColor = schema.color ?? "transparent";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";

    const input = document.createElement("input");
    input.type = "text";
    input.style.width = "200px";
    input.style.height = "30px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "4px";
    input.style.padding = "5px";
    input.setAttribute("readOnly", "true");

    div.appendChild(input);
    rootElement.appendChild(div);
  },
  pdf: async (arg: PDFRenderProps<TextFieldSchema>) => {
    const { page, pdfDoc, schema, options, _cache } = arg;
    const form = pdfDoc.getForm();

    const { font = getDefaultFont(), colorType } = options;

    const pdfFontObj = await embedAndGetFontObj({ pdfDoc, font, _cache });

    const fontName = schema.fontName
      ? schema.fontName
      : getFallbackFontName(font);

    const pdfFontValue = pdfFontObj && pdfFontObj[fontName];

    const textColor = hex2PrintingColor(
      schema.fontColor || "#000000",
      colorType
    );
    const backgroundColor = hex2PrintingColor(
      schema.backgroundColor || "#ffffff",
      colorType
    );
    const borderColor = hex2PrintingColor(
      schema.borderColor || "#000000",
      colorType
    );
    const borderWidth = schema.borderWidth ?? 1;

    const alignment = getAlignment(schema.alignment ?? "left");

    const pageHeight = page.getHeight();
    const {
      width,
      height,
      position: { x, y },
    } = convertForPdfLayoutProps({
      schema,
      pageHeight,
      applyRotateTranslate: false,
    });

    const textField = form.createTextField(schema.name);
    pdfFontValue && textField.updateAppearances(pdfFontValue);
    textField.setAlignment(alignment);

    textField.addToPage(page, {
      x,
      y,
      width,
      height,
      textColor,
      backgroundColor,
      borderColor,
      borderWidth,
    });
  },
  propPanel: textFieldPropPanel,
  icon: `<svg width="20" height="20" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TextFieldsIcon"><path d="M2.5 4v3h5v12h3V7h5V4zm19 5h-9v3h3v7h3v-7h3z"></path></svg>`,
};

type CheckboxFieldSchema = CheckboxSchema & {};

export const checkboxField: Plugin<CheckboxFieldSchema> = {
  ui: checkbox.ui,
  pdf: async (arg: PDFRenderProps<CheckboxFieldSchema>) => {
    const { page, pdfDoc, schema, options } = arg;
    const form = pdfDoc.getForm();

    const { colorType } = options;

    const textColor = hex2PrintingColor(
      schema.fontColor || "#000000",
      colorType
    );
    const backgroundColor = hex2PrintingColor(
      schema.backgroundColor || "#ffffff",
      colorType
    );
    const borderColor = hex2PrintingColor(
      schema.borderColor || "#000000",
      colorType
    );
    const borderWidth = schema.borderWidth ?? 1;

    const pageHeight = page.getHeight();
    const {
      width,
      height,
      position: { x, y },
    } = convertForPdfLayoutProps({
      schema,
      pageHeight,
      applyRotateTranslate: false,
    });

    const checkboxField = form.createCheckBox(schema.name);

    checkboxField.addToPage(page, {
      x,
      y,
      width,
      height,
      textColor,
      backgroundColor,
      borderColor,
      borderWidth,
    });
  },
  propPanel: checkboxFieldPropPanel,
  icon: `<svg width="20" height="20" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxOutlinedIcon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"></path></svg>`,
};

export const signature = {
  ui: svg.ui,
  pdf: svg.pdf,
  propPanel: {
    ...text.propPanel,
    defaultSchema: {
      ...text.propPanel.defaultSchema,
      type: "signature",
      name: "signature",
      alignment: "left",
      content: "signature",
      readOnly: true,
      readOnlyValue: "signature",
      editable: false,
    },
  },
};

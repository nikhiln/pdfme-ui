import { PreviewProps } from '@pdfme/common';
import { PreviewUI } from './class';
declare class Form extends PreviewUI {
    private onChangeInputCallback?;
    constructor(props: PreviewProps);
    onChangeInput(cb: (arg: {
        index: number;
        value: string;
        name: string;
    }) => void): void;
    setInputs(inputs: {
        [key: string]: string;
    }[]): void;
    protected render(): void;
}
export default Form;

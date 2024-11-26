import Designer from "./Designer";
import Form from "./Form";
import Viewer from "./Viewer";
import { Buffer } from "buffer";

// Polyfill `Buffer` for the browser
if (!globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}

export { Designer, Viewer, Form };

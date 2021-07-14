import { AriaAttributes } from "react";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // 任意でReact's HTMLAttributes追加
    directory?: string;
    webkitdirectory?: string;
  }
}
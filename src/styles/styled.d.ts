/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { MyTheme } from "@/styles/abstracts/colors.styled";
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme extends MyTheme {}
}

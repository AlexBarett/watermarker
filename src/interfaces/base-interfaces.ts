export interface Size {
  width: number;
  height: number;
}

export interface Appearance {
  // TODO: попробовать несколько цветов
  color: string;
  opacity: number;
  rotate: number;
}

export enum LabelTypes {
  Unknown,
  Svg
}

export interface Photo {
  name: string;
  data: string | ArrayBuffer | null;
}

export interface LabelStats {
  left: number;
  top: number;
  opacity: number;
  color: string;
  skip: boolean;
  isSvg?: boolean;
  shift: number[];
}
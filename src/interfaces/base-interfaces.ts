export interface Appearance {
  // TODO: попробовать несколько цветов
  color: string;
  opacity: number;
  rotate: number;
}

export interface Size {
  dh: number;
  dw: number;
  dt: number;
  dl: number;
}

export interface Photo {
  name: string;
  data: string | ArrayBuffer | null;
}

export interface GeneralStats {
  left: number;
  top: number;
  opacity: number;
  isSvg: boolean;
  labelHeight: number;
  labelWidth: number
  name: string;
  bgWidth: number;
  bgHeight: number;
  ratio: number;
  labelRatio: number;
}
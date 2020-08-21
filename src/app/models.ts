export interface Icon {
  category: string;
  files: IconFile[];
}

export interface IconFile {
  fileName: string;
  className: string;
  counter: number;
  displayName: string;
}

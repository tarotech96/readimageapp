export interface IDisplayImage {
  images: File[];
  defaultImage: IThumbnail;
}

export interface IThumbnail {
  name: string;
  src: string;
}
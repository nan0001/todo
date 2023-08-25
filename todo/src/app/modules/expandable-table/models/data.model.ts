export interface DataInterface {
  singer: string;
  album: string;
  img: string;
  songs: SubitemInterface[];
}

export interface SubitemInterface {
  name: string;
}

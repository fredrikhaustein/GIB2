export type Mountain = {
  h_yde: number;
  lat: number;
  lon: number;
  navn: string;
  ogc_fid: number;
  wkb_geometry: number[];
};

export interface ILatlng {
  lat: number;
  lng: number;
}

export type Latlng = [ILatlng];

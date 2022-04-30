export type Mountain = {
        h_yde: number;
        lat: number;
        lon: number;
        navn: string;
        ogc_fid: number;
        wkb_geometry: number[];
        route_urls: string[];
};

export type Route = {
        route_id: number;
        route_name: string;
        gpx_link: string;
        mountain_id: number;
};

export interface ILatlng {
        lat: number;
        lng: number;
}

export type Latlng = [ILatlng];

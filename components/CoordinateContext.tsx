import { createContext } from "react";

export interface Coordinate {
    lng : number;
    lat : number;
    features?: Array<any>;
}

export interface Markers {
  coords : Coordinate[];
  selected : number;
}

const CoordinateContext = createContext({
  markers : {} as Markers,
  setMarkers: (data:Markers) => {}
});

export default CoordinateContext;
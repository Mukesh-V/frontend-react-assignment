import { createContext } from "react";

export interface Coordinate {
    lng : number;
    lat : number;
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
import React, { useState, useContext } from "react";
import ReactMapGL, { MapContext, MapEvent, ViewportProps } from "react-map-gl";
import CoordinateContext, { Coordinate } from './CoordinateContext';

interface MapComponentProps {
  className?: string;
}

interface MarkerProps {
  point: Coordinate;
  index: number;
  selected: number;
}

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || "";

// Sample from react-map-gl documentation
function CustomMarker(props: MarkerProps) {
  const context = useContext(MapContext);
  var {point, index, selected} = props;
  const [x, y] = context.viewport? context.viewport.project([point.lng, point.lat]) : [];

  var unselectedMarkerStyle : React.CSSProperties = {
    position: 'absolute',
    background: 'white',
    left: x,
    top: y
  }

  var selectedMarkerStyle : React.CSSProperties = JSON.parse(JSON.stringify(unselectedMarkerStyle));
  selectedMarkerStyle.background = 'red';

  return (
    <div style={selected===index? selectedMarkerStyle : unselectedMarkerStyle} >
      {index}
    </div>
  );
}

const MapComponent = (props: MapComponentProps): JSX.Element => {
  const [viewport, setViewport] = useState<ViewportProps>({
    width: 450,
    height: 450,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const {markers, setMarkers} = useContext(CoordinateContext)

  return (
    <div className={props.className}>
      <h3>Map</h3>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(nextViewport: ViewportProps) =>
          setViewport(nextViewport)
        }
        onClick={(e:MapEvent)=>{
          var clickpoint : Coordinate = { lng: e.lngLat[0], lat: e.lngLat[1]};

          // for some reason, .includes() didn't work as expected
          if(!markers.coords.find( point => (point.lat === clickpoint.lat &&  point.lng === clickpoint.lng))){
            setMarkers({...markers, coords:[...markers.coords, clickpoint]});
          }
        }}
      >
      {
        markers.coords.map((value, key)=>{
          return <CustomMarker point={value} key={key} index={key} selected={markers.selected}/>
        })
      }
      </ReactMapGL>
    </div>
  );
};

export default MapComponent;

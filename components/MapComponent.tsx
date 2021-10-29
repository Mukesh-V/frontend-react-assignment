import React, { useState, useContext, useEffect } from "react";
import ReactMapGL, { MapContext, MapEvent, ViewportProps, FlyToInterpolator } from "react-map-gl";
import CoordinateContext, { Coordinate } from './CoordinateContext';

import { Tooltip } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  const { markers } = useContext(CoordinateContext)

  var { point, index, selected } = props;
  const [x, y] = context.viewport? context.viewport.project([point.lng, point.lat]) : [];

  // positions had to be adjusted manually (haven't thought of them)
  var unselectedIndexStyle : React.CSSProperties = {
    fontSize: '0.7em',
    position: 'absolute',
    background: 'transparent',
    left: x-4.5,
    top: y-3
  }
  var unselectedMarkerStyle : React.CSSProperties = {
    fontSize: '1.4em',
    position: 'absolute',
    background: 'transparent',
    left: x-15,
    top: y-28
  }

  // for a deepcopy of an object
  var selectedIndexStyle : React.CSSProperties = JSON.parse(JSON.stringify(unselectedIndexStyle));
  var selectedMarkerStyle : React.CSSProperties = JSON.parse(JSON.stringify(unselectedMarkerStyle));
  selectedIndexStyle.color = 'red'; selectedMarkerStyle.color = 'red';

  // Haven't figured to get features for points typed out
  var tip = 'Select by click'; var i = 0;
  var features = markers.coords[index].features;

  // Append all classes of properties of features
  if(features != undefined){
    tip = '';
    for(i=0; i<features.length; i++){
      tip += features[i].properties.class;
      if(i < features.length-1)
        tip += ',';
    }
  }

  return (
    <div> 
        <Tooltip title={tip}>
          <LocationOnIcon style={selected===index? selectedMarkerStyle : unselectedMarkerStyle}/>
        </Tooltip>
        <div style={selected===index? selectedIndexStyle : unselectedIndexStyle}>
          {index}
        </div>
    </div>
  );
}

const MapComponent = (props: MapComponentProps): JSX.Element => {
  const [viewport, setViewport] = useState<ViewportProps>({
    width: 800,
    height: 450,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const {markers, setMarkers} = useContext(CoordinateContext)

  // Listen for changes in "selected" state and change viewport accordingly
  useEffect(()=>{
    var newViewPort = {
      width: 800,
      height: 450,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    }
    if(markers.selected != -1 && markers.coords[markers.selected]){
      newViewPort.latitude = markers.coords[markers.selected].lat;
      newViewPort.longitude = markers.coords[markers.selected].lng;
      newViewPort.zoom = 10;
    }
    setViewport(newViewPort);
  }, [markers])

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
          var clickpoint : Coordinate = { lng: e.lngLat[0], lat: e.lngLat[1], features: e.features};
          if(!markers.coords.find( point => (point.lat === clickpoint.lat &&  point.lng === clickpoint.lng)))
            setMarkers({...markers, coords:[...markers.coords, clickpoint]});
          else
            setMarkers({...markers, selected:-1});
        }}
        style={{margin: 'auto'}}
        transitionDuration={1000}
        transitionInterpolator={new FlyToInterpolator()}
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

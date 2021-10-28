import React, { useContext } from "react";
import CoordinateContext from './CoordinateContext';

type Props = {
  className?: string;
};

const ListComponent = (props: Props): JSX.Element => {
  var { markers, setMarkers } = useContext(CoordinateContext)
  return (
    <div className={props.className}>
      <h3>Bookmarked Place</h3>
      <ul>
        {
          markers.coords.map((item, key)=>{
            return (
              <li key={key} onClick={()=>{(markers.selected!=key)?setMarkers({...markers, selected: key}) : setMarkers({...markers, selected: -1})}}>
                {key}, {item.lng}, {item.lat}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default ListComponent;

import { 
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useContext } from "react";
import CoordinateContext from './CoordinateContext';

type Props = {
  className?: string;
  classes: {};
};

const ListComponent = (props: Props): JSX.Element => {
  var { markers, setMarkers } = useContext(CoordinateContext)
  return (
    <div className={props.className}>
      <h3>Bookmarked Places</h3>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350, maxHeight:'80vh'}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Index</TableCell>
            <TableCell align="center">Longitude</TableCell>
            <TableCell align="center">Latitude</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
              markers.coords.map((item, key) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={()=>{markers.selected!=key?setMarkers({...markers, selected: key}):setMarkers({...markers, selected:-1})}}
                  style={{backgroundColor:markers.selected!=key?'white':'black'}}
                >            
                  <TableCell className={markers.selected!=key?props.classes.cell : props.classes.selectedCell}>{key}</TableCell>
                  <TableCell className={markers.selected!=key?props.classes.cell : props.classes.selectedCell}>{item.lng}</TableCell>
                  <TableCell className={markers.selected!=key?props.classes.cell : props.classes.selectedCell}>{item.lat}</TableCell>
                  <TableCell className={markers.selected!=key?props.classes.cell : props.classes.selectedCell}>
                    
                  </TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};


const ListStyles = {
  cell:{
    textAlign: 'center',
    cursor: 'pointer'
  },
  selectedCell:{
    color: 'white',
    cursor: 'pointer',
    textAlign: 'center'
  }
}

export default withStyles(ListStyles)(ListComponent);

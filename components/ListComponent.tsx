import React, { useContext, useState } from "react";

import { 
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  TextField,
  Button,
  Typography 
} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { withStyles } from "@mui/styles";

import MarkersContext, { Coordinate } from './MarkersContext';

type Props = {
  className?: string;
  classes: {};
};

const ListComponent = (props: Props): JSX.Element => {
  var { markers, setMarkers } = useContext(MarkersContext)
  var [ lng, setLng ] = useState(0);
  var [ lat, setLat ] = useState(0);

  return (
    <div className={props.className}>
      <h3>Bookmarked Places</h3> 
      <TableContainer component={Paper} style={{ minWidth: 350, height:'48vh' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Index</TableCell>
              <TableCell align="center">Longitude</TableCell>
              <TableCell align="center">Latitude</TableCell>
              <TableCell align="center"> 
                <DeleteForeverRoundedIcon style={{cursor: 'pointer'}}onClick={()=>{setMarkers({selected: -1, coords:[] as Coordinate[]})}} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
                markers.coords.map((item, key) => (
                  <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={()=>{
                      if(markers.selected!=key)
                        setMarkers({...markers, selected: key})
                      else
                        setMarkers({...markers, selected:-1})
                    }}
                    style={{backgroundColor:markers.selected!=key?'white':'black'}}
                  >            
                    <TableCell className={markers.selected!=key?props.classes.cell : props.classes.selectedCell}>{key}</TableCell>
                    <TableCell className={markers.selected!=key?props.classes.cell : props.classes.selectedCell}>{item.lng}</TableCell>
                    <TableCell className={markers.selected!=key?props.classes.cell : props.classes.selectedCell}>{item.lat}</TableCell>
                    <TableCell className={markers.selected!=key?props.classes.cell : props.classes.selectedCell}>
                        <DeleteForeverRoundedIcon onClick={()=>{setMarkers({...markers, coords:markers.coords.splice(key, 1), selected: -1})}} />
                    </TableCell>
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{marginTop:'20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              id="lng-text"
              label="Longitude"
              type="number"
              variant="standard"
              size="small"
              value={lng}
              className={props.classes.textField}
              onChange={e=>{setLng(parseInt(e.target.value)); console.log(lng, lat)}}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="lat-text"
              label="Latitude"
              type="number"
              variant="standard"
              size="small"
              value={lat}
              className={props.classes.textField}
              onChange={e=>{setLat(parseInt(e.target.value)); console.log(lng, lat)}}
            />
          </Grid>
          <Grid item xs={2}>
            <Button 
              className={props.classes.addButton}
              variant="contained"
              disabled={!((lng>=-180&&lng<=180)&&(lat>=-90&&lat<=90)) || markers.coords.find( point => (point.lat === lat &&  point.lng === lng))}
              onClick={()=>{ setMarkers({...markers, coords:[...markers.coords, {lng: lng, lat: lat}]});}}
            >
              Add
            </Button>
          </Grid>
          <br />
          {
            !((lng>=-180&&lng<=180)&&(lat>=-90&&lat<=90))  || markers.coords.find( point => (point.lat === lat &&  point.lng === lng))&&
            <Grid container style={{justifyContent: 'center', marginTop:'10px'}}>
              <Typography style={{opacity:'0.5', fontSize:'20px'}}>
                Out of Range or Already Present
              </Typography>
            </Grid>
          }
        </Grid>
      </div>
    </div>
  );
};


const ListStyles = {
  cell:{
    textAlign: 'center',
    cursor: 'pointer'
  },
  selectedCell:{
    textAlign: 'center',
    cursor: 'pointer',
    color: 'white'
  },
  addButton:{
    marginTop: '10px',
    color:'white',
    background:'black'
  },
  textField:{
  }
}

export default withStyles(ListStyles)(ListComponent);

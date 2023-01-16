
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import secureGetFetch from '../service/CustomFetch';



export default function SensorDataTable() {

    const paperStyle={padding:'50px 20px', width:"1300px",margin:"20px auto", allign:"center"}

    function createData(id , deviceId, temperature, humidity, time) {
        return { id, deviceId, temperature, humidity, time };
      }

    const[sensorData,setSensorData]=useState([])

    useEffect(()=>{
        secureGetFetch('http://localhost:8080/data')
        .then(res=>res.json())
        .then((result)=>{
            setSensorData(result);
        });
      },[])

      
      const rows = []

      sensorData.map(sensorData =>(
        rows.push(createData(sensorData.id , sensorData.deviceId, sensorData.temperature, sensorData.humidity, sensorData.time))
    ))


  return (
    <TableContainer component={Paper} style={paperStyle }>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">DeviceId</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell  align="right">{row.deviceId}</TableCell>
              <TableCell  align="right">{row.temperature}</TableCell>
              <TableCell  align="right">{row.humidity}</TableCell>
              <TableCell  align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
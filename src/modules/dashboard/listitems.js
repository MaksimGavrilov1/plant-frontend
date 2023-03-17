import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import GrassIcon from '@mui/icons-material/Grass';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';


export const mainListItems = [
  {
    text: "Containers",
    icon: <WarehouseIcon />,
    to: "/containers" // <-- add link targets
  },
  {
    text: "Plants",
    icon: <GrassIcon />,
    to: "/plants" // <-- add link targets
  },
  {
    text: "Devices",
    icon: <SettingsIcon />,
    to: "/devices/all"
  },
  {
    text: "Tasks",
    icon: <AssignmentIcon/>,
    to: "/tasks"
  }
  
]

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import GrassIcon from '@mui/icons-material/Grass';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DangerousIcon from '@mui/icons-material/Dangerous';


export const mainListItems = [
  {
    text: "Помещения",
    icon: <WarehouseIcon />,
    to: "/containers" // <-- add link targets
  },
  {
    text: "Растения",
    icon: <GrassIcon />,
    to: "/plants" // <-- add link targets
  },
  {
    text: "Устройства",
    icon: <SettingsIcon />,
    to: "/devices/all"
  },
  {
    text: "Задачи",
    icon: <AssignmentIcon/>,
    to: "/tasks"
  },
  {
    text: "История",
    icon: <HistoryEduIcon/>,
    to: "/history"
  },
  {
    text: "Нарушения",
    icon: <DangerousIcon/>,
    to: "/violations"
  }
  
]

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      
    </ListSubheader>
    
  </React.Fragment>
);
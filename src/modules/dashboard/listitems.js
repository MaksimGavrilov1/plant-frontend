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
import { Typography } from '@mui/material';
import { USER_TOKEN, API_URL } from '../../service/AuthenticationService';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const rootClass = {
  position: "relative",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center"
};
const iconClass = {
  fontSize: "2.5em"
};
const countClass = {
  position: "absolute",
  lineHeight: 1,
  color: "#fff",
  top: "0.5em",
  fontSize: "1em"
};



function DangerousIconWithNumber({ size = 16, count = 0 }) {
  const [active, setActive] = React.useState(0)

  fetch(API_URL + "/violations/stats", {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem(USER_TOKEN)
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(res => res.json())
    .then((result => {
      setActive(result)
    }))

  return (
    <div  style={{ fontSize: size }}>
      <DangerousIcon color={active === 0 ? 'inherit' : 'error'}  />
      <Typography component="span" >
        {active + ''}
      </Typography>
    </div>
  );
}

function AssignmentIconWithNumber({ size = 16, count = 0 }) {
  const [active, setActive] = React.useState(0)

  fetch(API_URL + "/tasks/ready", {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem(USER_TOKEN)
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(res => res.json())
    .then((result => {
      setActive(result)
    }))

  return (
    <div  style={{ fontSize: size }}>
      <AssignmentIcon color={active === 0 ? 'inherit' : 'success'}  />
      <Typography component="span" >
        {active + ''}
      </Typography>
    </div>
  );
}

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
    icon: <AssignmentIconWithNumber />,
    to: "/tasks"
  },
  {
    text: "История",
    icon: <HistoryEduIcon />,
    to: "/history"
  },
  {
    text: "Нарушения",
    icon: <DangerousIconWithNumber />,
    to: "/violations"
  },
  {
    text: "Статистика",
    icon: <AnalyticsIcon />,
    to: "/stats"
  }

]

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>

    </ListSubheader>

  </React.Fragment>
);
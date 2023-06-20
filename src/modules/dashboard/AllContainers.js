import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import { mainListItems, secondaryListItems } from './listitems';
import { USER_TOKEN, API_URL } from '../../service/AuthenticationService';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import secureGetFetch from '../../service/CustomFetch';
import { useNavigate,  Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GrassIcon from '@mui/icons-material/Grass';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DangerousIcon from '@mui/icons-material/Dangerous';


const drawerWidth = 240;

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

  const mainListItems = [
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


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {

    const [containers, setContainers] = useState([]);
    const [listItems, setListItems] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        secureGetFetch("http://localhost:8080/container/all")
            .then(res => res.json())
            .then((result) => {
                setContainers(result);
                let mainListItems = [
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
                  setListItems(mainListItems)
            }
            )
        
    }, [])
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar sx={{ bgcolor: "green" }} position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Помещения
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                    {
                            listItems ?  listItems.map((item, index) => {
                                const { text, icon } = item;
                                return (
                                    <ListItemButton component={Link} to={item.to} key={text}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                );
                            })
                            :
                            mainListItems.map((item, index) => {
                                const { text, icon } = item;
                                return (
                                    <ListItemButton component={Link} to={item.to} key={text}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                );
                            })
                        
                        }  
                    {/* {
                            mainListItems.map((item, index) => {
                                const { text, icon, to } = item;
                                return (
                                    <ListItemButton component={Link}  to={item.to} key={text}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                );
                            })
                        } */}
                        <Divider sx={{ my: 1 }} />
                        
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container align="center" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 2, pb: 6 }}>
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Помещения
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" component="p">
                                Здесь вы можете найти доступные вам помещения. Если необходимо создать помещение, то можно нажать кнопку ниже.
                            </Typography>
                            <Button color='success' sx={{  mt:3 }} variant="contained" size='large' onClick={()=>{navigate('/containers/create')}}>Создать помещение</Button>
                        </Container>
                        <Divider></Divider>
                        <Grid container spacing={0} alignItems="center" justifyContent="space-around">
                            {containers.map((container) => (
                                <Grid item sx={{ align: "center", mt: "20px" }} key={container.id}>
                                    <Card  sx={{ minWidth: 300, minHeight: 220, maxWidth: 300 }} >
                                        <CardContent>
                                            <Typography sx={{ mb: 3 }} variant="h5" component="div">
                                                {container.title}
                                                <br />
                                            </Typography>
                                            <Typography align='left' variant="body1">
                                                {container.description}
                                                <br />
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            <Button sx={{color:"green"}} onClick={()=>{navigate('/containers/view/' + container.id)}} size="large">Подробнее</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function AllContainers() {
    return <DashboardContent />;
}
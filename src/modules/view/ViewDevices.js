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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../dashboard/listitems';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import secureGetFetch from '../../service/CustomFetch';
import { API_URL, USER_TOKEN } from '../../service/AuthenticationService';

const drawerWidth = 240;

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
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [devToDel, setDevToDel] = useState();
    const [readyToDel, setReadyToDel] = useState(true);
    useEffect(() => {
        secureGetFetch("http://localhost:8080/device/all")
        .then(res => res.json())
        .then((result) => {
            setDevices(result);
            
        }
        )
    }, [devToDel, readyToDel])
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

   
    

    function isReady(deviceId, devId) {
        fetch(API_URL + "/device/delete/" + deviceId, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem(USER_TOKEN)
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(res => res.json())
        .then((result) => {
            if (result) {
                navigate("/containers")
            } else {
                setDevToDel(devId)
                setReadyToDel(false)
            }
        })
    }


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
                            Устройства
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
                            mainListItems.map((item, index) => {
                                const { text, icon, to } = item;
                                return (
                                    <ListItemButton component={Link} to={item.to} key={text}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                );
                            })
                        }
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[0]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Typography component="h1"
                        variant="h1"
                        color="inherit"
                        align='left'
                        sx={{ flexGrow: 1, fontSize: '26pt', ml:2, mt:4 }}>
                        Устройства
                        <Divider sx={{ mb: 4 }}></Divider>
                    </Typography>

                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid item xs={12}>


                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '15pt' }} align="left">#</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align="left">ID устройства</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align="center">ID регистра</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align='center'>URL брокера</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align='left'></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {devices && devices.map((device, index) => (
                                            <TableRow
                                                key={device.deviceId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ fontSize: '15pt' }} component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="left">{device.deviceId}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{device.registryId}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{device.brokerURL}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center"><Button variant='contained' color='error' onClick={()=>isReady(device.id, device.deviceId)}>Удалить</Button></TableCell>
                                                {/* <TableCell><Button sx={{ color: "green" }} onClick={() => { navigate('/setup/view/' + setup.id) }} size="large">Check</Button></TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>
                        <Typography color={"red"}>
                            {!readyToDel && "Невозможно удалить устройство: " + devToDel + ", так как существует помещение с этим устройством"}
                        </Typography>
                        <Button 
                             sx={{  mt: 3, width:"20%" }}
                             variant="contained"
                             color="success"
                             size='large'
                             onClick={()=>{navigate('/devices/create')}}
                            >Добавить</Button>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function ViewDevices() {
    return <DashboardContent />;
}
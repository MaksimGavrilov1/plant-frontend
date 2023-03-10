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
import { mainListItems, secondaryListItems } from './dashboard/listitems';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Link, useParams } from 'react-router-dom';
import HumidityLogo from '../humidity.svg';
import ThermostatLogo from '../thermometer-svgrepo-com.svg';
import secureGetFetch from '../service/CustomFetch';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


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

function ContainerDashboard() {
    const params = useParams();
    const containerId = params.containerId;
    const navigate = useNavigate();
    const [containerItem, setContainerItem] = useState({});
    let isLoaded = false;
    useEffect(() => {

        secureGetFetch("http://localhost:8080/container/view/" + containerId)
            .then(res => res.json())
            .then((result) => {
                setContainerItem(result);
            }
            )
        isLoaded = true
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
                            alignItems: 'center'
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
                            textAlign={'center'}
                            sx={{ flexGrow: 1 }}
                        >
                            Containers
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
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
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 'fit-content', minWidth: 'fit-content' }}>
                                    <Typography component="h2"
                                        variant="h4"
                                        color="inherit"
                                        align='left'
                                        noWrap
                                        sx={{ flexGrow: 1 }}>
                                        {containerItem.title}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 'fit-content', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <Typography component="h5"
                                        variant="h5"
                                        color="inherit"
                                        align='left'
                                        style={{ wordWrap: "break-word" }}
                                        sx={{ flexGrow: 1 }}>
                                        {containerItem.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={7} lg={8}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 300,
                                    }}
                                >
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 300,
                                    }}
                                >
                                    <Grid container sx={{ mt: 0.5, mb: 3 }} alignItems="center" justifyContent="center" spacing={3}>
                                        <Grid item xs={6} sm={6} md={4} lg={4}>
                                            {/* <img src={HumidityLogo}></img> */}
                                            <img src={ThermostatLogo} style={{ width: '100%', height: '100%' }}></img>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={5} lg={5}>
                                            {/* <img src={HumidityLogo}></img> */}
                                            <Typography component="h1"
                                                variant="h3"
                                                color="inherit"
                                                align='left'
                                                sx={{ flexGrow: 1 }}>
                                                22.7??
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid container alignItems="center" justifyContent="center" spacing={3}>
                                        <Grid item xs={6} sm={6} md={4} lg={4}>
                                            {/* <img src={HumidityLogo}></img> */}
                                            <img src={HumidityLogo} style={{ width: '100%', height: '100%' }}></img>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={5} lg={5}>
                                            {/* <img src={HumidityLogo}></img> */}
                                            <Typography component="h1"
                                                variant="h3"
                                                color="inherit"
                                                align='left'
                                                sx={{ flexGrow: 1 }}>
                                                22.5%
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h4"
                                    variant="h4"
                                    color="inherit"
                                    align='left'
                                    sx={{ flexGrow: 1, fontSize: '20pt' }}>
                                    Setups
                                </Typography>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontSize: '15pt' }} align="left">#</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="left">Address</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">Levels</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align='center'>Free cells</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align='left'></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {containerItem.setups && containerItem.setups.map((setup, index) => (
                                                <TableRow
                                                    key={setup.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell sx={{ fontSize: '15pt' }} component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '15pt' }} align="left">{setup.address}</TableCell>
                                                    <TableCell sx={{ fontSize: '15pt' }} align="center">{setup.levels.filter((value, index, self) => {
                                                        return self.findIndex(v => v.level === value.level) === index;
                                                    }).length}</TableCell>
                                                    <TableCell sx={{ fontSize: '15pt' }} align="center">{setup.levels.filter((value) => !value.plant).length}</TableCell>
                                                    <TableCell><Button sx={{ color: "green" }} onClick={() => { navigate('/setup/view/' + setup.id) }} size="large">Check</Button></TableCell>                                                    
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Grid>
                            <Grid item xs={12}>
                            <Button 
                             sx={{  mt: 3, width:"20%" }}
                             variant="contained"
                             color="success"
                             size='large'
                             onClick={()=>{navigate('/setup/create/' + containerId)}}
                            >Create setup</Button>
                        </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function OneContainer() {

    return <ContainerDashboard />;
}
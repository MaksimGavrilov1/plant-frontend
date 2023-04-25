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
    const [violations, setViolations] = useState([]);
    useEffect(() => {
        secureGetFetch("http://localhost:8080/violations")
        .then(res => res.json())
        .then((result) => {
           
            result.forEach(element => {
                var date = new Date(element.timeOfViolation)
                // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                element.timeOfViolation = date.toLocaleString("ru-RU")
                //date.customFormat("#DD#/#MM# #hh#:#mm#:#ss#")
            });
            setViolations(result);
            
        }
        )
    }, [])
    const [open, setOpen] = useState(false);
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
                            Нарушения
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
                        Нарушения
                        <Divider sx={{ mb: 4 }}></Divider>
                    </Typography>

                    <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
                        <Grid item xs={12}>


                            <TableContainer >
                                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '15pt' }} align="left">#</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align="left">Сообщение</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align='center'>Время нарушения</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align="center">ID посадки</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align='center'>Название помещения</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {violations && violations.map((viol, index) => (
                                            <TableRow
                                                key={viol.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ fontSize: '15pt' }} component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="left">{viol.message}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{viol.timeOfViolation}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{viol.harvestUUID}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{viol.containerTitle}</TableCell>
                                                {/* <TableCell><Button sx={{ color: "green" }} onClick={() => { navigate('/setup/view/' + setup.id) }} size="large">Check</Button></TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function ViewViolations() {
    return <DashboardContent />;
}
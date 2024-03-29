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
import { USER_TOKEN, API_URL } from '../../service/AuthenticationService';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';

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

function CreateHydroponicSetupView() {
    const navigate = useNavigate();
    const [uniqueFlag, setUniqueFlag] = useState(true)

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "all"
    });

    const onSubmit = (data) => {
        
        fetch(API_URL + "/device/add", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem(USER_TOKEN)
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(res=>res.json())
        .then((result)=>{
            
            if (result) {
                navigate('/devices/all')
            } else {
                setUniqueFlag(false)
            }
        })
        
    };

    useEffect(() => {

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
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                                <SettingsIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Создание устройства
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="deviceId"
                                            label="ID устройства"
                                            name="deviceId"

                                            autoComplete="Device ID"
                                            {...register('deviceId', {
                                                required: "ID устройства обязателен"
                                            })}
                                            error={errors?.deviceId ? true : false}
                                            helperText={errors?.deviceId?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            type='password'
                                            fullWidth
                                            id="devicePassword"
                                            label="Пароль устройства"
                                            name="devicePassword"

                                            autoComplete="Device Password"
                                            {...register('devicePassword', {
                                                required: "Пароль устройства обязателен"
                                            })}
                                            error={errors?.devicePassword ? true : false}
                                            helperText={errors?.devicePassword?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="registryId"
                                            label="ID регистра"
                                            name="registryId"

                                            autoComplete="Registry ID"
                                            {...register('registryId', {
                                                required: "ID регистра обязателен"
                                            })}
                                            error={errors?.registryId ? true : false}
                                            helperText={errors?.registryId?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="registryPassword"
                                            label="Пароль регистра"
                                            name="registryPassword"
                                            type='password'

                                            autoComplete="Registry Password"
                                            {...register('registryPassword', {
                                                required: "Пароль регистра необходим"
                                            })}
                                            error={errors?.registryPassword ? true : false}
                                            helperText={errors?.registryPassword?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="brokerURL"
                                            label="брокер-URL"
                                            name="brokerURL"

                                            autoComplete="Broker URL"
                                            {...register('brokerURL', {
                                                required: "брокер-URL обязателен"
                                            })}
                                            error={errors?.brokerURL ? true : false}
                                            helperText={errors?.brokerURL?.message}
                                        />
                                    </Grid>
                                    
                                </Grid>
                                <Typography sx={{mt:2}} color={"red"}>{!uniqueFlag && "Уще существует устройство с таким ID"}</Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="success"

                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Создать
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function CreateDevice() {
    return <CreateHydroponicSetupView />;
}
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
import secureGetFetch from '../../service/CustomFetch';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useForm, useFieldArray } from "react-hook-form";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Autocomplete, ListItemIcon } from '@mui/material';
import { USER_TOKEN, API_URL } from '../../service/AuthenticationService';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

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
    const [validateFlag, setValidateFlag] = useState(true)
    const params = useParams();
    const plantId = params.plantId;

    const { register, handleSubmit, formState: { errors }, watch, reset, trigger, setError, control } = useForm({
        mode: "all"
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "conditions"
    });

    function validateData(data) {
        let tempMax = parseInt(data.temperatureMax)
        let tempMin = parseInt(data.temperatureMin)
        let humMax = parseInt(data.humidityMax)
        let humMin = parseInt(data.humidityMin)

        if (tempMax <= tempMin) {
            return false;
        } else if (humMax <= humMin) {
            return false;
        }
        return true;
    }

    const onSubmit = (data) => {
        if (validateData(data)) {
            fetch(API_URL + "/maps/create/" + plantId, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem(USER_TOKEN)
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })

            navigate('/plants/view/' + plantId)
        } else {
            setValidateFlag(false)
        }

    };

    const [devicesIds, setDevicesIds] = useState([]);
    const limitChar = 3;

    useEffect(() => {
        secureGetFetch("http://localhost:8080/device/ids")
            .then(res => res.json())
            .then((result) => {
                setDevicesIds(result);
            })

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
                            Технологические карты
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
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container component="main" maxWidth="lg">
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
                                <SettingsApplicationsIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Создание технологической карты
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                <Grid container spacing={5}
                                >
                                    <Grid container sx={{ mt: 3 }}>
                                        <Grid item xs={12} >
                                            <TextField
                                                required

                                                id="title"
                                                label="Название"
                                                name="title"

                                                autoComplete="title"
                                                {...register('title', {
                                                    required: "Название обязательно"
                                                })}
                                                error={errors?.title ? true : false}
                                                helperText={errors?.title?.message}
                                            />
                                        </Grid>

                                        <Grid container justifyContent="flex-end" xs={6} sx={{ mt: 2 }}>
                                            <TextField

                                                required
                                                type="number"
                                                id="temperatureMin"
                                                label="Мин. температура"
                                                name="temperatureMin"
                                                inputProps={{
                                                    maxLength: 13,
                                                    step: "0.1"
                                                }}
                                                {...register('temperatureMin', {
                                                    required: "Это поле обязательно",
                                                    max: {
                                                        value: 40,
                                                        message: 'Макс. допустимое значение: 40'
                                                    },
                                                    min: {
                                                        value: 10,
                                                        message: 'Минимальное значение: 10'
                                                    },
                                                    maxLength: {
                                                        value: 4,
                                                        message: 'Только с точностью до десятых'
                                                    }
                                                })}
                                                error={errors?.temperatureMin ? true : false}
                                                helperText={errors?.temperatureMin?.message}
                                            />
                                        </Grid>

                                        <Grid xs={6} container justifyContent="flex-start" sx={{ mt: 2 }}>
                                            <TextField

                                                required
                                                type="number"
                                                id="temperatureMax"
                                                label="Макс. температура"
                                                name="temperatureMax"
                                                min="0"
                                                max="100"
                                                inputProps={{
                                                    maxLength: 3,
                                                    step: "0.1",

                                                }}
                                                {...register('temperatureMax', {
                                                    required: "Это поле обязательноd",
                                                    max: {
                                                        value: 40,
                                                        message: 'Макс. допустимое значение: 40'
                                                    },
                                                    min: {
                                                        value: 10,
                                                        message: 'Минимальное значение: 10'
                                                    },
                                                    maxLength: {
                                                        value: 4,
                                                        message: 'Только с точностью до десятых'
                                                    }
                                                })}
                                                error={errors?.temperatureMax ? true : false}
                                                helperText={errors?.temperatureMax?.message}
                                            />
                                        </Grid>
                                        <Grid container justifyContent="flex-end" xs={6} sx={{ mt: 2 }}>
                                            <TextField

                                                required
                                                type="number"
                                                id="humidityMin"
                                                label="Мин. влажность"
                                                name="humidityMin"
                                                inputProps={{
                                                    maxLength: 13,
                                                    step: "0.1"
                                                }}
                                                {...register('humidityMin', {
                                                    required: "Это поле обязательно",
                                                    max: {
                                                        value: 100,
                                                        message: 'Макс. допустимое значение: 100'
                                                    },
                                                    min: {
                                                        value: 0,
                                                        message: 'Минимальное значение: 0'
                                                    },
                                                    maxLength: {
                                                        value: 4,
                                                        message: 'Только с точностью до десятых'
                                                    }
                                                })}
                                                error={errors?.humidityMin ? true : false}
                                                helperText={errors?.humidityMin?.message}
                                            />
                                        </Grid>
                                        <Grid container justifyContent="flex-start" xs={6} sx={{ mt: 2 }}>
                                            <TextField

                                                required
                                                type="number"
                                                id="humidityMax"
                                                label="Макс. влажность"
                                                name="humidityMax"
                                                inputProps={{
                                                    maxLength: 13,
                                                    step: "0.1"
                                                }}
                                                {...register('humidityMax', {
                                                    required: "Это поле обязательно",
                                                    max: {
                                                        value: 100,
                                                        message: 'Макс. допустимое значение: 100'
                                                    },
                                                    min: {
                                                        value: 0,
                                                        message: 'Минимальное значение: 0'
                                                    },
                                                    maxLength: {
                                                        value: 4,
                                                        message: 'Только с точностью до десятых'
                                                    }
                                                })}
                                                error={errors?.humidityMax ? true : false}
                                                helperText={errors?.humidityMax?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <TextField


                                                type="number"
                                                id="growthPeriod"
                                                label="Период роста"
                                                name="growthPeriod"
                                                inputProps={{
                                                    maxLength: 100,
                                                    step: "1"
                                                }}
                                                {...register('growthPeriod', {
                                                    required: "Это поле обязательно",
                                                    pattern: {
                                                        value: /^\d+$/,
                                                        message: 'Только целочисленные значения'
                                                    },
                                                    max: {
                                                        value: 999,
                                                        message: 'Макс. допустимое значение: 999'
                                                    },
                                                    min: {
                                                        value: 1.0,
                                                        message: 'Минимальное значение: 1'
                                                    }

                                                })}
                                                error={errors?.growthPeriod ? true : false}
                                                helperText={errors?.growthPeriod?.message}
                                            />
                                            <Typography color={"red"} sx={{mt:2}}>
                                            {!validateFlag && "Некорректные значения минимумов и максимумов"}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} sx={{ padding: 0 }}>
                                        <Typography component="h3" variant="h5" align='left'>
                                          Дополнительные условия
                                        </Typography>
                                        <Divider></Divider>
                                    </Grid>
                                    <Grid item xs={12} >
                                        {fields.map((item, index) => {
                                            return (
                                                <Grid container spacing={3} key={item.id} sx={{ mt: 1 }}>
                                                    <Grid item xs={8}>
                                                        <TextField
                                                            // sx={{ mt: 3 }}
                                                            required
                                                            fullWidth
                                                            id="description"
                                                            label="Описание условия"
                                                            name="description"

                                                            autoComplete="description"
                                                            {...register(`conditions.${index}.description`, {
                                                                required: "Описание обязательно"
                                                            })}
                                                        // error={errors?.description ? true : false}
                                                        // helperText={errors?.description?.message}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4}  >
                                                        <Button
                                                            // sx={{ mt: 3 }}
                                                            sx={{ mt: 1.5 }}
                                                            size="small"
                                                            fullWidth
                                                            variant="outlined"
                                                            color='error'
                                                            onClick={() => remove(index)}
                                                        >
                                                            Удалить
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size='small'
                                            onClick={() => {
                                                append({ description: '' });
                                            }}

                                        >
                                            Добавить условие
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    color="success"

                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Создать тех. карту
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
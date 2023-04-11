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
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { Autocomplete } from '@mui/material';
import { API_URL, USER_TOKEN } from '../../service/AuthenticationService';
import { useNavigate, useParams } from 'react-router-dom';
import secureGetFetch from '../../service/CustomFetch';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ListItem from '@mui/material/ListItem';
import LabelIcon from '@mui/icons-material/Label';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { fontWeight } from '@mui/system';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

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
    const params = useParams();
    const setupId = params.setupId;

    const [openCollapse, setOpenCollapse] = useState(new Map())
    const [tempRefresher, setTempRefresher] = useState(false);
    const [renderObject, setRenderObject] = useState([]);
    const [plantsTitles, setPlantsTitles] = useState([]);
    const [techMaps, setTechMaps] = useState([]);
    const [renderingMaps, setRenderingMaps] = useState([]);
    const [plantTitle, setPlantTitle] = useState('')
    const [selectedValue, setSelectedValue] = React.useState('');


    const handleOpening = (index) => {
        let temp = openCollapse;
        let value = temp.get(index)
        temp.set(index, !value)
        setOpenCollapse(temp)
        let updateValue = tempRefresher
        setTempRefresher(!updateValue)
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "all"
    });

    const filterRenderingMaps = value => {
        let tempArr = techMaps.filter(x => x.plantTitle === value)
        setRenderingMaps(tempArr)
    }


    const onSubmit = (data) => {
        console.log(data)
        fetch(API_URL + "/setup/plant/" + setupId, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem(USER_TOKEN)
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(()=> {
            navigate('/setup/view/' + setupId)
        })
        
    };

    useEffect(() => {
        secureGetFetch("http://localhost:8080/setup/plant/" + setupId)
            .then(res => res.json())
            .then((result) => {
                setRenderObject(result);
                setPlantsTitles(result.plantsTitles)
                setTechMaps(result.techMaps)

            })
    }, [setupId, plantTitle, selectedValue, openCollapse, tempRefresher])
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
                            pr: '24px',
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
                            Посадка растения
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
                                const { text, icon } = item;
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
                    <Container component="main" maxWidth="sm">
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
                                <LocalFloristIcon></LocalFloristIcon>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Посадить культуру
                            </Typography>
                            <Typography component="h4" variant="subtitle2">
                                Вы собираетесь использовать установку со следующим названием: {renderObject.setupAddress}
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            fullWidth

                                            disablePortal
                                            id="plantTitle"
                                            options={plantsTitles}
                                            onChange={(e, value) => { setPlantTitle(value); filterRenderingMaps(value); setOpenCollapse(new Map()) }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    error={errors?.plantTitle ? true : false}
                                                    helperText={errors?.plantTitle?.message || (!errors.plantTitle && "Выберите растение, которое вы собираетесь использовать")}
                                                    label="Название растения"
                                                    required
                                                    {...register('plantTitle', {
                                                        required: "Plant is required"
                                                    })}
                                                />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="plantAmount"
                                            label="Количество ячеек для посадки"
                                            name="plantAmount"
                                            inputProps={{
                                                maxLength: 100,
                                                step: "1"
                                            }}
                                            {...register('plantAmount', {
                                                required: "Field is required",
                                                pattern: {
                                                    value: /^\d+$/,
                                                    message: 'Only integer values'
                                                },
                                                max: {
                                                    value: renderObject.freeCells,
                                                    message: 'Max value is ' + renderObject.freeCells
                                                },
                                                min: {
                                                    value: 1,
                                                    message: 'Min value is 1'
                                                }

                                            })}
                                            error={errors?.plantAmount ? true : false}
                                            helperText={errors?.plantAmount?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group"
                                            >
                                                <TableContainer component={Paper} sx={{ mt: 3 }}>
                                                    <Table aria-label="collapsible table">

                                                        <TableBody>
                                                            {renderingMaps && renderingMaps.map((row, index) => (
                                                                <React.Fragment key={index}>
                                                                    {openCollapse.get(row.title) === undefined ? openCollapse.set(row.title, false) : undefined}
                                                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                                        <TableCell padding='none' align='center' >
                                                                            <FormControlLabel
                                                                                value={row.title}
                                                                                control={<Radio />}
                                                                                {...register('mapPlantTitle', {
                                                                                    required: "Tech map is required"
                                                                                })}
                                                                                
                                                                                
                                                                            />
                                                                            {/* <Radio
                                                                            checked={selectedValue === row.title}
                                                                            onChange={handleChange}
                                                                            name="radio-button"
                                                                            value={row.title}
                                                                            {...register('mapPlantTitle', {
                                                                                required: "Plant is required"
                                                                            })}>

                                                                        </Radio> */}
                                                                        </TableCell>
                                                                        <TableCell >
                                                                            <IconButton
                                                                                aria-label="expand row"
                                                                                size="small"
                                                                                onClick={() => handleOpening(row.title)}
                                                                            >

                                                                                {openCollapse.get(row.title) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

                                                                            </IconButton>
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row" align="left">
                                                                            <Typography component="h2"
                                                                                variant="h6"
                                                                                color="inherit"
                                                                                align="inherit"
                                                                                style={{ wordWrap: "break-word" }}
                                                                                sx={{ flexGrow: 1 }}>
                                                                                {row.title}
                                                                            </Typography>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                            <Collapse in={openCollapse.get(row.title)} timeout="auto" unmountOnExit>
                                                                                <Box sx={{ margin: 1 }}>
                                                                                    <Typography variant="h6" gutterBottom component="div">
                                                                                        Условия
                                                                                    </Typography>
                                                                                    <Table size="small" aria-label="purchases">
                                                                                        <TableHead>
                                                                                            <TableRow>
                                                                                                <TableCell>Мин °C</TableCell>
                                                                                                <TableCell>Макс °C</TableCell>
                                                                                                <TableCell >Мин %</TableCell>
                                                                                                <TableCell >Макс %</TableCell>
                                                                                            </TableRow>
                                                                                        </TableHead>
                                                                                        <TableBody>
                                                                                            <TableRow>
                                                                                                <TableCell>
                                                                                                    {row.temperatureMin}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    {row.temperatureMax}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    {row.humidityMin}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    {row.humidityMax}
                                                                                                </TableCell>
                                                                                            </TableRow>

                                                                                        </TableBody>
                                                                                    </Table>
                                                                                    <List >
                                                                                        {row.conditions.map((condition, index) => (
                                                                                            <ListItem key={"condition_" + row.title + "_" + index}>
                                                                                                <ListItemIcon>
                                                                                                    <LabelIcon />
                                                                                                </ListItemIcon>
                                                                                                <ListItemText>
                                                                                                    {condition.description}
                                                                                                </ListItemText>
                                                                                            </ListItem>
                                                                                        ))}
                                                                                    </List>
                                                                                </Box>
                                                                            </Collapse>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </React.Fragment>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </RadioGroup>
                                            {errors?.mapPlantTitle?.message && <Typography align='left' color="red" sx={{mt:2, fontSize:12}}>{errors?.mapPlantTitle?.message}</Typography>}
                                        </FormControl>
                                    </Grid>


                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="success"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Посадить
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function PlantProcedure() {
    return <DashboardContent />;
}
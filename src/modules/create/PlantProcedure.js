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

    const [openCollapse, setOpenCollapse] = useState(false)
    const [renderObject, setRenderObject] = useState([]);
    const [plantsTitles, setPlantsTitles] = useState([]);
    const [techMaps, setTechMaps] = useState([]);
    const [renderingMaps, setRenderingMaps] = useState([]);
    const [plantTitle, setPlantTitle] = useState('')
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
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
        // fetch(API_URL + "/container/create", {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': sessionStorage.getItem(USER_TOKEN)
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: JSON.stringify(data) // body data type must match "Content-Type" header
        // })
        // navigate('/containers')
    };

    useEffect(() => {
        secureGetFetch("http://localhost:8080/setup/plant/" + setupId)
            .then(res => res.json())
            .then((result) => {
                setRenderObject(result);
                setPlantsTitles(result.plantsTitles)
                setTechMaps(result.techMaps)
            })
    }, [setupId, plantTitle, selectedValue])
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
                            Plant Procedure
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

                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Plant a culture
                            </Typography>
                            <Typography component="h4" variant="subtitle2">
                                You are going to use setup with next address: {renderObject.setupAddress}
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            fullWidth

                                            disablePortal
                                            id="plantTitle"
                                            options={plantsTitles}
                                            onChange={(e, value) => { setPlantTitle(value); filterRenderingMaps(value) }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    error={errors?.plantTitle ? true : false}
                                                    helperText={errors?.plantTitle?.message || (!errors.plantTitle && "Pick plant that you want to use")}
                                                    label="Plant Title"
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
                                            label="Cells amount"
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
                                        <TableContainer component={Paper} sx={{ mt: 3 }}>
                                            <Table aria-label="collapsible table">

                                                <TableBody>

                                                    {renderingMaps && renderingMaps.map((row, index) => (
                                                        <Row key={index} row={row}></Row>
                                                    ))}


                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </Grid>


                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"

                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Create
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell >
                    <Radio
                        checked={selectedValue === row.title}
                        onChange={handleChange}
                        name="radio-button"
                        value={row.title}
                        {...register('mapPlantTitle', {
                            required: "Plant is required"
                        })}>

                    </Radio>
                </TableCell>
                <TableCell >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                {/* <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Conditions
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Min °C</TableCell>
                                        <TableCell>Max °C</TableCell>
                                        <TableCell >Min %</TableCell>
                                        <TableCell >Max %</TableCell>
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
    );
}

export default function PlantProcedure() {
    return <DashboardContent />;
}
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
import { Link, useParams, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import secureGetFetch from '../../service/CustomFetch';
import ListItem from '@mui/material/ListItem';
import LabelIcon from '@mui/icons-material/Label';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { API_URL, USER_TOKEN } from '../../service/AuthenticationService';
const drawerWidth = 240;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

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
                                Условия
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Мин °C</TableCell>
                                        <TableCell>Макс °C</TableCell>
                                        <TableCell >Мин %</TableCell>
                                        <TableCell >Макс %</TableCell>
                                        <TableCell >Период роста</TableCell>
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
                                        <TableCell>
                                            {row.growthPeriod}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                            <List >
                                {row.conditions.map((condition) => (
                                    <ListItem key={condition.id}>
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


function DashboardContent() {

    const params = useParams();
    const plantId = params.plantId;
    const navigate = useNavigate();
    const [plantItem, setPlantItem] = useState({});
    const [readyToDel, setReadyToDel] = useState(true);

    function isReady() {
        fetch(API_URL + "/plants/delete/" + plantId, {
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
                navigate("/plants")
            } else {
                setReadyToDel(false)
            }
        })
    }

    useEffect(() => {
        secureGetFetch("http://localhost:8080/plants/view/" + plantId)
            .then(res => res.json())
            .then((result) => {
                setPlantItem(result);

            }
            )
    }, [plantId])
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [openDeletePlant, setOpenDeletePlant] = React.useState(false);
    const handleOpen = () => setOpenDeletePlant(true);
    const handleClose = () => setOpenDeletePlant(false);

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
                            Растения
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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', minHeight: 'fit-content', minWidth: 'fit-content' }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: "auto",
                                            width: "auto",
                                            maxHeight: 400,
                                            maxWidth: 370,
                                            // maxHeight: { xs: 370, md: 400 },
                                            // maxWidth: { xs: 370, md: 400 },
                                        }}
                                        alt="Изображение растения."
                                        src={plantItem.picture}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={8}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 'fit-content', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <Typography component="h4"
                                        variant="h4"
                                        color="inherit"
                                        align='left'
                                        style={{ wordWrap: "break-word", fontWeight: "bold" }}
                                        sx={{ flexGrow: 1, mb: 1 }}>
                                        {plantItem.title}
                                        <Button sx={{ ml: 2 }} color='error' variant='contained' size='small' onClick={handleOpen}>Удалить</Button>
                                        <Modal
                                            open={openDeletePlant}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Удаление растения
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2, mb:2 }}>
                                                    Вы уверены, что хотите удалить растение?
                                                </Typography>
                                                {!readyToDel && <Typography color={"red"} sx={{mt:3, mb:3}}>Вы не можете удалить растение, так как оно используется в установке</Typography>}
                                                <Grid container maxWidth="lg" spacing={3}>
                                                    <Grid item>
                                                       <Button color='success' variant='contained' onClick={()=> isReady()} >Удалить</Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant='contained' color="error" onClick={()=> handleClose()}>Назад</Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Modal>
                                    </Typography>
                                    <Typography component="h5"
                                        variant="h5"
                                        color="inherit"
                                        align='left'
                                        style={{ wordWrap: "break-word" }}
                                        sx={{ flexGrow: 1 }}>
                                        {plantItem.description}

                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 10 }}>
                                <Typography component="h2"
                                    variant="h5"
                                    color="inherit"
                                    align='left'
                                    style={{ wordWrap: "break-word" }}
                                    sx={{ flexGrow: 1 }}>
                                    Технологические карты
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider></Divider>
                        <Grid item xs={12}>
                            <TableContainer component={Paper} sx={{ mt: 3 }}>
                                <Table aria-label="collapsible table">

                                    <TableBody>
                                        {plantItem.maps && plantItem.maps.map((techMap) => (
                                            <Row key={techMap.id} row={techMap} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{ color: "green", mt: 3, width: "20%" }}
                                variant="outlined"
                                color="success"
                                size='large'
                                onClick={() => { navigate('/maps/create/' + plantId) }}
                            >Создать тех. карту</Button>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function ViewPlant() {
    return <DashboardContent />;
}
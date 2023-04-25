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
import { USER_TOKEN, API_URL } from '../../service/AuthenticationService';
import Modal from '@mui/material/Modal';

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
    pt: 2,
    px: 4,
    pb: 3,
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

function DashboardContent() {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [flag, setFlag] = useState(false)
    const [openModal, setOpenModal] = React.useState(false);
    const [openMap, setOpenMap] = useState(new Map())

    const handleOpen = (taskId) => {
        if (openMap.get(taskId) === undefined) {
            openMap.set(taskId, false)
        } else {
            openMap.set(taskId, true)
        }
        var temp = openModal
        setOpenModal(!temp)
    };

    const handleClose = (taskId) => {
        console.log(openMap)
        openMap.set(taskId, false)
        setOpenModal(false);
    };

    const initOpen = (taskId) => {
        if (openMap.get(taskId) === undefined) {
            openMap.set(taskId, false)
            return true;
        } else {
            return openMap.get(taskId)
        }
    }

    useEffect(() => {
        secureGetFetch("http://localhost:8080/tasks/all")
            .then(res => res.json())
            .then((result) => {
                setTasks(result);

            })

    }, [flag, openModal])

    const deleteTask = (taskId) => {
        console.log(openMap)
        openMap.set(taskId, false)
        setOpenModal(false)
        fetch(API_URL + "/task/delete", {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem(USER_TOKEN)
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(taskId) // body data type must match "Content-Type" header
        })
        navigate("/tasks")
        
    }

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
                            Задачи
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
                        sx={{ flexGrow: 1, fontSize: '26pt', ml: 2, mt: 4 }}>
                        Задачи
                        <Divider sx={{ mb: 4 }}></Divider>
                    </Typography>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid item xs={12}>


                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '15pt' }} align="left">Название задачи</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align="center">ID урожая</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align='center'>Статус</TableCell>
                                            <TableCell sx={{ fontSize: '15pt' }} align='left'></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tasks && tasks.map((task, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ fontSize: '15pt' }} align="left">{task.title}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{task.harvestUUID}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{task.status}</TableCell>
                                                <TableCell sx={{ fontSize: '15pt' }} align="right">
                                                    {/* onClick={task.status === "HARVEST_DONE" ? () => deleteTask(task.id) : () => tempFixed(task.id)} */}
                                                    <Button
                                                        onClick={() => handleOpen(task.id)}
                                                        variant='contained'
                                                        disabled={task.status === "IN_PROGRESS"}
                                                        color={task.status === "HARVEST_DONE" ? "success" : "warning"}>
                                                        Подтвердить
                                                    </Button>
                                                    <Modal
                                                        open={initOpen(task.id)}
                                                        onClose={() => handleClose(task.id)}
                                                        aria-labelledby={task.id}
                                                        aria-describedby={task.id + "descr"}
                                                    >
                                                        <Box sx={{ ...style, width: "50%" }}>
                                                            {task.status === "HARVEST_DONE" ? <h2 id={task.id}>Подтвердить сбор</h2> : <h2 id={task.id}>Control warning</h2>}

                                                            <p id={task.id + "descr"}>
                                                                {task.status === "HARVEST_DONE" ? "Нажмите 'Подтвердить', если согласны собрать урожай. Ячейки с этим растением будут очищены" : ""}
                                                            </p>
                                                            <Grid container maxWidth="lg" spacing={3}>
                                                                <Grid item>
                                                                    {task.status === "HARVEST_DONE" && <Button variant='contained' color="success" onClick={() => deleteTask(task.id)}>Подтвердить</Button>}
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button variant='contained' color="error" onClick={() => handleClose(task.id)}>Закрыть</Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Modal></TableCell>
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
        </ThemeProvider >
    );
}

export default function Tasks() {
    return <DashboardContent />;
}
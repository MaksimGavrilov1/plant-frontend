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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useCallback } from 'react';
import { render } from '@testing-library/react';
import { Hidden } from '@mui/material';

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
    const [tempViols, setTempViols] = useState([]);
    const [numberCount, setNumberCount] = useState(0);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [alignment, setAlignment] = React.useState('default');
    const [emptyFlag, setEmptyFlag] = useState(true);
    const [listItems, setListItems] = useState()


    const renderIcons = () => {
        return <>
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
            {secondaryListItems}</>
    }

    const handleChange = (event, newAlignment) => {
        console.log(newAlignment)
        let temp = violations;
        if (newAlignment == "checked") {
            temp = temp.filter(viol => viol.isChecked);
            setTempViols(temp)
            if (temp.length === 0) {
                setEmptyFlag(false)
            }
        } else if (newAlignment == "active") {
            temp = temp.filter(viol => !viol.isChecked)
            if (temp.length === 0) {
                setEmptyFlag(false)
            }
            setTempViols(temp)
        } else {
            setTempViols(violations)
        }
        setAlignment(newAlignment);
        setUpdateFlag(!updateFlag)
    };

    function checkViolation(id) {
        fetch(API_URL + "/violations/check", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem(USER_TOKEN)
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(id) // body data type must match "Content-Type" header
        }).then((result) => {
            if (result.status == 200) {

            }

        })
        let count = numberCount;
        count++;
        let temp
        if (alignment === "active") {
            temp = tempViols.filter(x => x.id == id ? false : true)
            setTempViols(temp)
        } else if (alignment === "checked" || alignment === null) {
            temp = tempViols.find(x => x.id == id);
            console.log("alignment == checked")
            let index = tempViols.indexOf(temp)
            temp.isChecked = true;
            tempViols[index] = temp
            setTempViols(tempViols)
        } else if (alignment === "default") {
            console.log("YOU ARE HERE")
            temp = violations.find(x => x.id == id);
            let index = violations.indexOf(temp)
            temp.isChecked = true;
            violations[index] = temp
            setViolations(violations)
        }


        setNumberCount(count)
        let tempS = mainListItems.map((item, index) => {
            const { text, icon, to } = item;
            return (
                <ListItemButton component={Link} to={item.to} key={text}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />

                </ListItemButton>
            );
        })
        setListItems(tempS)

    }

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
                let temp = mainListItems.map((item, index) => {
                    const { text, icon, to } = item;
                    return (
                        <ListItemButton component={Link} to={item.to} key={text}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <ListItemText primary={text} />

                        </ListItemButton>
                    );
                })
                setListItems(temp)

            }
            )
    }, [updateFlag, alignment, numberCount, listItems])
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
                        {numberCount >= 0 &&
                            listItems
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
                        Нарушения


                    </Typography>
                    <Typography component="h4"
                        variant="h4"
                        color="inherit"
                        align='left'
                        sx={{ flexGrow: 1, fontSize: '16pt', ml: 2, mt: 4, color: "gray" }}>
                        Несовпадение данных из технологической карты и актуальных климатических параметров приводит к созданию нарушений. Журналирование подобных ситуаций помогает поддерживать контроль роста культур. Уведомления будут активны до тех пор, пока вы не подтвердите нарушение.
                    </Typography>
                    <Divider sx={{ mb: 4 }}></Divider>
                    <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
                        <Grid item xs={12} align="left">
                            <ToggleButtonGroup
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                                aria-label="Platform"
                            >
                                <ToggleButton color='success' value="checked">Просмотренные</ToggleButton>
                                <ToggleButton color="error" value="active">Активные</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>

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
                                        {tempViols.length != 0 || !emptyFlag ? (tempViols.map((viol, index) => (
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
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{<Button variant='contained' disabled={viol.isChecked} onClick={() => checkViolation(viol.id)} color='success'>Подтвердить</Button>}</TableCell>
                                                {/* <TableCell><Button sx={{ color: "green" }} onClick={() => { navigate('/setup/view/' + setup.id) }} size="large">Check</Button></TableCell> */}
                                            </TableRow>
                                        ))) : violations.map((viol, index) => (
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
                                                <TableCell sx={{ fontSize: '15pt' }} align="center">{<Button variant='contained' disabled={viol.isChecked} onClick={() => checkViolation(viol.id)} color='success'>Подтвердить</Button>}</TableCell>
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
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../dashboard/listitems';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

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
                        {"ID урожая: " + row.harvestUUID}
                    </Typography>
                    <Typography
                        component="h2"
                        variant="h6"
                        color="inherit"
                        align="inherit"
                        style={{ wordWrap: "break-word" }}
                        sx={{ flexGrow: 1 }}>
                        {" Дата посадки: " + new Date(row.dateOfPlant).toLocaleString("ru-RU")}
                    </Typography>

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Информация
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Помещение</TableCell>
                                        <TableCell>Название установки</TableCell>
                                        <TableCell >Растение</TableCell>
                                        <TableCell >Тех. карта</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {row.containerTitle}
                                        </TableCell>
                                        <TableCell>
                                            {row.setupAddress}
                                        </TableCell>
                                        <TableCell>
                                            {row.plantTitle}
                                        </TableCell>
                                        <TableCell>
                                            {row.techMapTitle}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                            <Typography
                                sx={{ m: 2 }}>
                                ID ячеек:
                                {row.cellsIds.map((id) => (
                                    id + " "
                                ))}
                            </Typography>

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function DashboardContent() {
    const navigate = useNavigate();
    const [historyRows, setHistoryRows] = useState([]);
    const [tempRows, setTempRows] = useState([])
    const [tempFlag, setTempFlag] = useState(false)
    const [dateBefore, setDateBefore] = useState(null);
    const [dateAfter, setDateAfter] = useState(null);
    const [harvestId, setHarvestId] = useState('');
    const [tempArr, setTempArr] = useState();



    useEffect(() => {
        secureGetFetch("http://localhost:8080/history/all")
            .then(res => res.json())
            .then((result) => {

                result.forEach(element => {

                    // var temp = new Date(element.dateOfPlant)
                    // element.dateOfPlant = temp.toLocaleString("ru-RU");
                });
                setHistoryRows(result);
            }
            )
    }, [])

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    function search() {
        setTempFlag(true)
        let temp;
        if (dateAfter == null && dateBefore == null && harvestId == '') {
            temp = historyRows
        } else {
            try {
                if (harvestId == '') {
                    console.log(harvestId)
                    temp = historyRows.filter((item) => {
                        return new Date(item.dateOfPlant).getTime() >= Date.parse(dateAfter.toString()) &&
                            new Date(item.dateOfPlant).getTime() <= Date.parse(dateBefore.toString());
                    });
                } else {
                    temp = historyRows.filter((item) => {
                        return new Date(item.dateOfPlant).getTime() >= Date.parse(dateAfter.toString()) &&
                            new Date(item.dateOfPlant).getTime() <= Date.parse(dateBefore.toString()) &&
                            item.harvestUUID == harvestId
                    });
                }
            } catch {
                if (dateAfter == null && dateBefore == null && harvestId != '') {
                    temp = historyRows.filter((item) => {
                        return item.harvestUUID == harvestId;
                    });
                }
                else if (dateAfter == null && harvestId == '') {
                    temp = historyRows.filter((item) => {
                        return new Date(item.dateOfPlant).getTime() <= Date.parse(dateBefore.toString());
                    });
                } else if (dateBefore == null && harvestId == '') {
                    temp = historyRows.filter((item) => {
                        return new Date(item.dateOfPlant).getTime() >= Date.parse(dateAfter.toString());
                    });
                } else if (dateAfter == null && harvestId != '') {
                    temp = historyRows.filter((item) => {
                        console.log(harvestId)
                        console.log(item.harvestUUID)
                        return new Date(item.dateOfPlant).getTime() <= Date.parse(dateBefore.toString()) &&
                            item.harvestUUID == harvestId
                    });
                } else if (dateBefore == null && harvestId != '') {
                    temp = historyRows.filter((item) => {
                        return new Date(item.dateOfPlant).getTime() >= Date.parse(dateAfter.toString()) &&
                            item.harvestUUID == harvestId
                    });
                }
            }
        }
        setTempRows(temp)
        console.log(temp)



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
                            История
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
                    <Typography component="h1"
                        variant="h1"
                        color="inherit"
                        align='left'
                        sx={{ flexGrow: 1, fontSize: '26pt', ml: 2, mt: 4 }}>
                        История
                        
                    </Typography>
                    <Typography component="h4"
                        variant="h4"
                        color="inherit"
                        align='left'
                        sx={{ flexGrow: 1, fontSize: '16pt', ml: 2, mt: 4, color:"gray" }}>
                        Каждая посадка растений записывается в истории в виде набора данных. Используя поиск, можно находить необходимые записи. Каждая запись в истории содержит данные о растении, технологической карте, помещении, установке, а также данные об ID ячеек, которые были использованы для посадки. История сохраняется после удаления установок и помещений.
                        
                    </Typography>
                    <Divider sx={{ mb: 4 }}></Divider>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Paper align="center">
                            <Grid item xs={12} >
                                <Typography sx={{ ml: 4 }} align='left' component={"h4"} variant='h4'>
                                    Поиск
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker value={dateAfter} onChange={(newVal) => setDateAfter(newVal)} label="Начиная с" sx={{ m: 2 }}></DatePicker>
                                <DatePicker value={dateBefore} onChange={(newVal) => setDateBefore(newVal)} label="До" sx={{ m: 2 }}></DatePicker>

                            </Grid>
                            <Grid item xs={12}>

                                <TextField
                                    label="ID урожая"
                                    onChange={(event) => { setHarvestId(event.target.value) }}
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => search()} color='success' variant='contained' sx={{ m: 2 }}>Поиск</Button>
                            </Grid>
                        </Paper>
                        <Grid item xs={12}>
                            <TableContainer component={Paper} sx={{ mt: 3 }}>
                                <Table aria-label="collapsible table">

                                    <TableBody>
                                        {tempFlag == true ? tempRows.map((rows) => (
                                            <Row key={rows.harvestUUID} row={rows} />
                                        )) : historyRows.map((rows) => (
                                            <Row key={rows.harvestUUID} row={rows} />
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

export default function History() {
    return <DashboardContent />;
}
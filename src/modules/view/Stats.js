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
import { mainListItems, secondaryListItems } from './../dashboard/listitems';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import secureGetFetch from '../../service/CustomFetch';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const drawerWidth = 240;

const COLORS = ['#228b22', '#ff0000'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {}
            {index == 0 ? ` ${(percent * 100).toFixed(0)}% ` : `${(percent * 100).toFixed(0)}%` }
        </text>
    );
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
    const [stats, setStats] = useState()
    const [violationStats, setViolationStats] = useState([])
    const [busyIndex, setBusyIndex] = useState()

    useEffect(() => {
        secureGetFetch("http://localhost:8080/stats/all")
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setStats(result);
                let temp = result.violations
                temp.forEach(element => {
                    var date = new Date(element.date)
                    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    element.date = date.toLocaleDateString("ru-RU")
                    //date.customFormat("#DD#/#MM# #hh#:#mm#:#ss#")
                });
                let busyMap = [
                    { name: "free", value: 100 - result.busyPercent },
                    { name: "occupied", value: result.busyPercent }
                ]
                setBusyIndex(busyMap)
                setViolationStats(temp)
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
                            Статистика
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
                        Статистика

                    </Typography>

                    <Divider sx={{ mb: 4 }}></Divider>
                    <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
                        <Typography component="h1"
                            variant="h1"
                            color="inherit"
                            align='left'
                            sx={{ flexGrow: 1, fontSize: '22pt', ml: 2, mt: 4 }}>
                            Пользователь: {stats && stats.surname + " " + stats.name + " " + stats.middleName}

                        </Typography>
                        <Grid item xs={12}>
                            <Typography component="h1"
                                variant="h1"
                                color="inherit"
                                align='left'
                                sx={{ flexGrow: 1, fontSize: '22pt', ml: 2, mt: 4 }}>
                                Ваша ферма:

                            </Typography>
                            <Divider sx={{ mb: 4 }}></Divider>
                        </Grid>
                        <Grid item xs={12} sx={{ m: 1 }} >
                            <Paper sx={{ p: 1 }}>
                                <Typography component="h1"
                                    variant="h1"
                                    color="inherit"
                                    align='left'
                                    sx={{ flexGrow: 1, fontSize: '24pt', m: 2 }}>
                                    Количество помещений: {stats && stats.contNum}

                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{ m: 1 }} >
                            <Paper sx={{ p: 1 }}>
                                <Typography component="h1"
                                    variant="h1"
                                    color="inherit"
                                    align='left'
                                    sx={{ flexGrow: 1, fontSize: '24pt', m: 2 }}>
                                    Количество растений: {stats && stats.plantNum}

                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{ m: 1 }} >
                            <Paper sx={{ p: 1 }}>
                                <Typography component="h1"
                                    variant="h1"
                                    color="inherit"
                                    align='left'
                                    sx={{ flexGrow: 1, fontSize: '24pt', m: 2 }}>
                                    Количество установок: {stats && stats.setupNum}

                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{ m: 1 }} >




                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 300,
                                }}
                            >
                                <Typography component="h1"
                                    variant="h1"
                                    color="inherit"
                                    align='left'
                                    sx={{ flexGrow: 1, fontSize: '24pt', m: 2 }}>
                                    Статистика нарушений:
                                </Typography>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={violationStats}
                                        width={300}
                                        height={250}
                                    >
                                        <CartesianGrid />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            name="Количество нарушений"
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#FF0000"
                                            activeDot={true}
                                        />

                                    </LineChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sx={{ m: 1 }}>
                            <Typography component="h1"
                                variant="h1"
                                color="inherit"
                                align='left'
                                sx={{ flexGrow: 1, fontSize: '24pt', m: 2 }}>
                                Степень загруженности:
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 300,
                                }}
                            >
                                <Typography component="h1"
                                variant="h1"
                                color="inherit"
                                align='left'
                                sx={{ flexGrow: 1, fontSize: '14pt', mt: 2 }}>
                                Процент занятых ячеек в теплице по отношению к общему их количеству составляет - {stats && stats.busyPercent}%
                            </Typography>
                                
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart width={500} height={250}
                                    >
                                        <Pie labelLine={false}
                                            label={renderCustomizedLabel} data={busyIndex} dataKey="value" nameKey="free" fill="#82ca9d" >
                                            {busyIndex && busyIndex.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                
                            </Paper>


                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Stats() {
    return <DashboardContent />;
}
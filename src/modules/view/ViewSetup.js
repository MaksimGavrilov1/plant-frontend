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
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from 'react-router-dom';
import secureGetFetch from '../../service/CustomFetch';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Popover from '@mui/material/Popover';

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

const mdTheme = createTheme({

    status: {
        danger: '#e53e3e',
    },
    palette: {

        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#DCDCDC',
            contrastText: '#fff',
        },
        pageNumbers: {
            main: '#808080',
            contrastText: '#fff',
        },
    },
});

function ViewSetupContent() {
    const params = useParams();
    const setupId = params.setupId;
    const navigate = useNavigate();
    const [setupItem, setSetupItem] = useState({});
    const [pageButtons, setPageButtons] = useState([])
    const [cells, setCells] = useState([])
    const [level, setLevel] = useState(0)
    const [alignment, setAlignment] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPopup = Boolean(anchorEl);
    const id = openPopup ? 'simple-popover' : undefined;

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
        setLevel(newAlignment)
    };


    const sortCells = (cells) => {
        return cells.filter(x => x.key.startsWith(level.toString()))
    }

    useEffect(() => {

        const fetchData = async () => {
            let tempObject = {}
            secureGetFetch("http://localhost:8080/setup/get/" + setupId)
                .then(res => res.json())
                .then((result) => {
                    setSetupItem(result);
                    tempObject = result
                })
                .then(() => {
                    let temp = []
                    let tempCell = []
                    for (let i = 0; i < tempObject.levelsAmount; i++) {
                        temp.push(<ToggleButton
                            value={i}
                            key={i}
                            variant="contained"
                            sx={{ border: 0, p: 1, m: 1, fontSize: 25 }}
                        >
                            {i + 1}
                        </ToggleButton>)
                        // if (i == 0) {
                        //     temp.push(<Button key={i + 1}
                        //         onClick={() => { setLevel(i) }}
                        //         color="pageNumbers"
                        //         variant="contained"
                        //         sx={{ borderRadius: 100, padding: 1, m: 1, fontSize: 26 }}>
                        //         {i + 1}
                        //     </Button>);
                        // } else {
                        //     temp.push(<Button
                        //         id={i}
                        //         key={i + 1}
                        //         onClick={(e) => { setLevel(i); changeColor(e) }}
                        //         variant={() => { return level === i ? "contained" : "outlined" }}
                        //         color="pageNumber" sx={{ borderRadius: 100, padding: 1, m: 1, fontSize: 26 }}>{i + 1}</Button>);
                        // }

                    }
                    setPageButtons(temp)
                    for (let i = 0; i < tempObject.cells.length; i++) {
                        let cellPlantTitle = tempObject.cells[i].plantTitle
                        let cellLevel = tempObject.cells[i].level
                        if (cellPlantTitle) {
                            tempCell.push(
                                <Grid key={"" + cellLevel + "_level_" + i} item >
                                    <Button
                                        aria-describedby={id}
                                        onClick={handleClick}
                                        color="success"
                                        size='small'
                                        variant="contained"
                                        fontSize="small"
                                        sx={{ borderRadius: 400, padding: 2.5, m: 1, maxWidth: 0, maxHeight: 0, minWidth: 0, minHeight: 0, fontSize: 1 }}></Button>
                                    <Popover
                                        id={id}
                                        open={openPopup}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Typography sx={{ p: 2 }}>{cellPlantTitle}</Typography>
                                    </Popover>
                                </Grid>
                            )
                        } else {
                            tempCell.push(
                                <Grid key={"" + cellLevel + "_level_" + i} item >
                                    <Button
                                        aria-describedby={id}
                                        onClick={handleClick}
                                        color="neutral"
                                        size='small'
                                        variant="contained"
                                        fontSize="small"
                                        sx={{ borderRadius: 400, padding: 2.5, m: 1, maxWidth: 0, maxHeight: 0, minWidth: 0, minHeight: 0, fontSize: 1 }}></Button>
                                    <Popover
                                        id={id}
                                        open={openPopup}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        elevation={0}
                                        sx={{}}
                                    >
                                        <Typography sx={{ p: 2, border:1 }} >Empty</Typography>
                                    </Popover>
                                </Grid>
                            )

                        }


                    }
                    console.log(tempCell)
                    setCells(tempCell)
                })
        }
        fetchData()
    }, [setLevel, id, openPopup, anchorEl])
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
                            Hydroponic Setup
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
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 'fit-content', minWidth: 'fit-content' }}>
                                    <Typography component="h2"
                                        variant="h4"
                                        color="inherit"
                                        align='left'
                                        noWrap
                                        sx={{ flexGrow: 1 }}>
                                        Address:  {setupItem.address}
                                    </Typography>
                                    <Grid container spacing={3} sx={{ mt: 2 }}>
                                        <Grid item xs={4}>
                                            <Typography component="h6"
                                                variant="h6"
                                                color="inherit"
                                                align='left'
                                                noWrap
                                                sx={{ flexGrow: 1 }}>
                                                Cells amount:  {setupItem.freeCells + setupItem.occupiedCells}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography component="h6"
                                                variant="h6"
                                                color="inherit"
                                                align='left'
                                                noWrap
                                                sx={{ flexGrow: 1 }}>
                                                Free cells amount:  {setupItem.freeCells}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography component="h6"
                                                variant="h6"
                                                color="inherit"
                                                align='left'
                                                noWrap
                                                sx={{ flexGrow: 1 }}>
                                                Occupied cells amount:  {setupItem.occupiedCells}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="h5"
                                                variant="h5"
                                                color="inherit"
                                                align='left'
                                                noWrap
                                                sx={{ flexGrow: 1 }}>
                                                Plants on setup:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <List>
                                                {setupItem.plantsTitles && setupItem.plantsTitles.map((plantTitle, index) => (
                                                    <ListItem key={index}>
                                                        <ListItemIcon>
                                                            <ArrowRightIcon></ArrowRightIcon>
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {plantTitle}
                                                        </ListItemText>
                                                    </ListItem>

                                                ))}
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 'fit-content', minWidth: 'fit-content' }}>
                                    <Typography component="h4"
                                        variant="h4"
                                        color="inherit"
                                        align='left'
                                        noWrap
                                        sx={{ flexGrow: 1 }}>
                                        Space info
                                    </Typography>
                                    <Divider></Divider>
                                    <Grid container spacing={4} sx={{ flexGrow: 1 }}>
                                        <Grid item xs={12}>
                                            <ToggleButtonGroup
                                                color="success"
                                                value={alignment}
                                                exclusive
                                                onChange={handleChange}
                                                aria-label="Page"
                                                sx={{ m: 1 }}
                                            >
                                                {pageButtons}
                                            </ToggleButtonGroup>

                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container rowSpacing={0} columnSpacing={{ xs: 12, sm: 12, md: 12 }} justifyContent="space-around">
                                                {sortCells(cells)}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>

                            </Grid>
                            <Grid item xs={12}>
                                <Button size="large" color='success' variant="contained" onClick={()=>{navigate('/setup/plant/' + setupId)}}>Plant</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function ViewSetup() {
    return <ViewSetupContent />;
}
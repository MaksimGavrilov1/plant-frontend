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
    const [anchorElMap, setAnchorElMap] = React.useState(new Map());
    const [openPopupMap, setOpenPopupMap] = useState(new Map());
    const [tempRefresh, setTempRefresh] = useState(false);



    const handleClick = (event) => {
        let tempRefreshValue = tempRefresh;
        setTempRefresh(!tempRefreshValue)
        let stringWithIndex = event.target.id;
        let splittedArray = stringWithIndex.split("_");
        let index = splittedArray[1];
        let tempAnchor = anchorElMap;
        tempAnchor.set("cell_" + index, event.currentTarget);
        setAnchorElMap(tempAnchor)
        let tempPop = openPopupMap;
        tempPop.set("cell_" + index, true)
        setOpenPopupMap(tempPop)
    };

    const handleClose = (event) => {
        let tempAnchor = anchorElMap;
        let tempPop = openPopupMap;
        for (let [key, value] of tempPop) {
            if (value) {
                tempPop.set(key, false)
            }
        }
        setAnchorElMap(tempAnchor)
        setOpenPopupMap(tempPop)
        let tempRefreshVal = tempRefresh;
        setTempRefresh(!tempRefreshVal)
    };

    const [readyToDel, setReadyToDel] = useState(true);

    function isReady() {
        fetch(API_URL + "/setup/delete/" + setupId, {
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
                navigate("/containers")
            } else {
                setReadyToDel(false)
            }
        })
    }

    const [openDeletePlant, setOpenDeletePlant] = React.useState(false);
    const handleOpenDelete = () => setOpenDeletePlant(true);
    const handleCloseDelete = () => setOpenDeletePlant(false);

    const id = openPopupMap.get("cell_1") ? 'simple-popover' : undefined;

    const handleChange = (event, newAlignment) => {
        if (newAlignment === null){
            
        } else {
            setAlignment(newAlignment)
            setLevel(newAlignment)
        }
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
                        let techMapTitle = tempObject.cells[i].techMapTitle
                        let dateOfPlant = tempObject.cells[i].dateOfPlant
                        let cellID = tempObject.cells[i].cellId
                        var plantDate = new Date(dateOfPlant)
                    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateOfPlant = plantDate.toLocaleString("ru-RU")
                        if (cellPlantTitle) {
                            tempCell.push(
                                <Grid key={"" + cellLevel + "_level_" + i} item >
                                    <Button
                                        id={"button_" + i}
                                        aria-describedby={"simple-popover_" + i}
                                        onClick={handleClick}
                                        color="success"
                                        size='small'
                                        variant="contained"
                                        fontSize="small"
                                        sx={{ borderRadius: 400, padding: 2.5, m: 1, maxWidth: 0, maxHeight: 0, minWidth: 0, minHeight: 0, fontSize: 1 }}></Button>
                                    <Popover
                                        id={"simple-popover_" + i}
                                        open={openPopupMap.get("cell_" + i) === undefined ? false : openPopupMap.get("cell_" + i)}
                                        // openPopupMap.get("cell_" + i) || (openPopupMap.size === 0 && false)
                                        anchorEl={anchorElMap.get("cell_" + i)}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        elevation={0}
                                        sx={{}}
                                    >
                                        <Typography sx={{ p: 2 }}>{"Растение: " + cellPlantTitle  }</Typography>
                                        <Typography sx={{ p: 2, m:0 }}>{" \nТех. карта: " + techMapTitle}</Typography>
                                        <Typography sx={{ p: 2, m:0 }}>{" Дата посадки: " + dateOfPlant}</Typography>
                                        <Typography sx={{ p: 2, m:0 }}>{" ID ячейки: " + cellID}</Typography>
                                    </Popover>
                                </Grid>
                            )
                        } else {
                            tempCell.push(
                                <Grid key={"" + cellLevel + "_level_" + i} item >
                                    <Button
                                        id={"button_" + i}
                                        aria-describedby={"simple-popover_" + i}
                                        onClick={handleClick}
                                        color="neutral"
                                        size='small'
                                        variant="contained"
                                        fontSize="small"
                                        sx={{ borderRadius: 400, padding: 2.5, m: 1, maxWidth: 0, maxHeight: 0, minWidth: 0, minHeight: 0, fontSize: 1 }}></Button>
                                    <Popover
                                        id={"simple-popover_" + i}
                                        open={openPopupMap.get("cell_" + i) === undefined ? false : openPopupMap.get("cell_" + i)}
                                        anchorEl={anchorElMap.get("cell_" + i)}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        elevation={0}
                                        sx={{}}
                                    >
                                        <Typography sx={{ p: 2 }} >Empty</Typography>
                                    </Popover>
                                </Grid>
                            )

                        }


                    }
                    setCells(tempCell)
                })
        }
        fetchData()
    }, [setLevel, id, tempRefresh])
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
                            Установка
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
                                        Название:  {setupItem.address}
                                        <Button sx={{ ml: 2 }} color='error' variant='contained' size='small' onClick={handleOpenDelete}>Удалить</Button>
                                        <Modal
                                            open={openDeletePlant}
                                            onClose={handleCloseDelete}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Удаление установки
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2, mb:2 }}>
                                                    Вы уверены, что хотите удалить установку?
                                                </Typography>
                                                {!readyToDel && <Typography color={"red"} sx={{mt:3, mb:3}}>Вы не можете удалить установку, так как существуют еще занятые ячейки</Typography>}
                                                <Grid container maxWidth="lg" spacing={3}>
                                                    <Grid item>
                                                       <Button color='success' variant='contained' onClick={()=> isReady()} >Удалить</Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant='contained' color="error" onClick={()=> handleCloseDelete()}>Назад</Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Modal>
                                    </Typography>
                                    
                                    <Grid container spacing={3} sx={{ mt: 2 }}>
                                        <Grid item xs={4}>
                                            <Typography component="h6"
                                                variant="h6"
                                                color="inherit"
                                                align='left'
                                                noWrap
                                                sx={{ flexGrow: 1 }}>
                                                Количество ячеек:  {setupItem.freeCells + setupItem.occupiedCells}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography component="h6"
                                                variant="h6"
                                                color="inherit"
                                                align='left'
                                                noWrap
                                                sx={{ flexGrow: 1 }}>
                                                Свободно ячеек:  {setupItem.freeCells}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography component="h6"
                                                variant="h6"
                                                color="inherit"
                                                align='left'
                                                noWrap
                                                sx={{ flexGrow: 1 }}>
                                                Занято ячеек:  {setupItem.occupiedCells}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="h5"
                                                variant="h5"
                                                color="inherit"
                                                align='left'
                                                noWrap
                                                sx={{ flexGrow: 1 }}>
                                                Виды растений в установке:
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
                                        Информация о ячейках
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
                                <Button size="large" color='success' variant="contained" onClick={() => { navigate('/setup/plant/' + setupId) }}>Посадить</Button>
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
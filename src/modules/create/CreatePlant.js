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
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useForm } from "react-hook-form";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ListItemIcon } from '@mui/material';
import { USER_TOKEN, API_URL } from '../../service/AuthenticationService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import GrassIcon from '@mui/icons-material/Grass';

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

    const convertBlobToBase64 = async (blob) => {
        return await blobToBase64(blob);
      }
      
      const blobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "all"
    });

    const onSubmit = (data) => {
        var newData = { }
        newData.title = data.title;
        newData.description = data.description
        var fr = new FileReader();
        convertBlobToBase64(selectedImage)
        .then((result) => {
            newData.picture = result;
            console.log(newData);
            fetch(API_URL + "/plants/create", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem(USER_TOKEN)
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(newData) // body data type must match "Content-Type" header
            })
            navigate('/plants')
        })
        // console.log(URL.createObjectURL(selectedImage).length)
        // fetch(URL.createObjectURL(selectedImage)).
        //     then(function(response) {
        //         console.log(response.blob)
        //     })
        
    };



    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

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
                            Растения
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
                    <Container component="main" maxWidth="xs">
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
                                <GrassIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Создать растение
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="title"
                                            label="Название"
                                            name="title"

                                            autoComplete="title"
                                            {...register('title', {
                                                required: "Название является обязательным полем"
                                            })}
                                            error={errors?.title ? true : false}
                                            helperText={errors?.title?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="description"
                                            label="Описание"
                                            name="description"
                                            multiline
                                            rows={4}
                                            autoComplete="description"
                                            {...register('description')}
                                            error={errors?.description ? true : false}
                                            helperText={errors?.description?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <>
                                            <input
                                                accept="image/*"
                                                type="file"
                                                id="picture"
                                                style={{ display: "none" }}
                                                {...register('picture')}
                                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                            />
                                            {imageUrl && selectedImage && (
                                                <Box sx={{mb:4, p:0}} textAlign="center">
                                                    <Typography sx={{mb:1}} component="h4" variant='h6' >Preview:</Typography>
                                                    <img src={imageUrl} alt={selectedImage.name} height="150px" />
                                                </Box>
                                            )}
                                            <label htmlFor="picture">
                                                <Button variant="contained" size="small" color="secondary" component="span">
                                                    Загрузить изображение
                                                </Button>
                                            </label>
                                            
                                        </>
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="success"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Создать
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function CreatePlant() {
    return <DashboardContent />;
}
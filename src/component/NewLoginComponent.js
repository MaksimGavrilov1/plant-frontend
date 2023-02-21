import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthenticationService, { USER_TOKEN, API_URL } from '../service/AuthenticationService';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import RandomImage from '../service/RandomImageService';


const theme = createTheme();

export default function NewLoginComponent() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: "all"
  });

  const [failedLogin, setFailedLogin] = useState(false);

  const onSubmit = (data) => {
    console.log(data)
    AuthenticationService
      .executeBasicAuthenticationService(data.username, data.password)
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(data.username, data.password)
        navigate('/containers')
      }).catch(() => {
        setFailedLogin(true)
      })

  };
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${RandomImage()})`
            ,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                {...register('username', {
                  required: "Username is required"
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password', {
                  required: "Password is required"
                })}
                error={errors?.title ? true : false}
                helperText={errors?.title?.message || (failedLogin && <p style={{color:'red'}}>Wrong login or password</p>)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color='success'
                sx={{ mt: 3, mb: 2}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" underline='none' sx={{color:'green'}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
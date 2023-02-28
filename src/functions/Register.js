import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_URL } from '../service/AuthenticationService';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const theme = createTheme();

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "all"
      });
    const navigate = useNavigate();
    const [usernameExists, setUsernameExists] = React.useState(false)

    React.useEffect(() => {
        
    }, [usernameExists])
    function handleClick() {
        navigate("/login");
      }
    

  const onSubmit = (data) => {
    
    fetch(API_URL + "/register", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then((result)=>{
      if (result.status === 400) {
        let userBool = usernameExists
        setUsernameExists(true)
      } else if (result.status === 200) {
        navigate("/login")
      }
     
      
    })
    .catch(()=>{
      
    })
    
  };

  
  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register('firstName', { required: "First name is required", minLength: {
                    value: 2,
                    message: 'First name  length should be less than 2 symbols'
                  }, maxLength: {
                    value: 50,
                    message: 'First name length should be more than 50 symbols'
                  }, pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'First name should contain only english alphabet'
                  }  })}
                  error={errors?.firstName ? true: false}
                  helperText={errors?.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register('lastName', { required: "Last Name is required", minLength: {
                    value: 2,
                    message: 'Last Name  length should be less than 2 symbols'
                  }, maxLength: {
                    value: 50,
                    message: 'Last Name length should be more than 50 symbols'
                  }, pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Last Name should contain only english alphabet'
                  }  })}
                  error={errors?.lastName ? true: false}
                  helperText={errors?.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  name="middleName"
                  autoComplete="middleName"
                  {...register('middleName', { minLength: {
                    value: 2,
                    message: 'Middle Name  length should be less than 2 symbols'
                  }, maxLength: {
                    value: 50,
                    message: 'Middle Namelength should be more than 50 symbols'
                  }, pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Middle Name should contain only english alphabet'
                  }  })}
                  error={errors?.middleName ? true: false}
                  helperText={errors?.middleName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                
                  autoComplete="username"
                  {...register('username', { required: "Username is required", minLength: {
                    value: 8,
                    message: 'Username length should be less than 8 symbols'
                  }, maxLength: {
                    value: 20,
                    message: 'Username length should be more than 20 symbols'
                  }, validate: {
                    noWhiteSpace: v=> !v.trim().includes(' ') || 'Username should not contain whitespace'
                  }  })}
                  error={errors?.username ? true: false}
                  helperText={errors?.username?.message || (usernameExists && <Typography sx={{fontSize:13, p:0, m:0}} class="Mui-error" color="#d32f2f">Username already exists</Typography>)}
                   
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  
                  autoComplete="new-password"
                  {...register('password', { required: "Password is required", minLength: {
                    value: 8,
                    message: 'Password length should be less than 8 symbols'
                  }, maxLength: {
                    value: 70,
                    message: 'Password length should be more than 20 symbols'
                  }, validate: {
                    noWhiteSpace: v=> !v.trim().includes(' ') || 'Password should not contain whitespace'
                  }  })}
                  error={errors?.password ? true: false}
                  helperText={errors?.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  {...register('confirmPassword', { required: "Confirm password is required", validate: {
                    messages: (val) => {
                        if (watch('password') != val) {
                            return 'Your passwords do not match'
                        }
                    }
                  }  })}
                  error={errors?.confirmPassword ? true: false}
                  helperText={errors?.confirmPassword?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" onClick={handleClick} underline="none"  sx={{color:'green'}} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
      </Container>
    </ThemeProvider>
  );
}
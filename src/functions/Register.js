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
            Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="Имя"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                  {...register('firstName', { required: "Это поле обязательно", minLength: {
                    value: 2,
                    message: 'Не менее 2х символов'
                  }, maxLength: {
                    value: 50,
                    message: 'Не более 50 символов'
                  }, pattern: {
                    value: /^[a-zA-Zа-яА-Я]+$/,
                    message: 'Только символы английского или русского алфавита'
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
                  label="Фамилия"
                  name="lastName"
                  autoComplete="Фамилия"
                  {...register('lastName', { required: "Это поле обязательно", minLength: {
                    value: 2,
                    message: 'Не менее 2х символов'
                  }, maxLength: {
                    value: 50,
                    message: 'Не более 50 символов'
                  }, pattern: {
                    value: /^[a-zA-Zа-яА-Я]+$/,
                    message: 'Только символы английского или русского алфавита'
                  }  })}
                  error={errors?.lastName ? true: false}
                  helperText={errors?.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="middleName"
                  label="Отчество"
                  name="middleName"
                  autoComplete="Отчество"
                  {...register('middleName', { minLength: {
                    value: 2,
                    message: 'Не менее 2х символов'
                  }, maxLength: {
                    value: 50,
                    message: 'Не более 50 символов'
                  }, pattern: {
                    value: /^[a-zA-Zа-яА-Я]+$/,
                    message: 'Только символы английского или русского алфавита'
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
                  label="Логин"
                  name="username"
                
                  autoComplete="Логин"
                  {...register('username', { required: "Это поле обязательно", minLength: {
                    value: 8,
                    message: 'Не менее 8 символов'
                  }, maxLength: {
                    value: 20,
                    message: 'Не более 20 символов'
                  }, validate: {
                    noWhiteSpace: v=> !v.trim().includes(' ') || 'Логин не должен содержать пробелов'
                  }  })}
                  error={errors?.username ? true: false}
                  helperText={errors?.username?.message || (usernameExists && <Typography sx={{fontSize:13, p:0, m:0}} class="Mui-error" color="#d32f2f">Такой логин уже существует</Typography>)}
                   
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  
                  autoComplete="Пароль"
                  {...register('password', { required: "Это поле обязательно", minLength: {
                    value: 8,
                    message: 'Не менее 8 символов'
                  }, maxLength: {
                    value: 70,
                    message: 'Не более 70 символов'
                  }, validate: {
                    noWhiteSpace: v=> !v.trim().includes(' ') || 'Пароль не должен содержать пробелов'
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
                  label="Подтверждение пароля"
                  type="password"
                  id="confirmPassword"
                  autoComplete="Подтверждение пароля"
                  {...register('confirmPassword', { required: "Подтверждение пароля обязательно", validate: {
                    messages: (val) => {
                        if (watch('password') != val) {
                            return 'Пароли не совпадают'
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
              Зарегистрироваться
            </Button>
            
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" onClick={handleClick} underline="none"  sx={{color:'green'}} >
                  Уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
      </Container>
    </ThemeProvider>
  );
}
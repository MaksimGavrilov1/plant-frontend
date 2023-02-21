// import React, { Component } from 'react'
// import AuthenticationService from '../service/AuthenticationService';
// import { Navigate } from 'react-router-dom';
// import { Link } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Paper from '@mui/material/Paper';

// const theme = createTheme();


// function LoginComponent() {

//   // constructor(props) {
//   //     super(props)

//   //     this.state = {
//   //         username: '',
//   //         password: '',
//   //         hasLoginFailed: false,
//   //         showSuccessMessage: false,
//   //         moveToRegister: false
//   //     }

//   //     this.handleChange = this.handleChange.bind(this)
//   //     this.loginClicked = this.loginClicked.bind(this)
//   //     this.signUpClicked = this.signUpClicked.bind(this)
//   // }




//   // handleChange(event) {
//   //     this.setState(
//   //         {
//   //             [event.target.name]
//   //                 : event.target.value
//   //         }
//   //     )
//   // }

//   // signUpClicked() {
//   //     this.setState({moveToRegister:true})
//   // }

//   // loginClicked() {
//   //     AuthenticationService
//   //     .executeBasicAuthenticationService(this.state.username, this.state.password)
//   //     .then(() => {
//   //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
//   //         this.setState({showSuccessMessage:true})
//   //         this.setState({hasLoginFailed:false})
//   //     }).catch(() => {
//   //         this.setState({ showSuccessMessage: false })
//   //         this.setState({ hasLoginFailed: true })
//   //     })

//   //     // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
//   //     //     .then(response => {
//   //     //         if (response.status == 200) {
//   //     //             AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
//   //     //             this.props.history.push('/data')
//   //     //             // this.setState({showSuccessMessage:true})
//   //     //             // this.setState({hasLoginFailed:false})
//   //     //         } else {
//   //     //             this.setState({showSuccessMessage:false})
//   //     //             this.setState({hasLoginFailed:true})
//   //     //         }
//   //     //     })
//   // }


//   return (
//     <div>
//       <ThemeProvider theme={theme}>
//         <Grid container component="main" sx={{ height: '100vh' }}>
//           <CssBaseline />
//           <Grid
//             item
//             xs={false}
//             sm={4}
//             md={7}
//             sx={{
//               backgroundImage: 'url(https://source.unsplash.com/random)',
//               backgroundRepeat: 'no-repeat',
//               backgroundColor: (t) =>
//                 t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           />
//           <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//             <Box
//               sx={{
//                 my: 8,
//                 mx: 4,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//               }}
//             >
//               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                 <LockOutlinedIcon />
//               </Avatar>
//               <Typography component="h1" variant="h5">
//                 Sign in
//               </Typography>
//               <Box component="form" noValidate onSubmit={this.loginClicked} sx={{ mt: 1 }}>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="username"
//                   label="Username"
//                   name="username"
//                   autoComplete="username"
//                   autoFocus
//                   value={this.state.username}
//                   onChange={this.handleChange}
//                 />
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="current-password"
//                   value={this.state.password}
//                   onChange={this.handleChange}
//                   helperText={(this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>)}
//                 // (this.state.showSuccessMessage && <Navigate to="/data" />) ||
//                 />
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                   Sign In
//                 </Button>
//                 <Grid container>
//                   <Grid item>
//                     <Link href="/register" variant="body2"  >
//                       {"Don't have an account? Sign Up"}
//                     </Link>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </ThemeProvider>
//       <div className="container">
//         {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
//         {this.state.showSuccessMessage && <Navigate to="/data" />}
//         {this.state.moveToRegister && <Navigate to="/register" />}
//         User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
//         Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
//         <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
//       </div>
//       <div>
//         <Link
//           component="button"
//           variant="body2"
//           onClick={this.signUpClicked}
//         >
//           Don't have an account? Sign Up!
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default function LoginComponent()
import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import { Navigate } from 'react-router-dom';
import { Link } from '@mui/material';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            moveToRegister: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.signUpClicked = this.signUpClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    signUpClicked() {
        this.setState({moveToRegister:true})
    }

    loginClicked() {
        AuthenticationService
        .executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(() => {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.setState({showSuccessMessage:true})
            this.setState({hasLoginFailed:false})
            alert(sessionStorage.getItem("authenticatedUser"))
        }).catch(() => {
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
        })

        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(response => {
        //         if (response.status == 200) {
        //             AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //             this.props.history.push('/data')
        //             // this.setState({showSuccessMessage:true})
        //             // this.setState({hasLoginFailed:false})
        //         } else {
        //             this.setState({showSuccessMessage:false})
        //             this.setState({hasLoginFailed:true})
        //         }
        //     })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <Navigate to="/data" />}
                    {this.state.moveToRegister && <Navigate to="/register"/>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
                <div>
                    <Link 
                     component="button"
                     variant="body2"
                     onClick={this.signUpClicked}
                   >
                     Don't have an account? Sign Up!
                    </Link>
                </div>
            </div>
        )
    }
}

export default LoginComponent
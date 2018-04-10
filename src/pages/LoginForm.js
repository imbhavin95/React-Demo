import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from './../validators/TextValidator';
import logo from './../logo.svg';
import Header from './../include/header.js';

class LoginForm extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        fetch('http://localhost/beta-admin/api/web/v1/member/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'email=' + this.state.email + '&password=' + this.state.password
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if(json.status === 'success'){
                alert(json.message);
                ReactDOM.render(
                    <div />,
                    document.getElementById('root')
                );
            }else{
                alert(json.message);
            }
            //console.log('parsed json', json)
        }).catch(function(ex) {
            //console.log('parsing failed', ex)
        })
        alert('A name was submitted: ' + this.state.email);
        alert('A name was submitted: ' + this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="login-container">
                            <img src={logo} className="App-logo" alt="logo" />
                            <TextValidator
                                onChange={this.handleChange}
                                name="email"
                                validators={['required', 'isEmail']}
                                errorMessages={['This field is required', 'Email is not valid']}
                                hintText="Email Address"
                            />
                            <TextField hintText="Password" type="password" fullWidth={true} value={this.state.password} onChange={this.handlePasswordChange} />
                            <RaisedButton label="Login" type="submit" primary={true} fullWidth={true} />
                        </div>
                    </ValidatorForm>
                </div>
            </MuiThemeProvider>
        );
    }*/

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                email: '',
                password: '',
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit(event) {
        fetch('http://localhost/beta-admin/api/web/v1/member/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'email=' + this.state.formData.email + '&password=' + this.state.formData.password
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if(json.status === 'success'){
                alert(json.message);
                ReactDOM.render(
                    <div />,
                    document.getElementById('root')
                );
            }else{
                alert(json.message);
            }
            //console.log('parsed json', json)
        }).catch(function(ex) {
            //console.log('parsing failed', ex)
        })
        alert('A name was submitted: ' + this.state.formData.email);
        alert('A name was submitted: ' + this.state.formData.password);
        event.preventDefault();
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="login-container">
                            <img src={logo} className="App-logo" alt="logo" />
                                <TextValidator
                                    hintText="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={formData.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['This field is required', 'Email is not valid']}
                                    fullWidth={true}
                                />
                                <TextValidator
                                    hintText="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    value={formData.password}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    fullWidth={true}
                                    type="password"
                                />
                                <br />
                                <RaisedButton
                                    type="submit"
                                    label={
                                        (submitted && 'Your form is submitted!')
                                        || (!submitted && 'Submit')
                                    }
                                    disabled={submitted}
                                    primary={true} fullWidth={true}
                                />
                        </div>
                    </ValidatorForm>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default LoginForm;
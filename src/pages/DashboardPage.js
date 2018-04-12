import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import logo from './../logo.svg';
import Header from './../include/header.js';
import { Redirect, BrowserRouter } from 'react-router-dom';


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                terms: '',
            },
            submitted: false,
        };
        this.router = undefined;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleChangeCheckbox(event) {
        alert();
        const { formData } = this.state;
        formData[event.target.name] = 'true';
        this.setState({ formData });
    }

    handleSubmit(event) {
        fetch('http://localhost/beta-admin/api/web/v1/member/registration', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'firstname=' + this.state.formData.firstname + '&lastname=' + this.state.formData.lastname + '&email=' + this.state.formData.email + '&password=' + this.state.formData.password
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if(json.status === 'success'){
                console.log(json.status);
                ReactDOM.render(
                    <BrowserRouter>
                        <Redirect to='/dashboard' />
                    </BrowserRouter>,
                    document.getElementById('root')
                );
            }else{
                alert(json.message);
            }
            //console.log('parsed json', json)
        }).catch(function(ex) {
            //console.log('parsing failed', ex)
        })
        event.preventDefault();
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    render() {
        const { submitted } = this.state;
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
                            Dashboard Page
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

export default DashboardPage;
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from './../validators/TextValidator';
import CheckboxValidator from './../validators/CheckboxValidator';
import logo from './../logo.svg';
import Header from './../include/header.js';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

class RegistrationForm extends React.Component {
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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        ValidatorForm.addValidationRule('isTruthy', value => value);
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
                                hintText="First Name"
                                onChange={this.handleChange}
                                name="firstname"
                                value={formData.firstname}
                                validators={['required']}
                                errorMessages={['This field is required']}
                                fullWidth={true}
                            />
                            <TextValidator
                                hintText="Last Name"
                                onChange={this.handleChange}
                                name="lastname"
                                value={formData.lastname}
                                validators={['required']}
                                errorMessages={['This field is required']}
                                fullWidth={true}
                            />
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
                            <CheckboxValidator
                                onChange={this.handleChangeCheckbox}
                                value={formData.terms}
                                name="terms"
                                className="check-custom"
                                //validators={['required']}
                                label="Please accept Terms & Condition"
                                style={styles.checkbox}
                                errorMessages={['This field is required']}
                            />
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

export default RegistrationForm;
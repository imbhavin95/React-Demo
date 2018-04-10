import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import TextField from 'material-ui/TextField';

class TextValidator extends ValidatorComponent {
    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;

        return (
            <div>
                <TextField
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                {this.errorText()}
            </div>
        );
    }

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div className="form-error" style={{ color: 'red' }}>
                {this.getErrorMessage()}
            </div>
        );
    }
}

export default TextValidator;

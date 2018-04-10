import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import Checkbox from 'material-ui/Checkbox';

class CheckboxValidator extends ValidatorComponent {
    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;

        return (
            <div>
                <Checkbox
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

export default CheckboxValidator;

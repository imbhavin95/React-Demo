import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


class Header extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title={<span>React DONE</span>}
                        iconElementRight={<div className="nav-main"><FlatButton href="/login" className="link-menu" label="Login" /><FlatButton href="/registration" className="link-menu" label="Registration" /></div>}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Header;
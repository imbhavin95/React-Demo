import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './include/header.js';
import LoginForm from './pages/LoginForm.js';
import RegistrationForm from "./pages/RegistrationForm";
import DashboardPage from "./pages/DashboardPage";

const Home = () => (
    <div>
        <Header />
        <h2>App</h2>
    </div>
);

const Login = () => (
    <LoginForm />
);

const Registration = () => (
    <RegistrationForm />
);

const Dashboard = () => (
    <DashboardPage />
);

const Contact = () => (
    <h2>Contact</h2>
);

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/contact" component={Contact} />
        </div>
    </BrowserRouter>
    ,
    document.getElementById('root')
);

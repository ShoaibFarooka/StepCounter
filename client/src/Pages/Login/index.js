import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { message } from "antd";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import userService from "../../services/userService";
import { Link } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle Input
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setUser({ ...user, [name]: value });
    };

    // Handle Login
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = user;
        if (!email || !password) {
            message.error('Please enter valid data!');
            return;
        }
        try {
            const response = await userService.loginUser(user);
    
            if (response.token) {
                Cookies.set('fixit-jwt-token', response.token, {
                    secure: true,
                    sameSite: 'Lax'
                });
                message.success('Login Successful');
                const from = location.state?.from?.pathname || '/';

                if (email.includes('admin@admin.com')) {
                    navigate('/admin');
                } else {
                    navigate(from);
                }
            } else {
                message.error('Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data);
            } else {
                message.error('Invalid details');
            }
        }
    };
    


    const togglePasswordView = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    {/* Logo */}
                    <Link className="navbar-brand" to="/">
                        <img src="logo.png" alt="Logo" />
                    </Link>

                    {/* Centered Text */}
                    <span className="navbar-text mx-auto fs-4">
                        Step Challenge
                    </span>

                </div>
            </nav>
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                        <h1 className="display-4 fw-bolder">Welcome Back</h1>
                        <p className="lead text-center">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink
                            to="/register"
                            className="btn btn-outline-light rounded-pill pb-2 w-50"
                        >
                            Register
                        </NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your details with anyone else.
                                </div>
                            </div>
                            <div>
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <div className="input-group mb-3">
                                    <br />
                                    <input
                                        type={`${showPassword ? 'text' : 'password'}`}
                                        className="input form-control"
                                        id="exampleInputPassword1"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text" onClick={togglePasswordView}>
                                            {!showPassword ? <TbEye size={25} /> : <TbEyeOff size={25} />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-4 rounded-pill"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

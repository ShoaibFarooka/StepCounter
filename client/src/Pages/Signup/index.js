import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import userService from "../../services/userService";
import { validatePassword, isValidEmail } from '../../utils/validationUtils';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        specialChar: false,
        uppercase: false,
        lowercase: false,
        digit: false,
    });

    // Handle Inputs
    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUser({ ...user, [name]: value });
    }

    // const handleRoleChange = (value) => {
    //     setUser({ ...user, role: value });
    // };


    //handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        const validationErrors = validateForm(user);
        console.log('Errors: ', validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            try {
                console.log("Request data:", user);
                const response = await userService.registerUser(user);
                console.log("Response data:", response.data);
                message.success(response)
                navigate("/login");
            } catch (error) {
                if (error.response && error.response.data) {
                    message.error(error.response.data);
                    console.error("Error response:", error.response.data);
                } 
            }
        } else {
            setErrors(validationErrors);
        }
    }


    const validateForm = (userData) => {
        const errors = {};

        if(!userData.name){
            errors.name = 'Name is required';
        }

        if (!userData.email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(userData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!userData.password) {
            errors.password = 'Password is required';
        } else {
            const validationResults = validatePassword(userData.password);
            setPasswordValidation(validationResults);
            if (!validationResults.length) {
                errors.password = 'Password must meet all criteria';
            }
            else if (!validationResults.digit) {
                errors.password = 'Password must meet all criteria';
            }
            else if (!validationResults.uppercase) {
                errors.password = 'Password must meet all criteria';
            }
            else if (!validationResults.lowercase) {
                errors.password = 'Password must meet all criteria';
            }
            else if (!validationResults.specialChar) {
                errors.password = 'Password must meet all criteria';
            }
        }

        if (!userData.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
            message.error('Password does not match');
        }

        return errors;
    };

    const renderValidationStatus = (isValid) => {
        return isValid ? (
            <i className="fa fa-check text-success"></i>
        ) : (
            <i className="fa fa-times text-danger"></i>
        );
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
                <div className="row justify-content-end">
                    <div className="col-md-5 d-flex flex-column align-items-center form text-white justify-content-center order-2">
                        <h1 className="display-4 fw-bolder">Hello</h1>
                        <p className="lead text-center">Enter Your Details To Register</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">
                            Login
                        </NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <form onSubmit={handleSubmit} method="POST">

                        <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInput}
                                />
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>


                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <div className="password-input">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="password"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                    {errors.password && (
                                        <div className="text-danger">{errors.password}</div>
                                    )}
                                </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword2" className="form-label">
                                            Confirm Password
                                        </label>
                                        <div className="password-input">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword2"
                                                name="confirmPassword"
                                                value={user.confirmPassword}
                                                onChange={handleInput}
                                            />
                                            {errors.confirmPassword && (
                                                <div className="text-danger">{errors.confirmPassword}</div>
                                            )}

                                            <div>
                                                Length {renderValidationStatus(passwordValidation.length)} <br />
                                                Special Character {renderValidationStatus(passwordValidation.specialChar)} <br />
                                                Uppercase {renderValidationStatus(passwordValidation.uppercase)} <br />
                                                Lowercase {renderValidationStatus(passwordValidation.lowercase)} <br />
                                                Digit {renderValidationStatus(passwordValidation.digit)}
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
                                        Register
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

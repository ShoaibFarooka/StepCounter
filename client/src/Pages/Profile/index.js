import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import userService from '../../services/userService';
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { message } from 'antd';

const Profile = () => {
    const [stepsCount, setStepsCount] = useState('');
    const navigate = useNavigate();

    const [allowInput, setAllowInput] = useState(false);

    useEffect(() => {
        shouldAllowInput();
    }, []);

    const shouldAllowInput = async () => {
        try {
            const response = await userService.allowInputHandle();
            console.log(response);
            if (response.allow) {
                setAllowInput(true);
            }
            else {
                setAllowInput(false);
            }
        } catch (error) {
            console.error('Internal server error:', error);
        }
    };


    const handleChangeStepsCount = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            setStepsCount(e.target.value);
        }
    }


    // Logout function
    const handleLogout = () => {
        Cookies.remove('fixit-jwt-token');
        navigate('/');

    }
    //back button
    const handleBackPage = () => {
        navigate('/');
    }

    // Function to handle submitting steps count to MongoDB
    const handleSubmitSteps = async () => {
        if (!stepsCount.trim()) {
            message.error('Please enter the steps count.');
            return;
        }
        if (isNaN(stepsCount)) {
            message.error('Please enter a valid number for the steps count.');
            return;
        }
        try {
            const response = await userService.stepCount({ stepsCount: Number(stepsCount) });
            message.success('Steps count submitted successfully');
            shouldAllowInput();
        } catch (error) {
            console.error('Error submitting steps count to MongoDB:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">

                    <Link className="navbar-brand" to="/">
                        <img src="logo.png" alt="Logo" />
                    </Link>

                    <span className="navbar-text mx-auto fs-4">
                        Step Challenge
                    </span>
                </div>
            </nav>
            <br />
            <div className="container mt-3">
                <div className="text-right mt-3">
                    <button type="button" className="btn bg-black text-white px-5" onClick={handleBackPage}>Back</button>
                </div>
                <div className="text-center">
                    <h1>Profile</h1>
                </div>
                <div className="mb-3">
                    <label htmlFor="stepsCount" className="form-label">How many steps have you walked today? </label>
                    <input
                        type="text"
                        disabled={!allowInput}
                        placeholder={allowInput ? 'Enter steps count' : 'You have already submitted steps for today'}
                        className="form-control"
                        id="stepsCount"
                        value={stepsCount}
                        onChange={handleChangeStepsCount}
                    />
                </div>
                {/* Button to submit steps count */}
                {allowInput &&
                    <button type="button" className="btn btn-primary" onClick={handleSubmitSteps}>Submit Steps</button>
                }
                {/* Logout Button */}
                <div className="text-right mt-3">
                    <button type="button" className="btn bg-black text-white px-5" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../../utils/authUtils";
import { useNavigate, Link } from "react-router-dom";
import userService from "../../services/userService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Leaderboard = ({ rerender, setRerender }) => {
    const auth = isAuthenticated();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); // Declare and initialize users state variable
    const [currentUserID, setCurrentUserID] = useState(null);
    const [userRole, setUserRole] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await userService.getUsers();
            console.log(response.users);
            setUsers(response.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('fixit-jwt-token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUserID(decodedToken?.id);
            setUserRole(decodedToken?.role);
        }

        fetchUsers();
    }, []);

    useEffect(() => {
        if (rerender) {
            fetchUsers();
            setRerender(false);
        }
    }, [rerender]);

    const handleLogout = () => {
        Cookies.remove('fixit-jwt-token');
        navigate('/');
        setCurrentUserID(null);
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <>
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
            <div className="mx-5 mt-2 text-end">
                {auth ? (
                    <>
                        {userRole === 'admin' && (
                            <h1 className="text-center">Admin Dashboard</h1>
                        )}
                        {userRole === 'admin' ? (
                            <button type="button" className="btn bg-black text-white px-5 mt-1" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <button type="button" className="btn bg-black text-white px-5 mt-1" onClick={handleProfile}>Profile</button><br />
                                <button type="button" className="btn bg-black text-white px-5 mt-1" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn bg-black text-white px-5 mt-1">Login</Link><br />
                        <Link to="/register" className="btn bg-black text-white px-5 mt-1">Signup</Link>
                    </>
                )}

                <div className="container mt-4 text-center">
                    <h2 className="mb-3">Leaderboard</h2>
                    <ul className="list-group mx-auto" style={{ maxWidth: '600px' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ranking</th>
                                    <th>Name</th>
                                    <th>Steps</th>
                                </tr>
                            </thead>
                            <tbody >
                                {users
                                    .filter(user => user.role !== 'admin') // remove admin from leaderboard
                                    .map((user, index) => (
                                        <tr key={user.id} className={currentUserID && user._id === currentUserID ? 'highlight' : ''}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.stepCount}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <br />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Leaderboard;

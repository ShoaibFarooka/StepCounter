import React, { useState } from 'react';
import Leaderboard from '../Leaderboard';
import { Button, Table } from 'react-bootstrap';
import userService from '../../services/userService';
import { message } from 'antd';

const Admin = () => {
    const [rerender, setRerender] = useState(false);

    const resetSteps = async () => {
        try {
            const response = await userService.resetSteps();
            message.success("Steps reset successfully");
            setRerender(true);
        } catch (error) {
            console.error('Error resetting steps:', error);
        }
    };

    return (
        <div>
            <Leaderboard rerender={rerender} setRerender={setRerender} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="danger" onClick={resetSteps}>
                    Reset Steps
                </Button>
            </div>
        </div>
    );
};

export default Admin;
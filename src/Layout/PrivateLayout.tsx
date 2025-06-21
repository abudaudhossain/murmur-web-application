import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import LeftBar from '../components/LeftBar';
import RightBar from '../components/RightBar';
import { useStore } from '../context/StoreContext';
import { useEffect } from 'react';

export default function PrivateLayout() {

    const navigate = useNavigate();
    const { user } = useStore()
    console.log(user)
    useEffect(() => {
        if (!user) {

            navigate('/login');
        }
    }, [])

    return (
        <>
            <Navbar />
            <Box display="flex" flexDirection="row">
                <LeftBar />
                <Box component="main" sx={{ flex: 2, p: 2 }}>
                    <Outlet />
                </Box>
                <RightBar />
            </Box>
            <footer style={{ textAlign: 'center', marginTop: 20 }}>
                <p>Powered by Abu daud © 2025</p>
            </footer>
        </>
    );
}

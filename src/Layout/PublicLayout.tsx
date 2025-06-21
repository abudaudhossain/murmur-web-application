import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useStore } from '../context/StoreContext';
import { useEffect } from 'react';

export default function PublicLayout() {
    const navigate = useNavigate();
    const { user } = useStore()
    console.log(user)
    useEffect(() => {
        if (user) {

            navigate('/');
        }
    }, [])
    return (
        <Container maxWidth="sm" sx={{ pt: 8 }}>
            <Outlet />
        </Container>
    );
}

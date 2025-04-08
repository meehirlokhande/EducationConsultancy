// import React from 'react'
import AdminPage from './admin/AdminPage';
import User from './user/User';

const Home = () => {
    const role = localStorage.getItem('role');
    return (
        <>
            {
                role === 'ADMIN' ? (<AdminPage />) : <User />
            }
        </>
    )
}

export default Home
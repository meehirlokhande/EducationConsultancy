import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        if (!formData.email.trim()) {
            newErrors.email = 'Please enter your email';
            isValid = false;
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Please enter your password';
            isValid = false;
        }

        setFieldErrors(newErrors);
        return isValid;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/edu-con/login', formData);
            console.log('Sign-in successful:', response.data);

            const role = response.data.role.split('_')[1];
            localStorage.setItem('token', 'temp');
            localStorage.setItem('role', role);
            localStorage.setItem('userEmail', formData.email);

            navigate('/home');
        } catch (error) {
            console.error('There was an error signing in:', error);
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
        // Clear error when user starts typing
        if (fieldErrors[id]) {
            setFieldErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Welcome</h1>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} transition duration-300`}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {fieldErrors.email && (
                            <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} transition duration-300`}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {fieldErrors.password && (
                            <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
                        )}
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <button
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <a href="#forgot-password" className="text-sm text-blue-600 hover:text-blue-500 transition duration-300">
                        Forgot Password?
                    </a>
                </div>
                <div className="mt-4 text-center text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-600 hover:text-blue-500 transition duration-300">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
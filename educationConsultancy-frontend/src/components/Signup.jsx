import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        category: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        username: '',
        email: '',
        category: '',
        password: ''
    });
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            username: '',
            email: '',
            category: '',
            password: ''
        };

        if (!formData.username.trim()) {
            newErrors.username = 'Please enter your username';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Please enter your email';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }
        if (!formData.category) {
            newErrors.category = 'Please select your role';
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = 'Please enter your password';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setFieldErrors(newErrors);
        return isValid;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:9090/educon/edu-con/signup', formData);
            console.log('Signup successful:', response.data);
            navigate('/');
        } catch (error) {
            console.error('There was an error signing up:', error);
            setError(error.response?.data?.message || 'Failed to sign up. Please try again.');
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
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Create Your Account</h1>
                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border ${fieldErrors.username ? 'border-red-500' : 'border-gray-300'} transition duration-300`}
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {fieldErrors.username && (
                            <p className="mt-1 text-sm text-red-500">{fieldErrors.username}</p>
                        )}
                    </div>

                    {/* Email */}
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

                    {/* Category */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
                            Role
                        </label>
                        <select
                            className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border ${fieldErrors.category ? 'border-red-500' : 'border-gray-300'} transition duration-300`}
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="parent">Parent</option>
                            <option value="student">Student</option>
                        </select>
                        {fieldErrors.category && (
                            <p className="mt-1 text-sm text-red-500">{fieldErrors.category}</p>
                        )}
                    </div>

                    {/* Password */}
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

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
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
                            'Sign Up'
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-600 hover:text-blue-500 transition duration-300">
                        Log In
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
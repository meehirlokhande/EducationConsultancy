import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const [isStudentsDropdownOpen, setStudentsDropdownOpen] = useState(false);
    const [isCoursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
    const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleStudentsDropdown = () => {
        setStudentsDropdownOpen(!isStudentsDropdownOpen);
    };

    const toggleCoursesDropdown = () => {
        setCoursesDropdownOpen(!isCoursesDropdownOpen);
    };

    const toggleSettingsDropdown = () => {
        setSettingsDropdownOpen(!isSettingsDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-blue-800 p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        EduConsult 
                    </div>
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <a href="/home" className="text-white hover:text-blue-200 transition duration-300 font-medium">
                                Dashboard
                            </a>
                        </li>

                        {/* Students Dropdown */}
                        <li className="relative">
                            <button
                                onClick={toggleStudentsDropdown}
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-300"
                                type="button"
                            >
                                Students
                                <svg
                                    className="w-2.5 h-2.5 ml-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {isStudentsDropdownOpen && (
                                <div className="absolute z-10 bg-white text-gray-800 rounded-lg shadow-xl w-44 mt-2 border border-gray-200">
                                    <ul className="py-2">
                                        <li>
                                            <a href="/studentslist" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
                                                Students List
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            )}
                        </li>

                        {/* Courses Dropdown */}
                        <li className="relative">
                            <button
                                onClick={toggleCoursesDropdown}
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-300"
                                type="button"
                            >
                                Courses
                                <svg
                                    className="w-2.5 h-2.5 ml-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {isCoursesDropdownOpen && (
                                <div className="absolute z-10 bg-white text-gray-800 rounded-lg shadow-xl w-44 mt-2 border border-gray-200">
                                    <ul className="py-2">
                                        <li>
                                            <a href="/all-courses" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
                                                View Courses
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/add-courses" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
                                                Add Course
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/update-courses" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
                                                Update Course
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            )}
                        </li>

                        <li>
                            <a href="/activeSubscriptions" className="text-white hover:text-blue-200 transition duration-300 font-medium">
                                Subscriptions
                            </a>
                        </li>
                        <li>
                            <a href="/adminPaymentHistory" className="text-white hover:text-blue-200 transition duration-300 font-medium">
                                Payments
                            </a>
                        </li>

                        {/* Settings Dropdown */}
                        <li className="relative">
                            <button
                                onClick={toggleSettingsDropdown}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-300"
                                type="button"
                            >
                                Settings
                                <svg
                                    className="w-2.5 h-2.5 ml-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {isSettingsDropdownOpen && (
                                <div className="absolute right-0 z-10 bg-white text-gray-800 rounded-lg shadow-xl w-44 mt-2 border border-gray-200">
                                    <ul className="py-2">
                                        <li>
                                            <a href="#profile" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition duration-200"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
           
            <div className="relative  text-white py-20 md:py-32">
                <div className="absolute inset-0">
                    <img
                        src="https://cdn.pixabay.com/photo/2016/11/08/05/10/students-1807505_1280.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-100"
                    />
                    <div className="absolute inset-0  opacity-30"></div>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Admin Dashboard</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        Manage students, courses, and payments with EduConsultancy powerful administration tools
                    </p>
                    <button
                        className="bg-white text-blue-800 hover:bg-blue-100 font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                        onClick={() => navigate('/studentslist')}
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Students Card */}
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1"
                        onClick={() => navigate('/studentslist')}
                    >
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-blue-800">Students Management</h2>
                        </div>
                        <p className="text-gray-600">Manage student records, enrollments, and academic progress.</p>
                    </div>

                    {/* Courses Card */}
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1"
                        onClick={() => navigate('/all-courses')}
                    >
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-blue-800">Courses Management</h2>
                        </div>
                        <p className="text-gray-600">Create, update, and manage all course content and materials.</p>
                    </div>

                    {/* Payments Card */}
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1"
                        onClick={() => navigate('/adminPaymentHistory')}
                    >
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-blue-800">Payments Management</h2>
                        </div>
                        <p className="text-gray-600">Track and manage all payment transactions and subscriptions.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">EduConsult Admin</h3>
                            <p className="text-gray-400">
                                Comprehensive administration tools for managing your education platform.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#dashboard" className="text-gray-400 hover:text-white transition duration-200">Dashboard</a></li>
                                <li><a href="/studentslist" className="text-gray-400 hover:text-white transition duration-200">Students</a></li>
                                <li><a href="/all-courses" className="text-gray-400 hover:text-white transition duration-200">Courses</a></li>
                                <li><a href="/adminPaymentHistory" className="text-gray-400 hover:text-white transition duration-200">Payments</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="hover:text-white transition duration-200 cursor-pointer">Help Center</li>
                                <li className="hover:text-white transition duration-200 cursor-pointer">Documentation</li>
                                <li className="hover:text-white transition duration-200 cursor-pointer">System Status</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>admin@educonsult.com</li>
                                <li>+1 (555) 123-4567</li>
                                <li>Office Hours: 9AM - 5PM</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>© {new Date().getFullYear()} EduConsult Admin Portal. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdminPage;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const [isCoursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const [isStudentDropdownOpen, setStudentDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfStudent = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                if (!userEmail) {
                    alert('User email not found. Please log in again.');
                    navigate('/');
                    return;
                }

                const response = await axios.get('/edu-con/students/all');
                const students = response.data;
                const student = students.find((student) => student.email === userEmail);

                if (student) {
                    localStorage.setItem('studentId', student.registrationNumber);
                } else {
                    console.log('User is not registered as a student.');
                }
            } catch (error) {
                console.error('Error fetching students:', error);
                alert('Failed to check student registration. Please try again.');
            }
        };

        checkIfStudent();
    }, [navigate]);

    const toggleCoursesDropdown = () => {
        setCoursesDropdownOpen(!isCoursesDropdownOpen);
    };

    const toggleAccountDropdown = () => {
        setAccountDropdownOpen(!isAccountDropdownOpen);
    };

    const toggleStudentDropdown = () => {
        setStudentDropdownOpen(!isStudentDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('studentId');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-custom-dark  p-4 shadow-lg">
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
                                Home
                            </a>
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
                                            <a href="/studentallcourse" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
                                                Browse Courses
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            )}
                        </li>

                        <li>
                            <a href="/studentPaymentHistory" className="text-white hover:text-blue-200 transition duration-300 font-medium">
                                Payments
                            </a>
                        </li>

                        {/* Student Dropdown */}
                        <li className="relative">
                            <button
                                onClick={toggleStudentDropdown}
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
                            {isStudentDropdownOpen && (
                                <div className="absolute z-10 bg-white text-gray-800 rounded-lg shadow-xl w-44 mt-2 border border-gray-200">
                                    <ul className="py-2">
                                        <li>
                                            <a href="/studentRegistration" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
                                                Register
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/UpdateStudentDetails" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
                                                Edit Details
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>

                        {/* Account Dropdown */}
                        <li className="relative">
                            <button
                                onClick={toggleAccountDropdown}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-300"
                                type="button"
                            >
                                Account
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
                            {isAccountDropdownOpen && (
                                <div className="absolute right-0 z-10 bg-white text-gray-800 rounded-lg shadow-xl w-44 mt-2 border border-gray-200">
                                    <ul className="py-2">
                                        <li>
                                            <a href="#edit-profile" className="block px-4 py-2 hover:bg-blue-50 transition duration-200">
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
            <div className="relative text-white py-48 overflow-hidden">
               
                <div className="absolute inset-0">
                    <img
                        src="https://cdn.pixabay.com/photo/2016/11/14/03/16/book-1822474_1280.jpg"
                        alt="Students studying together"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-800 opacity-70 mix-blend-multiply"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
                        Welcome to Your Education Consult
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                        Access your courses, manage your account, and explore new learning opportunities with EduConsult.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/studentallcourse"
                            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-lg"
                        >
                            Browse Courses
                        </a>
                        <a
                            href="/studentRegistration"
                            className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition duration-300 shadow-lg"
                        >
                            Student Registration
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Quick Links Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 text-blue-800">Quick Links</h2>
                        <ul className="space-y-3">
                            <li>
                                <a href="/studentallcourse" className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Browse Courses
                                </a>
                            </li>
                            <li>
                                <a href="/studentPaymentHistory" className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Payment History
                                </a>
                            </li>
                            <li>
                                <a href="/UpdateStudentDetails" className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Update Profile
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Announcements Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 text-blue-800">Announcements</h2>
                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="font-semibold">New Courses Available</h3>
                                <p className="text-sm text-gray-600">Check out our newly added courses for the upcoming semester.</p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="font-semibold">Scholarship Deadline</h3>
                                <p className="text-sm text-gray-600">Applications for the merit-based scholarship close on June 30th.</p>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events Card */}
                    <div className="bg-white px-6 py-12 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4  text-blue-800">Upcoming Events</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="bg-blue-100 text-blue-800 rounded-lg p-2 mr-3 text-center min-w-12">
                                    <div className="font-bold">15</div>
                                    <div className="text-xs">JUN</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold">University Fair</h3>
                                    <p className="text-sm text-gray-600">10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-blue-100 text-blue-800 rounded-lg p-2 mr-3 text-center min-w-12">
                                    <div className="font-bold">22</div>
                                    <div className="text-xs">JUN</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Career Counseling</h3>
                                    <p className="text-sm text-gray-600">2:00 PM - 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-custom-dark text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">EduConsult</h3>
                            <p className="text-gray-400">
                                Your trusted partner in global education consulting and student services.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="/home" className="text-gray-400 hover:text-white transition duration-200">Home</a></li>
                                <li><a href="/studentallcourse" className="text-gray-400 hover:text-white transition duration-200">Courses</a></li>
                                <li><a href="/studentPaymentHistory" className="text-gray-400 hover:text-white transition duration-200">Payments</a></li>
                                <li><a href="/studentRegistration" className="text-gray-400 hover:text-white transition duration-200">Registration</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact Us</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    +91 0121455585
                                </li>
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    info@educonsult.com
                                </li>
                                <li className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    123 Education India
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Newsletter</h4>
                            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="px-4 py-2 w-full rounded-l-lg text-gray-800 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>© {new Date().getFullYear()} EduConsult. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default User;
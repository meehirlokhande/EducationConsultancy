import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentAllCourses() {
    const [courses, setCourses] = useState([]);
    const [isStudent, setIsStudent] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:9090/educon/edu-con/courses/all');
                setCourses(response.data);
            } catch (error) {
                console.log('Error fetching courses:', error);
            }
        };

        const checkIfStudent = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                const response = await axios.get('http://localhost:9090/educon/edu-con/students/all');
                const students = response.data; 

                // Check if the logged-in user's email exists in the list of registered students
                // const isAlreadyRegistered = students.some((student) => student.email === userEmail);    
                // setIsStudent(isAlreadyRegistered); // Set the flag based on the result
                const student = students.find((student) => student.email === userEmail);
                if (student) {
                    setIsStudent(true); // Set the flag to true if the user is a registered student
                    setStudentId(student.registrationNumber); // Store the student ID
                } else {
                    setIsStudent(false);
                }
            } catch (error) {
                console.log('Error checking student status:', error);
            }
        };

        fetchCourses();
        checkIfStudent();
    }, []);

    const handleSubscribe = async (courseId) => {
        navigate('/addsubscription', { state: { courseId, studentId } });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                
                <div className=' bg-custom-dark flex justify-between items-center p-1 py-4 mb-2 rounded-sm'>
                <h1 className="text-4xl   font-bold  text-white text-center ml-5 ">
                    All Courses
                </h1>
                    <div className=" mr-5">
                    <button
                        onClick={() => navigate('/home')} // Navigate to the homepage
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Back to Homepage
                    </button>
                </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">{course.name}</h2>
                            <p className="text-gray-700 mb-4">{course.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">₹{course.price}</span>
                                {/* <span className="text-sm text-gray-500">{course.duration} </span> */}
                                {isStudent && (
                                    <button
                                        onClick={() => handleSubscribe(course.id)} // Subscribe to the course
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                                    >
                                        Subscribe
                                    </button>
                                )}
                            </div>
                            <span className="text-base text-gray-500">{course.duration} </span> 
                                
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default StudentAllCourses;
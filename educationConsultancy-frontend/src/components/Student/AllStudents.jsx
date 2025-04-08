import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllStudents = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all registered students from the API
        const fetchStudents = async () => {
            try {
                const response = await axios.get("edu-con/students/all");
                setStudents(response.data); // Assuming the API returns an array of student objects
            } catch (err) {
                console.error("Error fetching students:", err);
                setError("Failed to fetch students. Please try again later.");
            }
        };

        fetchStudents();
    }, []);

    const handleRowClick = (registrationNumber) => {
        navigate(`/student-details/${registrationNumber}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">All Registered Students</h1>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {!error && students.length === 0 && (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                        <p className="text-gray-600 text-lg">No students found.</p>
                    </div>
                )}

                {students.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Reg No.</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Username</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Mobile</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Level</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {students.map((student, index) => (
                                        <tr
                                            key={student.registrationNumber}
                                            className={`hover:bg-blue-50 transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                            onClick={() => handleRowClick(student.registrationNumber)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.registrationNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.studentName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.mobile}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.studentLevel}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.address}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end p-4 border-t border-gray-200">
                            <button
                                onClick={() => navigate("/home")}
                                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Return to Homepage
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllStudents;
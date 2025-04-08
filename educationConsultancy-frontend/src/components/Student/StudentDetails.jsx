import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentDetails = () => {
    const { registrationNumber } = useParams();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch student details by registration number
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(
                    `edu-con/students/${registrationNumber}`
                );
                setStudent(response.data);
            } catch (err) {
                console.error("Error fetching student details:", err);
                setError("Failed to fetch student details. Please try again later.");
            }
        };

        fetchStudentDetails();
    }, [registrationNumber]);

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {student && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <img
                            src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
                            alt="Student"
                            className="w-32 h-32 rounded-full shadow-md"
                        />
                    </div>
                    {/* Student Details */}
                    <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">Student Details</h1>
                    <div className="text-gray-700 space-y-2">
                        <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
                        <p><strong>Username:</strong> {student.username}</p>
                        <p><strong>Full Name:</strong> {student.studentName}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Mobile:</strong> {student.mobile}</p>
                        <p><strong>Student Level:</strong> {student.studentLevel}</p>
                        <p><strong>Address:</strong> {student.address}</p>
                        <p><strong>Status:</strong> {student.status}</p>
                    </div>
                    {/* Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => navigate(`/adminUpdateStudentDetails?registrationNumber=${student.registrationNumber}`)}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
                        >
                            Update Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDetails;
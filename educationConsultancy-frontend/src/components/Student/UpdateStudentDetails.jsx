import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateStudentDetails = () => {
    const [formData, setFormData] = useState({
        registrationNumber: "", 
        username: "",
        studentName: "",
        email: "",
        mobile: "",
        studentLevel: "",
        address: "",
        status: "", 
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all students and extract the logged-in user's details
        const fetchStudentDetails = async () => {
            const userEmail = localStorage.getItem("userEmail"); 
            try {
                const response = await axios.get("edu-con/students/all");
                // Find the student with the same email as the logged-in user
                const student = response.data.find((s) => s.email === userEmail);
                if (student) {
                    setFormData({
                        registrationNumber: student.registrationNumber,
                        username: student.username,
                        studentName: student.studentName,
                        email: student.email,
                        mobile: student.mobile,
                        studentLevel: student.studentLevel,
                        address: student.address,
                        status: student.status, 
                    });
                } else {
                    setError("Student details not found for the logged-in user.");
                }
            } catch (err) {
                console.error("Error fetching students:", err);
                setError("Failed to fetch students. Please try again later.");
            }
        };

        fetchStudentDetails();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        
        try {
            // Submit the updated student details using the registrationNumber
            await axios.put(
                `edu-con/students/update/${formData.registrationNumber}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setMessage("Student details updated successfully!");
        } catch (err) {
            console.error("Error updating student details:", err);
            setError("Failed to update student details. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-custom-dark flex justify-between p-3 mb-3 rounded-sm items-center">
                <h1 className="text-3xl font-bold text-white ">Edit Student Details</h1>
                <div className="">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {message && <p className="text-green-500 text-center mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Registration Number</label>
                    <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Student Level</label>
                    <input
                        type="text"
                        name="studentLevel"
                        value={formData.studentLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Status</label>
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                        readOnly
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Update Details
                </button>
            </form>
            {/* Go Back Button */}
            
        </div>
    );
};

export default UpdateStudentDetails;
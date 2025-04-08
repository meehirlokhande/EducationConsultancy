import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AdminUpdateStudentDetails = () => {
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
    const location = useLocation();

    // Extract registrationNumber from query parameters
    const registrationNumber = new URLSearchParams(location.search).get("registrationNumber");

    useEffect(() => {
        // Fetch student details using the registrationNumber
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`edu-con/students/${registrationNumber}`);
                setFormData(response.data);
            } catch (err) {
                console.error("Error fetching student details:", err);
                setError("Failed to fetch student details. Please try again later.");
            }
        };

        if (registrationNumber) {
            fetchStudentDetails();
        } else {
            setError("No registration number provided. Please try again.");
        }
    }, [registrationNumber]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
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
                <h1 className="text-3xl font-bold text-white">Edit Student Details</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Go Back
                </button>
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
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
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
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 "
                        
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Update Details
                </button>
            </form>
        </div>
    );
};

export default AdminUpdateStudentDetails;
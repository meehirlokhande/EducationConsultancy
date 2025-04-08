import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        studentName: "",
        mobile: "",
        studentLevel: "",
        address: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        username: "",
        studentName: "",
        mobile: "",
        studentLevel: "",
        address: ""
    });

    useEffect(() => {
      
        const userEmail = localStorage.getItem("userEmail");
        setEmail(userEmail);

        // Fetch all registered students and check if the user is already registered
        const checkRegistrationStatus = async () => {
            try {
                const response = await axios.get("edu-con/students/all");
                const students = response.data;

               
                const isAlreadyRegistered = students.some(student => student.email === userEmail);

                if (isAlreadyRegistered) {
                    setIsRegistered(true);
                    alert("You are already registered as a student.");
                }
            } catch (err) {
                console.error("Error fetching registered students:", err);
                setError("Failed to check registration status. Please try again.");
            }
        };

        checkRegistrationStatus();
    }, []);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            username: "",
            studentName: "",
            mobile: "",
            studentLevel: "",
            address: ""
        };

        if (!formData.username.trim()) {
            newErrors.username = 'Please enter your username';
            isValid = false;
        }
        if (!formData.studentName.trim()) {
            newErrors.studentName = 'Please enter your full name';
            isValid = false;
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Please enter your mobile number';
            isValid = false;
        }
        if (!formData.studentLevel.trim()) {
            newErrors.studentLevel = 'Please enter your student level';
            isValid = false;
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Please enter your address';
            isValid = false;
        }

        setFieldErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
     
        if (fieldErrors[e.target.name]) {
            setFieldErrors(prev => ({
                ...prev,
                [e.target.name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!validateForm()) {
            return;
        }

        try {
            await axios.post("edu-con/students/add", { ...formData, email });
            setMessage("Student registered successfully!");
            setFormData({ username: "", studentName: "", mobile: "", studentLevel: "", address: "" });
        } catch (err) {
            console.error("Error registering student:", err);
            setError("Failed to register student. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200 transform transition-all duration-300 hover:shadow-xl">

                {message && <p className="mb-4 text-green-500 text-center">{message}</p>}
                {error && <p className="mb-4 text-red-500 text-center">{error}</p>}

                {isRegistered && (
                    <div className="text-center">
                        <p className="mb-4 text-red-600 font-semibold">
                            You are already registered as a student.
                        </p>

                        <button
                            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 cursor-pointer"
                            onClick={() => navigate("/home")}
                        >
                            Go Back
                        </button>
                    </div>
                )}

                {!isRegistered && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border ${fieldErrors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {fieldErrors.username && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors.username}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="studentName">
                                Full Name
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border ${fieldErrors.studentName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                id="studentName"
                                type="text"
                                placeholder="Enter your full name"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleChange}
                            />
                            {fieldErrors.studentName && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors.studentName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Email (Auto-filled)
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                type="email"
                                value={email}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="mobile">
                                Mobile
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                id="mobile"
                                type="text"
                                placeholder="Enter your mobile number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            {fieldErrors.mobile && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors.mobile}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="studentLevel">
                                Student Level
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border ${fieldErrors.studentLevel ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                id="studentLevel"
                                type="text"
                                placeholder="Enter your student level"
                                name="studentLevel"
                                value={formData.studentLevel}
                                onChange={handleChange}
                            />
                            {fieldErrors.studentLevel && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors.studentLevel}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                                Address
                            </label>
                            <input
                                className={`w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border ${fieldErrors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                id="address"
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {fieldErrors.address && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors.address}</p>
                            )}
                        </div>
                        <button
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default StudentRegistration;
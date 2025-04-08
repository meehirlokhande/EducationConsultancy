import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        name: '',
        description: '',
        duration: '',
        price: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('edu-con/courses/add', courseData);
            console.log('Course added successfully:', response.data);
            navigate('/all-courses');
        } catch (error) {
            console.error('Error adding course:', error);
            setError('Failed to add course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-blue-600 mb-8">Add New Course</h1>
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <form onSubmit={submitHandler} className="space-y-6">
                        {/* Course Name */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                                Course Name
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-300 transition duration-300"
                                id="name"
                                type="text"
                                placeholder="Enter course name"
                                value={courseData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Course Description */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-300 transition duration-300"
                                id="description"
                                placeholder="Enter course description"
                                value={courseData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="duration">
                                Duration
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-300 transition duration-300"
                                id="duration"
                                type="text"
                                placeholder="Enter course duration (e.g., 3 months)"
                                value={courseData.duration}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Fees */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fees">
                                Fees
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-300 transition duration-300"
                                id="price"
                                type="number"
                                placeholder="Enter course fees"
                                value={courseData.price}
                                onChange={handleChange}
                                required
                            />
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
                                'Add Course'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;   
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        name: '',
        description: '',
        duration: '',
        price: '',
    });

    useEffect(() => {
        // Fetch course details by ID
        axios
            .get(`edu-con/courses/${id}`)
            .then((response) => {
                const fetchedCourse = response.data;
                setCourse({
                    name: fetchedCourse.name || '',
                    description: fetchedCourse.description || '',
                    duration: fetchedCourse.duration || '',
                    price: fetchedCourse.price || '',
                });
            })
            .catch((error) => console.error('Error fetching course:', error));
    }, [id]);

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`edu-con/courses/update/${id}`, course)
            .then(() => {
                alert('Course Updated Successfully');
                navigate('/update-courses');
            })
            .catch((error) => console.error('Error updating course:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Update Course</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Course Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Course Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={course.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter course name"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter course description"
                            rows="4"
                            required
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Duration (Days):</label>
                        <input
                            type="number"
                            name="duration"
                            value={course.duration}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter course duration"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={course.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter course price"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update Course
                    </button>
                </form>
                
            </div>
        </div>
    );
};

export default UpdateCourse;
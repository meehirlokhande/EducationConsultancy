import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateCourseList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('edu-con/courses/all');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (confirmDelete) {
      try {
        await axios.delete(`edu-con/courses/delete/${id}`);
        alert('Course deleted successfully');
        fetchCourses(); // Refresh the course list after deletion
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete the course. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Select a Course to Update</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(course.id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>

              {/* Course Details */}
              <h3
                onClick={() => navigate(`/update-course/${course.id}`)}
                className="text-xl font-semibold text-blue-600 mb-2 cursor-pointer"
              >
                {course.name}
              </h3>
              <p className="text-gray-700 mb-1">Duration: {course.duration} Days</p>
              <p className="text-gray-700 mb-1">Price: ₹{course.price}</p>
              <p className="text-gray-500 text-sm">Click to update this course</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpdateCourseList;
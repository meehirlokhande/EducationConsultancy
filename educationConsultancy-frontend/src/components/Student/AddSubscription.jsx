import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

function AddSubscription() {
    const location = useLocation();
    const navigate = useNavigate();
    const {setStudentId} = useContext(UserContext);
    const { courseId, studentId } = location.state || {}; // Get courseId and studentId from state

    const [courseDetails, setCourseDetails] = useState(null); // To store course details
    const [formData, setFormData] = useState({
        student: String(studentId), 
        course: String(courseId),   
        subscriptionDate: new Date().toISOString().split('T')[0], 
        endDate: '',
        installments: 1, 
        installmentAmount: 0, 
        status: 'Active', 
    });

    // Fetch course details from the backend
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/educon/edu-con/courses/${courseId}`);
                setCourseDetails(response.data);

                // Extract the numeric value from the duration string (e.g., "8 weeks")
                const durationInWeeks = parseInt(response.data.duration.split(' ')[0], 10);
                if (isNaN(durationInWeeks)) {
                    throw new Error('Invalid duration format');
                }

                // Calculate the end date based on the course duration in weeks
                const subscriptionDate = new Date();
                const endDate = new Date(subscriptionDate);
                const durationInDays = durationInWeeks * 7; 
                endDate.setDate(subscriptionDate.getDate() + durationInDays);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    installmentAmount: response.data.price, 
                    endDate: endDate.toISOString().split('T')[0], 
                }));
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);


    useEffect(()=>{
        setStudentId(studentId);
    },[studentId,setStudentId]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [name]: value };

            // Dynamically calculate installment amount based on installments
            if (name === 'installments') {
                const installments = parseInt(value, 10); 
                if (installments >= 1 && installments <= 3 && courseDetails) {
                    updatedFormData.installmentAmount = parseFloat((courseDetails.price / installments).toFixed(2));
                }
            }

            console.log('Updated form data:', updatedFormData); // error testing
            return updatedFormData;
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.student || !formData.course || !formData.subscriptionDate || !formData.endDate) {
            alert('Please ensure all required fields are filled.');
            return;
        }

        // console.log('Submitting form data:', formData); 
        try {
           
            const subscriptionResponse = await axios.post(
                'http://localhost:9090/educon/edu-con/subscriptions/create',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
          

            if (subscriptionResponse.status === 200 || subscriptionResponse.status === 201) {
                alert('Subscription created successfully!');

                // Generate the bill
                const subscriptionId = subscriptionResponse.data.subscriptionId; 
                const billPayload = {
                    subscriptionId: subscriptionId,
                    studentId: formData.student,
                    installmentNo: 1, 
                    amount: formData.installmentAmount,
                    payDate: new Date().toISOString().split('T')[0], 
                };

                

                const billResponse = await axios.post(
                    'http://localhost:9090/educon/edu-con/payment',
                    billPayload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (billResponse.status === 200 || billResponse.status === 201) {
                    alert(`Bill generated successfully! Bill Number: ${billResponse.data.billNumber}`);
                    navigate('/studentPaymentHistory', { state: { studentId } }); 
                }
            }
        } catch (error) {
            console.error('Error creating subscription or generating bill:', error); 
            alert('Failed to create subscription or generate bill. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Add Subscription</h1>
                {courseDetails ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Student ID</label>
                            <input
                                type="text"
                                name="student"
                                value={formData.student}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Course ID</label>
                            <input
                                type="text"
                                name="course"
                                value={formData.course}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Course Name</label>
                            <input
                                type="text"
                                value={courseDetails.name}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Course Price</label>
                            <input
                                type="text"
                                value={`₹${courseDetails.price}`}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Subscription Date</label>
                            <input
                                type="text"
                                name="subscriptionDate"
                                value={formData.subscriptionDate}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">End Date</label>
                            <input
                                type="text"
                                name="endDate"
                                value={formData.endDate}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Installments</label>
                            <input
                                type="number"
                                name="installments"
                                value={formData.installments}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                min="1"
                                max="3"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Installment Amount</label>
                            <input
                                type="number"
                                name="installmentAmount"
                                value={formData.installmentAmount}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                            <input
                                type="text"
                                name="status"
                                value={formData.status}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
                        >
                            Payment
                        </button>
                    </form>
                ) : (
                    <p className="text-center text-gray-500">Loading course details...</p>
                )}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => navigate(-1)} 
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddSubscription;
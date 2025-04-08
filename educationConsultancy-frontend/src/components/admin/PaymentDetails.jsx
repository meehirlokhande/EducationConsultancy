import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentDetails = () => {
    const { billNumber } = useParams();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Step 1: Fetch subscriptionId using billNumber
                const paymentResponse = await axios.get(`http://localhost:9090/educon/edu-con/payment/${billNumber}`);
                const subscriptionId = paymentResponse.data.subscriptionId;

                // Step 2: Fetch subscription and student details using subscriptionId
                const subscriptionResponse = await axios.get(`http://localhost:9090/educon/edu-con/subscriptions/${subscriptionId}`);
                setDetails(subscriptionResponse.data);
            } catch (err) {
                console.error('Error fetching details:', err);
                setError('Failed to fetch details. Please try again later.');
            }
        };

        fetchDetails();
    }, [billNumber]);

    
    const calculateRemainingInstallments = () => {
    if (!details) return 0;

    const totalInstallments = details.installments; 
    const totalAmountPaid = details.totalAmountPaid || details.installmentAmount; 
    const installmentAmountPerPayment = details.course.price / totalInstallments; 

    
    const installmentsPaid = Math.floor(totalAmountPaid / installmentAmountPerPayment);

    
    return totalInstallments - installmentsPaid-1;
};

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-between">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">User Details</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {details ? (
                    <div className="grid grid-cols-2 gap-8">

                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-blue-500 mb-4">Subscription Details</h2>
                            <p><strong>Subscription ID:</strong> {details.subscriptionId}</p>
                            <p><strong>Course Name:</strong> {details.course.name}</p>
                            <p><strong>Course Description:</strong> {details.course.description}</p>
                            <p><strong>Price:</strong> ₹{details.course.price}</p>
                            <p><strong>Subscription Date:</strong> {details.subscriptionDate}</p>
                            <p><strong>End Date:</strong> {details.endDate}</p>
                            <p><strong>Installments Selected:</strong> {details.installments}</p>
                            <p><strong>Installments Left:</strong> {calculateRemainingInstallments()}</p>
                            <p><strong>Installment Amount Paid:</strong> ₹{details.installmentAmount}</p>
                            <p><strong>Status:</strong> {details.status}</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-blue-500 mb-4">Student Details</h2>
                            <p><strong>Registration Number:</strong> {details.student.registrationNumber}</p>
                            <p><strong>Username:</strong> {details.student.username}</p>
                            <p><strong>Student Name:</strong> {details.student.studentName}</p>
                            <p><strong>Email:</strong> {details.student.email}</p>
                            <p><strong>Mobile:</strong> {details.student.mobile}</p>
                            <p><strong>Student Level:</strong> {details.student.studentLevel}</p>
                            <p><strong>Address:</strong> {details.student.address}</p>
                            <p><strong>Status:</strong> {details.student.status}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading details...</p>
                )}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default PaymentDetails;
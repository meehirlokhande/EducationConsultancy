import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';

const AdminPaymentHistory = () => {
    const [payments, setPayments] = useState([]); 
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:9090/educon/edu-con/payment'); // Fetch all payments
                setPayments(response.data); // Set the payment records in state
            } catch (err) {
                console.error('Error fetching payment records:', err);
                setError('Failed to fetch payment records. Please try again later.');
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Admin Payment History</h1>

                {/* Back Button */}
                <div className="flex justify-start mb-4">
                    <button
                        onClick={() => navigate(-1)} // Navigate back to the previous page
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Back
                    </button>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {payments.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border border-gray-300 px-4 py-2">Bill Number</th>
                                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                                <th className="border border-gray-300 px-4 py-2">Subscription ID</th>
                                <th className="border border-gray-300 px-4 py-2">Installment No</th>
                                <th className="border border-gray-300 px-4 py-2">Amount</th>
                                <th className="border border-gray-300 px-4 py-2">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr
                                    key={payment.billNumber}
                                    className="text-center cursor-pointer hover:bg-blue-50"
                                    onClick={() => navigate(`/paymentDetails/${payment.billNumber}`)} // Navigate to details page
                                >
                                    <td className="border border-gray-300 px-4 py-2">{payment.billNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{payment.studentId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{payment.subscriptionId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{payment.installmentNo}</td>
                                    <td className="border border-gray-300 px-4 py-2">₹{payment.amount}</td>
                                    <td className="border border-gray-300 px-4 py-2">{payment.payDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No payment records found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPaymentHistory;
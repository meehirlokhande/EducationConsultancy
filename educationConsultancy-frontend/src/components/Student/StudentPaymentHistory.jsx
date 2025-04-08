import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const StudentPaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const studentId = localStorage.getItem('studentId');
        // console.log('Student ID from localStorage:', studentId);

        if (studentId) {
            axios
                .get(`http://localhost:9090/educon/edu-con/payment/student/${studentId}`)
                .then((response) => {
                    setPayments(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching payments:', error);
                });
        } else {
            console.error('Student ID not found in localStorage.');
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
                <div className='border-3 bordee-red-500  bg-custom-dark flex justify-between p-2'>
                    <h1 className="text-3xl font-bold text-white ">Payment History</h1>
                    <button
                        onClick={() => navigate(-1)} 
                        className=" bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Back
                    </button>
                </div>
                {payments.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border border-gray-300 px-4 py-2">Bill Number</th>
                                <th className="border border-gray-300 px-4 py-2">Subscription ID</th>
                                <th className="border border-gray-300 px-4 py-2">Installment No</th>
                                <th className="border border-gray-300 px-4 py-2">Amount</th>
                                <th className="border border-gray-300 px-4 py-2">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.billNumber} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{payment.billNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{payment.subscriptionId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{payment.installmentNo}</td>
                                    <td className="border border-gray-300 px-4 py-2">₹{payment.amount}</td>
                                    <td className="border border-gray-300 px-4 py-2">{payment.payDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No payment history found.</p>
                )}
            </div>
        </div>
    );
};

export default StudentPaymentHistory;
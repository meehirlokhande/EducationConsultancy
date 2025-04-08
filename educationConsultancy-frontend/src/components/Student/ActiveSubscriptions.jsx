import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActiveSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Fetch active subscriptions from the API
  useEffect(() => {
    const fetchActiveSubscriptions = async () => {
      try {
        const response = await axios.get('edu-con/subscriptions/active');
        setSubscriptions(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching active subscriptions:', err);
        setError('Failed to load active subscriptions. Please try again later.');
        setLoading(false);
      }
    };

    fetchActiveSubscriptions();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading active subscriptions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">Subscriptions</h1>
        {subscriptions.length === 0 ? (
          <p className="text-center text-gray-500">No active subscriptions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-2">Subscription ID</th>
                  <th className="px-4 py-2">Student Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Course Name</th>
                  <th className="px-4 py-2">Subscription Date</th>
                  <th className="px-4 py-2">End Date</th>
                  <th className="px-4 py-2">Installments</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.subscriptionId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 text-center">{subscription.subscriptionId}</td>
                    <td className="px-4 py-2 text-center">{subscription.student.studentName}</td>
                    <td className="px-4 py-2 text-center">{subscription.student.email}</td>
                    <td className="px-4 py-2 text-center">{subscription.course.name}</td>
                    <td className="px-4 py-2 text-center">{subscription.subscriptionDate}</td>
                    <td className="px-4 py-2 text-center">{subscription.endDate}</td>
                    <td className="px-4 py-2 text-center">{subscription.installments}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${subscription.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                      >
                        {subscription.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/home')} // Navigate to the admin page
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Back to Admin Page
          </button>
        </div>
      </div>
      </div>
    
  );
};

export default ActiveSubscriptions;
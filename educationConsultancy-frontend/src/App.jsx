// import React, { useState } from 'react'
import Signup from './components/Signup'
// import User from './components/user/User'
// import AdminPage from './components/admin/AdminPage'
import SignIn from './components/SignIn'
import axios from 'axios'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import AllCourses from './components/courses/AllCourses'
import AddCourse from './components/courses/AddCourses'
import UpdateCourseList from './components/courses/UpdateCourseList'
import UpdateCourse from './components/courses/UpdateCourse'
import StudentRegistration from './components/Student/StudentRegistration'
import AllStudents from './components/Student/AllStudents'
import StudentDetails from './components/Student/StudentDetails'
import UpdateStudentDetails from './components/Student/UpdateStudentDetails'
import StudentAllCourses from './components/Student/StudentAllCourses'
import AddSubscription from './components/Student/AddSubscription'
import ActiveSubscriptions from './components/Student/ActiveSubscriptions'
import StudentPaymentHistory from './components/Student/StudentPaymentHistory'
import UserProvider from './components/UserContext/UserContext';
import AdminPaymentHistory from './components/admin/AdminPaymentHistory'
import PaymentDetails from './components/admin/PaymentDetails'
import AdminUpdateStudentDetails from './components/admin/AdminUpdateStudentDetails'



const App = () => {
  // const [user, setUser] = useState(null)
  // const role = localStorage.getItem("role");
  // const token = localStorage.getItem("token");
  // const handleLogin = (userData) => {
  //   setUser(userData)
  // }

  axios.defaults.baseURL = "http://localhost:9090/educon";
  axios.defaults.withCredentials = true;

  return (
    
    <div>
      {/* {user ? <User user={user} /> : <Signup onLogin={handleLogin} />} */}
      {/* <AdminPage/> */}
      <UserProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/all-courses' element={<AllCourses/>}/>
        <Route path='/add-courses' element={<AddCourse/>}/>
        <Route path='/update-courses' element={<UpdateCourseList/>} />
        <Route path='/update-course/:id' element={<UpdateCourse/>} />
        <Route path="/studentRegistration" element={<StudentRegistration />} />
        <Route path='/studentslist' element={<AllStudents/>}/>
        <Route path="/student-details/:registrationNumber" element={<StudentDetails />} />
        <Route path="/UpdateStudentDetails" element={<UpdateStudentDetails />} />
          <Route path="/adminUpdateStudentDetails" element={<AdminUpdateStudentDetails />} />
        <Route path="/studentallcourse" element={<StudentAllCourses />} />
        <Route path="/addsubscription" element={<AddSubscription />} />
        <Route path="/activeSubscriptions" element={<ActiveSubscriptions />} />
        <Route path="/studentPaymentHistory" element={<StudentPaymentHistory />} />   
        <Route path="/adminPaymentHistory" element={<AdminPaymentHistory />} />   
        <Route path="/paymentDetails/:billNumber" element={<PaymentDetails />} />

      </Routes>
    </UserProvider>
    </div>
   
  )
}

export default App
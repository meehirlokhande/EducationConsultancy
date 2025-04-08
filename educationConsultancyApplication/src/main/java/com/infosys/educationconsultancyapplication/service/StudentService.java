package com.infosys.educationconsultancyapplication.service;

import com.infosys.educationconsultancyapplication.bean.Student;
import com.infosys.educationconsultancyapplication.dao.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Generate custom Student Registration ID
    private String generateRegistration(){
        String lastReg = studentRepository.getMaxRegistration();
        Long id = 100001L;

        if(lastReg!=null){
            id = Long.parseLong(lastReg.substring(1))+1;
        }

        return "S"+id;
    }

    //Get All Active Students
    public List<Student> getActiveStudents(){
        return studentRepository.findActiveStudents("Active");
    }

    // Add Student
    public Student addStudent(Student student) {
        student.setRegistrationNumber(generateRegistration());
        student.setStatus("Active");
        return studentRepository.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student By ID
    public Optional<Student> getStudentById(String id) {
        return studentRepository.findById(id);
    }

    // Update Student
    public Student updateStudent(String id, Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
            student.setUsername(updatedStudent.getUsername());
            student.setStudentName(updatedStudent.getStudentName());
            student.setEmail(updatedStudent.getEmail());
            student.setStudentLevel(updatedStudent.getStudentLevel());
            student.setAddress(updatedStudent.getAddress());
            student.setStatus(updatedStudent.getStatus());
            student.setMobile(updatedStudent.getMobile());
            return studentRepository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found"));
    }
}

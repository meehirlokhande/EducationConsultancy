package com.infosys.educationconsultancyapplication.dao;

import com.infosys.educationconsultancyapplication.bean.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,String> {
    @Query("SELECT MAX(s.registrationNumber) FROM Student s")
    String getMaxRegistration();

    @Query("SELECT s FROM Student s WHERE s.status = :status")
    List<Student> findActiveStudents(@Param("status") String status);
}

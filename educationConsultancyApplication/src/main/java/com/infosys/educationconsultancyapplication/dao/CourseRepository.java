package com.infosys.educationconsultancyapplication.dao;

import com.infosys.educationconsultancyapplication.bean.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

}

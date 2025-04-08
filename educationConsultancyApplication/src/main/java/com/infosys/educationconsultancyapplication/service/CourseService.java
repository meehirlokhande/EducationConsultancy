package com.infosys.educationconsultancyapplication.service;

import com.infosys.educationconsultancyapplication.bean.Course;
import com.infosys.educationconsultancyapplication.dao.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    //Add Courses
    public Course addCourse(Course course){
        return courseRepository.save(course);
    }

    //Get All Courses
    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    //Get Course By Id
    public Optional<Course> getCourseById(Long id){
        return courseRepository.findById(id);
    }

    //Update Course
    public Course updateCourse(Long id, Course updatedCourse){
        return courseRepository.findById(id).map(course -> {
            course.setName(updatedCourse.getName());
            course.setDescription(updatedCourse.getDescription());
            course.setPrice(updatedCourse.getPrice());
            course.setDuration(updatedCourse.getDuration());
            return courseRepository.save(course);
        }).orElseThrow(()-> new RuntimeException("Course not found"));
    }

    //Delete course
    public void deleteCourse(Long id){
        courseRepository.deleteById(id);
    }


}

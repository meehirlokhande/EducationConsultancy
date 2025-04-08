package com.infosys.educationconsultancyapplication.controller;
import com.infosys.educationconsultancyapplication.bean.Course;
import com.infosys.educationconsultancyapplication.service.CourseService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/edu-con/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseService courseService;

    //Add Course (Admin Only)
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Course> addCourse(@RequestBody Course course){
        return ResponseEntity.ok(courseService.addCourse(course));
    }

    //Get all Courses
    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses(){
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    //Get Course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Course>> getCourseById(@PathVariable Long id){
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    //Update Course (Admin Only)
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course course){
        return ResponseEntity.ok(courseService.updateCourse(id,course));
    }

    //Delete Course (Admin only)
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id){

        courseService.deleteCourse(id);
        return ResponseEntity.ok("Course deleted successfully");
    }



}

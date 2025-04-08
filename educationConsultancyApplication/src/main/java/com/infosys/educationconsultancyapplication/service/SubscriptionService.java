package com.infosys.educationconsultancyapplication.service;

import com.infosys.educationconsultancyapplication.bean.Course;
import com.infosys.educationconsultancyapplication.bean.CourseSubscription;
import com.infosys.educationconsultancyapplication.bean.Student;
import com.infosys.educationconsultancyapplication.dao.CourseSubscriptionRepository;
import com.infosys.educationconsultancyapplication.dto.CourseSubscriptionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {

    private final CourseSubscriptionRepository subscriptionRepository;
    private final StudentService studentService;
    private final CourseService courseService;



    @Autowired
    public SubscriptionService(CourseSubscriptionRepository subscriptionRepository, StudentService studentService, CourseService courseService, CourseSubscriptionRepository courseSubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.studentService = studentService;
        this.courseService = courseService;

    }

    private String generateSubscriptionId() {
        String lastSubscription = subscriptionRepository.getMaxSubscriptionId();
        Long id = 200001L; // Starting ID

        if (lastSubscription != null && lastSubscription.startsWith("CS")) {
            try {
                id = Long.parseLong(lastSubscription.substring(2)) + 1; // Skip "CS" prefix
            } catch (NumberFormatException e) {
                throw new RuntimeException("Invalid subscription ID format in the database");
            }
        }


        return "CS" + id;
    }

    // Add Subscription
    public CourseSubscription addSubscription(CourseSubscriptionDto subscription) throws Exception {
        if(this.checkExistingSubscription(subscription.getStudent(), subscription.getCourse())){
            throw new Exception("Subscription already exists for this student");

        }
        CourseSubscription courseSubscription = new CourseSubscription();
        courseSubscription.setSubscriptionId(generateSubscriptionId());
        Student student = studentService.getStudentById(subscription.getStudent())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseService.getCourseById(Long.parseLong(subscription.getCourse()))
                .orElseThrow(() -> new RuntimeException("Course not found"));
        courseSubscription.setSubscriptionDate(subscription.getSubscriptionDate());
        courseSubscription.setStudent(student);
        courseSubscription.setCourse(course);
        courseSubscription.setStatus(subscription.getStatus());
        courseSubscription.setInstallments(subscription.getInstallments());
        courseSubscription.setInstallmentAmount(subscription.getInstallmentAmount());
        courseSubscription.setEndDate(subscription.getEndDate());
        return subscriptionRepository.save(courseSubscription);
    }

    // Get All Subscriptions
    //    public List<CourseSubscription> getAllSubscriptions() {
    //        return subscriptionRepository.findAll();
    //    }
    public List<CourseSubscription> getAllSubscriptions() {
        List<CourseSubscription> subscriptions = subscriptionRepository.findAll();
        subscriptions.forEach(this::updateSubscriptionStatus);
        return subscriptions;
    }

    // Get Subscription By ID
//    public Optional<CourseSubscription> getSubscriptionById(String id) {
//        return subscriptionRepository.findById(id);
//    }
    public Optional<CourseSubscription> getSubscriptionById(String id) {
        Optional<CourseSubscription> subscription = subscriptionRepository.findById(id);
        subscription.ifPresent(this::updateSubscriptionStatus);
        return subscription;
    }



    // Get Active Subscriptions
    public List<CourseSubscription> getActiveSubscriptions() {
        return subscriptionRepository.findActiveSubscriptions();
    }

    public boolean checkExistingSubscription(String studentId, String courseId){
            return  subscriptionRepository.findByStudent_RegistrationNumberAndCourse_Id(studentId,
                    Long.parseLong(courseId))
                    .isPresent();
    }

    private void updateSubscriptionStatus(CourseSubscription subscription) {
        if (subscription.getEndDate().isBefore(LocalDate.now())) {
            if (!"Expired".equalsIgnoreCase(subscription.getStatus())) {
                subscription.setStatus("Expired");
                subscriptionRepository.save(subscription);
            }
        }
    }



    // Cancel Subscription
//    public CourseSubscription cancelSubscription(String id) {
//        return subscriptionRepository.findById(id).map(subscription -> {
//            subscription.setStatus("Cancelled");
//            return subscriptionRepository.save(subscription);
//        }).orElseThrow(() -> new RuntimeException("Subscription not found"));
//    }
}

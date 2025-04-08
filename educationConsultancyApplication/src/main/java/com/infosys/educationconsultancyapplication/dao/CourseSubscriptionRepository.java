package com.infosys.educationconsultancyapplication.dao;

import com.infosys.educationconsultancyapplication.bean.CourseSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseSubscriptionRepository extends JpaRepository<CourseSubscription, String> {

    @Query("SELECT MAX(c.subscriptionId) FROM CourseSubscription c")
    String getMaxSubscriptionId();

    @Query("SELECT c FROM CourseSubscription c WHERE c.status = 'Active'")
    List<CourseSubscription> findActiveSubscriptions();

    Optional<CourseSubscription> findByStudent_RegistrationNumberAndCourse_Id(String studentId, Long courseId);
}

package com.infosys.educationconsultancyapplication.dto;

import com.infosys.educationconsultancyapplication.bean.CourseSubscription;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link CourseSubscription}
 */
@Value
public class CourseSubscriptionDto implements Serializable {
    String student;
    String course;
    LocalDate subscriptionDate;
    LocalDate endDate;
    Integer installments;
    Double installmentAmount;
    String status;
}
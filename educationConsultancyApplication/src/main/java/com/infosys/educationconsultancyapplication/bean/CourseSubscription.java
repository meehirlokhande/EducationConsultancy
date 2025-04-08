package com.infosys.educationconsultancyapplication.bean;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.time.LocalDate;

@Entity
@EntityScan
@Getter
@Setter
@Table(name = "subscriptions")
public class CourseSubscription {

    @Id
    private String subscriptionId;

    @ManyToOne
    @JoinColumn(name="student_id", referencedColumnName = "registration_number", nullable = false)
    private Student student; // FK to Student table

    @ManyToOne
    @JoinColumn(name="course_id", referencedColumnName = "id", nullable = false)
    private Course course; // FK to Course table

    @Column(nullable = false)
    private LocalDate subscriptionDate;

    @Column(nullable = false)
    @Setter
    private LocalDate endDate;

    @Column(nullable = false)
    @Setter
    private Integer installments;

    @Column(nullable = false)
    private Double installmentAmount;

    @Column(nullable = false)
    private String status;  // active or expired

    // Auto-assign subscriptionDate and calculate endDate (90 days)
    @PrePersist
    protected void onCreate() {
        this.subscriptionDate = LocalDate.now(); // Assign system date
        this.endDate = this.subscriptionDate.plusDays(90); // Calculate 90 days later
    }
}

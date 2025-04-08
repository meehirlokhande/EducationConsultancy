package com.infosys.educationconsultancyapplication.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Payment {
    @Id
    @Column(name = "bill_number")
    private String billNumber; // Auto-generated

    @Column(name = "subscription_id")
    private String subscriptionId;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "installment_no")
    private Integer installmentNo;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "pay_date")
    private String payDate;
}

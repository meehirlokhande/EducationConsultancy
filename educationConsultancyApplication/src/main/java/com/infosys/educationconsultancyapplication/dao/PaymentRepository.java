package com.infosys.educationconsultancyapplication.dao;

import com.infosys.educationconsultancyapplication.bean.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

    @Query("SELECT MAX(p.billNumber) FROM Payment p")
    String getMaxBillNumber();

    @Query("SELECT p FROM Payment p WHERE p.subscriptionId = ?1")
    List<Payment> getBillBySubscriptionId(String subscriptionId);

    @Query("SELECT p FROM Payment p WHERE p.studentId = ?1")
    List<Payment> getBillByStudentId(String studentId);
}

package com.infosys.educationconsultancyapplication.service;

import com.infosys.educationconsultancyapplication.bean.Payment;
import com.infosys.educationconsultancyapplication.dao.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public String generateBillNumber() {
        String lastBill = paymentRepository.getMaxBillNumber();
        Long id = 100001L; // Starting ID

        if (lastBill != null && lastBill.startsWith("BL")) {
            id = Long.parseLong(lastBill.substring(2)) + 1;
        }

        return "BL" + id;
    }

    public Payment savePayment(Payment payment) {
        payment.setBillNumber(generateBillNumber());
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentByBill(String billNumber) {
        return paymentRepository.findById(billNumber);
    }

    public List<Payment> getBillBySubscriptionId(String subscriptionId) {
        return paymentRepository.getBillBySubscriptionId(subscriptionId);
    }

    public List<Payment> getBillByStudentId(String studentId) {
        return paymentRepository.getBillByStudentId(studentId);
    }
}

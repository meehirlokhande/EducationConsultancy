package com.infosys.educationconsultancyapplication.controller;

import com.infosys.educationconsultancyapplication.bean.Payment;
import com.infosys.educationconsultancyapplication.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/edu-con/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public Payment savePayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    @GetMapping("/{id}")
    public Optional<Payment> getPaymentByBill(@PathVariable String id) {
        return paymentService.getPaymentByBill(id);
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/subscription/{id}")
    public List<Payment> getBillBySubscriptionId(@PathVariable String id) {
        return paymentService.getBillBySubscriptionId(id);
    }

    @GetMapping("/student/{id}")
    public List<Payment> getBillByStudentId(@PathVariable String id) {
        return paymentService.getBillByStudentId(id);
    }
}

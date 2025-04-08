package com.infosys.educationconsultancyapplication.dto;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for Payment
 */
@Value
public class PaymentDto implements Serializable {
    String subscriptionId;
    String studentId;
    Integer installmentNo;
    Double amount;
    LocalDate payDate;
}

package com.infosys.educationconsultancyapplication.bean;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "students")
public class Student {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "mobile", nullable = false)
    private Long mobile;

    @Column(name = "student_level", nullable = false)
    private String studentLevel;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "status", nullable = false)
    private  String status;






}

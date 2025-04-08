package com.infosys.educationconsultancyapplication.dto;

import lombok.Value;

import java.io.Serializable;

@Value
public class CourseDTO implements Serializable {
    Long Id;
    String name;
    String description;
    Double price;
    String duration;

}

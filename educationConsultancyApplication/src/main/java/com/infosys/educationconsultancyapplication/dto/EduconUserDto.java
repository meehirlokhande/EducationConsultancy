package com.infosys.educationconsultancyapplication.dto;

import com.infosys.educationconsultancyapplication.bean.EduconUser;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link EduconUser}
 */
@Value
public class EduconUserDto implements Serializable {
    String username;
    String password;
    String email;
    String category;
}
package com.infosys.educationconsultancyapplication.service;

import com.infosys.educationconsultancyapplication.bean.EduconUser;
import com.infosys.educationconsultancyapplication.dao.EduUserRepository;
import com.infosys.educationconsultancyapplication.dto.EduconUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class EduconUserService implements UserDetailsService {
    @Autowired
    private EduUserRepository repository;
    private String userId;
    private String category;
    private String email;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void  save(EduconUser user){
        repository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EduconUser  user = repository.findById(username).get();
        this.userId = user.getUsername();
        this.category = user.getCategory();
        this.email = user.getEmail();
        return user;
    }


    public EduconUser createUser(EduconUserDto userRequestBody){
        EduconUser newUser = new EduconUser();
        newUser.setUsername(userRequestBody.getUsername());
        newUser.setPassword(passwordEncoder.encode(userRequestBody.getPassword()));
        newUser.setEmail(userRequestBody.getEmail());
        newUser.setCategory(userRequestBody.getCategory());
        newUser.setRole("ROLE_USER");

        return repository.save(newUser);
    }

    public EduconUser createAdmin(EduconUserDto userRequestBody){
        EduconUser newAdmin = new EduconUser();
        newAdmin.setUsername(userRequestBody.getUsername());
        newAdmin.setPassword(passwordEncoder.encode(userRequestBody.getPassword()));
        newAdmin.setEmail(userRequestBody.getEmail());
        newAdmin.setCategory(userRequestBody.getCategory());
        newAdmin.setRole("ROLE_ADMIN");

        return repository.save(newAdmin);
    }


    public EduconUser loginUser(EduconUserDto userLoginBody){
        EduconUser user = repository.findById(userLoginBody.getEmail())
                .orElseThrow(()->new RuntimeException("user not found"));

        if(passwordEncoder.matches(userLoginBody.getPassword(), user.getPassword())){
            return user;
        } else {
            throw new RuntimeException("Invalid credentials");
        }

    }
}

package com.infosys.educationconsultancyapplication.controller;


import com.infosys.educationconsultancyapplication.dto.EduconUserDto;
import com.infosys.educationconsultancyapplication.service.EduconUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:5173",maxAge = 3600)
@RestController
@RequestMapping("/edu-con")
//@CrossOrigin(origins = "http://localhost:5173")

public class LoginController {
    @Autowired
    private EduconUserService userService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {
        return "Hello World";
    }

    @RequestMapping(value = "/test2", method = RequestMethod.POST)
    public String test2() {
        return "Hello World";
    }

    @RequestMapping(value = "/signup",method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody EduconUserDto userRequestBody) throws Exception {
        return ResponseEntity.ok(userService.createUser(userRequestBody));


}
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public ResponseEntity<?> loginUser(@RequestBody EduconUserDto userLoginBody) throws Exception {
        return ResponseEntity.ok(userService.loginUser(userLoginBody));
    }

    @RequestMapping(value = "/admin/signup",method = RequestMethod.POST)
    public ResponseEntity<?> createAdmin(@RequestBody EduconUserDto userRequestBody) throws Exception {
        return ResponseEntity.ok(userService.createAdmin(userRequestBody));
    }
}

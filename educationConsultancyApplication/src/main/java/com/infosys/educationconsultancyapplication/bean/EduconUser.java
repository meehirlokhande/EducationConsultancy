//package com.infosys.educationconsultancyapplication.bean;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import lombok.Getter;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.ArrayList;
//import java.util.Collection;
//
//@Entity
//@Getter
//@Setter
//@Table(name = "users")
//public class EduconUser extends User {
//
//    @Column(name = "username",nullable = false)
//    private String username;
//
//    @Column(name = "password",nullable = false)
//    private String password;
//
//    @Id
//    @Column(name = "email",nullable = false)
//    private String email;
//
//    @Column(name = "category",nullable = false)
//    private String category;
//
//    @Column(name = "role", nullable = false)
//    private  String role;
//
//    public EduconUser() {
//        super("abc","pqrs",new ArrayList<>());
//
//    }
//
//
//    public EduconUser(String username, String password, Collection<? extends GrantedAuthority> authorities,
//                      String username2, String email2, String password2, String category2, String role2) {
//
//        super(username, password, authorities);
//        this.username = username2;
//        this.password = password2;
//        this.email = email2;
//        this.category = category2;
//        this.role = role2.startsWith("ROLE_") ? role2 : "ROLE_" + role2;;
//    }
//
//}


package com.infosys.educationconsultancyapplication.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class EduconUser implements UserDetails {

    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "role", nullable = false)
    private String role;

    // ✅ Override getAuthorities() to return the user's role
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

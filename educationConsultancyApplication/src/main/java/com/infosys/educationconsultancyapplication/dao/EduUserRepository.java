package com.infosys.educationconsultancyapplication.dao;
import com.infosys.educationconsultancyapplication.bean.EduconUser;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EduUserRepository extends JpaRepository<EduconUser,String>{

}

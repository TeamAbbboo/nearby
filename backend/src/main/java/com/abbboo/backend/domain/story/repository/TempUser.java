package com.abbboo.backend.domain.story.repository;

import com.abbboo.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempUser extends JpaRepository<User, Long> {

}

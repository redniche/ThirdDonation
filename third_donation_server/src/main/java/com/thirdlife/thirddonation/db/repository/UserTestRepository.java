package com.thirdlife.thirddonation.db.repository;

import com.thirdlife.thirddonation.api.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//테스트용 리포지토리입니다. 이걸 참고만 하고 따라하는건 비추천합니다.
/**
 * This is UserTestRepository.&nbsp;Just Test.
 */
@Repository
public interface UserTestRepository extends JpaRepository<UserDto, String> {
    /**
     * Find user information by UserId.
     *
     * @param userId String
     * @return UserTest instance
     */
    public UserDto findByUserId(String userId);
}

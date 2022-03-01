package com.thirdlife.thirddonation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 * UserTestDto.
 */
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "Users")
public class UserTest {
    @Id
    private String userId;
    private String userPassword;
    private String userEmail;
}

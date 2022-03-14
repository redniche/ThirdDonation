package com.thirdlife.thirddonation.controller;

import com.thirdlife.thirddonation.dto.UserDto;
import com.thirdlife.thirddonation.repository.UserTestRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//테스트용 Controller입니다. 절대 이를 따라서 만들지 말길
/**
 * Test Controller with MongoDB.
 */
@RestController
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Api("Test 컨트롤러 API V1") // Controller에 대한 설명 Swagger Annotation
@RequestMapping("/test")
public class TestController {

    public static final Logger logger = LoggerFactory.getLogger(TestController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private UserTestRepository userTestRepository;

    /**
     * Find all users information in MongoDB.
     *
     * @return ResponseEntity instance
     */
    @ApiOperation(value = "모든유저조회", notes = "모든유저를 조회함", response = Map.class)
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> findAllUserTest() {
        logger.debug("findAllUser............................");
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            List<UserDto> userList = userTestRepository.findAll();
            responseMap.put("userList", userList);
        } catch (Exception e) {
            logger.error("회원정보 등록 실패 : {}", e);
            responseMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    /**
     * Insert user information into MongoDB.
     *
     * @param user UserTest instance
     * @return ResponseEntity instance
     */
    @ApiOperation(value = "유저집어넣기", notes = "유저를 집어넣음", response = Map.class)
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> insertUser(@RequestBody @ApiParam UserDto user) {
        logger.debug("regist............................");
        logger.debug("user:{}", user);
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            userTestRepository.save(user);
            resultMap.put("message", SUCCESS);
            System.out.println(user);
        } catch (Exception e) {
            logger.error("회원정보 등록 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}

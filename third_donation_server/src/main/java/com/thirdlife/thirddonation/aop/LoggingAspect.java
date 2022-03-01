package com.thirdlife.thirddonation.aop;

import java.util.Arrays;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Logging Aspect class for slf4j.
 */
@Component
@Aspect
public class LoggingAspect {

    private Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    /**
     * Logging in ThirdDonation Repositories.
     *
     * @param joinPoint instance
     */
    @Before(value = "execution(* com.thirdlife.thirddonation..*Repository.*(..))")
    public void logging(JoinPoint joinPoint) {
        logger.debug("메서드 선언부 : {} 전달 파라미터 : {}",
                joinPoint.getSignature(),
                Arrays.toString(joinPoint.getArgs()));
    }

}

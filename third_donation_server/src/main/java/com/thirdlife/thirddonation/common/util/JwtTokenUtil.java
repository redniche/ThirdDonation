package com.thirdlife.thirddonation.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * jwt 토큰 유틸 정의.
 */
@Component
public class JwtTokenUtil {
    private static String secretKey;
    private static Integer expirationTime;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "ssafy.com";

    /**
     * Jwt util 생성자.
     *
     * @param secretKey      String
     * @param expirationTime Integer
     */
    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secretKey,
                        @Value("${jwt.expiration}") Integer expirationTime) {
        JwtTokenUtil.secretKey = secretKey;
        JwtTokenUtil.expirationTime = expirationTime;
    }

    /**
     * 유효성 검사.
     *
     * @return JWTVerifier
     */
    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    /**
     * walletAddress 로 토큰 생성해서 반환.
     *
     * @param walletAddress String
     * @return String
     */
    public static String getToken(String walletAddress) {
        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime);
        return JWT.create()
                .withSubject(walletAddress)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(
                        Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    /**
     * 커스텀 만료시간을 정해서 token 발행.
     * (이를 쓰지 않아도 기본적으로 만료시간은 존재함.)
     *
     * @param expires Instant
     * @param walletAddress  String
     * @return String
     */
    public static String getToken(Instant expires, String walletAddress) {
        return JWT.create()
                .withSubject(walletAddress)
                .withExpiresAt(Date.from(expires))
                .withIssuer(ISSUER)
                .withIssuedAt(
                        Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    /**
     * 만료시간 반환 메서드.
     *
     * @param expirationTime int
     * @return Date
     */
    public static Date getTokenExpiration(int expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    /**
     * token 을 받아 에러 핸들링.
     *
     * @param token String
     */
    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        handleError(verifier, token);
    }

    /**
     * 토큰 유효성 정보를 받아 에러 핸들링.
     *
     * @param verifier JWTVerifier
     * @param token    String
     */
    public static void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException
                | InvalidClaimException
                | SignatureVerificationException
                | TokenExpiredException
                | JWTCreationException
                | JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}

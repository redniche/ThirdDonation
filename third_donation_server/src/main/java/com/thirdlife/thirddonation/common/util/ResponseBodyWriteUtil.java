package com.thirdlife.thirddonation.common.util;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

/**
 * 컨트롤러(controller)가 아닌곳에서, 서버 응답값(바디) 직접 변경 및 전달 하기위한 유틸 정의.
 */
public class ResponseBodyWriteUtil {

    /**
     * Api Response를 보내는 메서드.
     *
     * @param response    HttpServletResponse
     * @param apiResponse BaseResponseBody
     * @throws IOException 입출력 오류
     */
    public static void sendApiResponse(HttpServletResponse response, BaseResponseBody apiResponse)
            throws IOException {
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getOutputStream()
                .write(new ObjectMapper().writeValueAsString(apiResponse).getBytes());
    }

    /**
     * HttpStatus를 포함하여 에러가 발생하면 보내는 메서드.
     *
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     * @param ex Exception
     * @param httpStatus HttpStatus
     * @throws IOException 입출력 오류
     */
    public static void sendError(HttpServletRequest request, HttpServletResponse response,
                                 Exception ex, HttpStatus httpStatus) throws IOException {
        response.setStatus(httpStatus.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        String message = ex.getMessage();
        message = message == null ? "" : message;
        Map<String, Object> data = ImmutableMap.of(
                "timestamp", Calendar.getInstance().getTime(),
                "status", httpStatus.value(),
                "error", ex.getClass().getSimpleName(),
                "message", message,
                "path", request.getRequestURI()
        );
        PrintWriter pw = response.getWriter();
        pw.print(new ObjectMapper().writeValueAsString(data));
        pw.flush();
    }

    /**
     * HttpStatus.UNAUTHORIZED 인증되지 않음. 을 포함하여 에러 메시지 전송.
     *
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     * @param ex Exception
     * @throws IOException 입출력 오류
     */
    public static void sendError(HttpServletRequest request, HttpServletResponse response,
                                 Exception ex) throws IOException {
        sendError(request, response, ex, HttpStatus.UNAUTHORIZED);
    }
}

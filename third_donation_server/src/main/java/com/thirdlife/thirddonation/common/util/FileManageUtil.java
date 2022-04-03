package com.thirdlife.thirddonation.common.util;

import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.config.WebMvcConfig;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * 유저 서비스의 구현체입니다.
 */
@Slf4j
public class FileManageUtil {
    /**
     * 파일과 파일 이름을 받아 파일을 업로드 하는 메서드.
     *
     * @param multipartFile MultipartFile
     * @param fileName String
     * @return String
     */
    public static String saveFile(MultipartFile multipartFile, String fileName) {

        // find file upload directory
        File uploadDir = new File(WebMvcConfig.ABSOLUTE_PATH + WebMvcConfig.UPLOAD_PATH);
        if (!uploadDir.exists()) {
            if (!uploadDir.mkdirs()) {
                log.trace("폴더 생성 실패");
                throw new CustomException(ErrorCode.SPRING_SERVER_ERROR);
            }
        }

        UUID uuid = UUID.randomUUID();
        String extension = FilenameUtils.getExtension(fileName);
        String savingFileName = uuid + "." + extension;
        if (fileName == null || fileName.isEmpty()) {
            throw new CustomException(ErrorCode.CANNOT_EMPTY_IMAGE);
        }
        if (!fileName.matches(".+(\\.(?i)(jpg|png|gif))$")) {
            throw new CustomException(ErrorCode.CANNOT_WRONG_MIME);
        }

        try {
            File destFile = new File(
                    WebMvcConfig.ABSOLUTE_PATH + WebMvcConfig.UPLOAD_PATH
                            + File.separator
                            + savingFileName);
            multipartFile.transferTo(destFile);
        } catch (IOException e) {
            e.printStackTrace();
            throw new CustomException(ErrorCode.SPRING_SERVER_ERROR);
        }
        return savingFileName;
    }
}

package com.abbboo.backend.global.util;

import com.abbboo.backend.global.config.S3Config;
import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.ConflictException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class S3Util {

    private final AmazonS3 amazonS3;
    private final S3Config s3Config;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;  // 버킷명

    public String uploadFile(MultipartFile multipartFile, int code){

        // 메타데이터
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        // 고유한 파일명 생성
        String newFileName = makeFileName(code, multipartFile.getOriginalFilename());

        // s3에 파일 업로드
        try {
            amazonS3.putObject(bucket, newFileName, multipartFile.getInputStream(), metadata);
        } catch (IOException e) {
            throw new ConflictException(ErrorCode.UPLOAD_IS_FAIL);
        }
        return amazonS3.getUrl(bucket, newFileName).toString();
    }

    /* 파일명을 생성하는 메소드 */
    public String makeFileName(int code, String filename) {
        // UUID를 활용하여 고유한 파일명 생성
        UUID uuid = UUID.randomUUID();
        return s3Config.getDirectories().get(code) + uuid + '-' + filename;
    }
}

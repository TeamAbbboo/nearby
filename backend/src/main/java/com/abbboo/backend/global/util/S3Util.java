package com.abbboo.backend.global.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class S3Util {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;  // 버킷명

    private String[] directories = new String[]{ // 파일별 폴더 분류
        "story/",   // 소식 파일
        "tts/"      // 음성 파일
    };

    public String uploadFile(MultipartFile multipartFile, int code){

        // 메타데이터
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        // 고유한 파일명 생성
        String newFileName = makeFileName(directories[code], multipartFile.getOriginalFilename());

        // s3에 파일 업로드
        try {
            amazonS3.putObject(bucket, newFileName, multipartFile.getInputStream(), metadata);
        } catch (IOException e) {
            // TODO: s3 upload exception 처리
            throw new RuntimeException(e);
        }
        return amazonS3.getUrl(bucket, newFileName).toString();
    }

    // 파일명을 생성하는 메소드
    public String makeFileName(String directory, String fileName) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String time = sdf.format(new Date());
        return directory + time + "_" + fileName;
    }


}

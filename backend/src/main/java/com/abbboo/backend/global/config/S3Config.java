package com.abbboo.backend.global.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Value("${cloud.aws.s3.credentials.access-key}")  // IAM 사용자 액세스 키
    private String accessKey;

    @Value("${cloud.aws.s3.credentials.secret-key}")  // IAM 사용자 비밀 액세스 키
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")  // 버킷 리전
    private String region;

    // AmazonS3Client에 IAM 사용자 액세스 키, 버킷 리전 설정
    @Bean
    public AmazonS3 amazonS3Client() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        return AmazonS3ClientBuilder.standard()
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .withRegion(region)
            .build();
    }

}

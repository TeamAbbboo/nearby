package com.abbboo.backend.global.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    // Firebase 설정 경로
    @Value("${spring.firebase.path}")
    private String firebaseJsonPath;

    // Firebase Messaging 생성 메서드
    @Bean
    FirebaseMessaging firebaseMessaging() throws IOException {

        // Firebase App Instance 가져오기
        FirebaseApp firebaseApp = getFirebaseApp();

        // FirebaseMessaging Instance 반환
        return FirebaseMessaging.getInstance(firebaseApp);
    }

    // Firebase App Instance 가져오기 메서드
    private FirebaseApp getFirebaseApp() throws IOException {

        // Firebase SDK Key 가져오기
        ClassPathResource resource = new ClassPathResource(firebaseJsonPath);
        InputStream serviceAccountToken = resource.getInputStream();

        // Firebase Options 설정
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccountToken))
                .build();

        // Firebase App Instance 가져오기
        FirebaseApp firebaseApp = FirebaseApp.getApps().isEmpty() ?
                FirebaseApp.initializeApp(options) :
                FirebaseApp.getInstance();

        return firebaseApp;
    }
}

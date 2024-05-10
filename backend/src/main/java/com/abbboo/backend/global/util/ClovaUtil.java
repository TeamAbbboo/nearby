package com.abbboo.backend.global.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Component
@RequiredArgsConstructor
public class ClovaUtil {  // NAVER AI CLOVA VOICE Config

    @Value("${naver.client.id}")
    private String clientId;     // 고유 ID

    @Value("${naver.client.secret}")
    private String clientSecret;  // 고유 Secret

    @Value("${naver.client.request-url}")
    private String requestURL;   // request url

    // NAVER에 TTS로 변환할 파일 전송
    public MultipartFile createTTS(String content) throws IOException, URISyntaxException { // TODO : exception 처리 고민

        // HTTP 요청을 통해 content를 전송하기 위해서 URL 인코딩.
        String encodedText = URLEncoder.encode(content, StandardCharsets.UTF_8);

        // naver에 요청할 url 주소를 URL객체에 넣기.
        URI uri = new URI(requestURL);
        URL url = uri.toURL();

        // http 요청 헤더 설정, 데이터 전송을 위한 설정
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        // naver clova에서 요구하는 요청 형식 설정
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
        con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

        // 음성 합성음 옵션 설정 TODO: 추후에 음성 합성음 결정 후 옵션 조정 필요
        String voiceOptions = "speaker=nara&volume=0&speed=0&pitch=0";
        String postParams = "&format=mp3&text=" + encodedText;

        // 출력 가능 상태로 설정
        con.setDoOutput(true);
        // 출력 스트림에 데이터 쓰기
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(voiceOptions + postParams);
        wr.flush(); // 스트림을 전송
        wr.close();  // 자원 정리

        // 요청 후 받은 응답 처리
        int responseCode = con.getResponseCode();
        log.info("tts 파일 요청 응답 코드 : {}", responseCode);

        if (responseCode == HttpURLConnection.HTTP_OK) {  // 응답 코드 정상인 경우

            File ttsFile = getFile(con);
            log.info("File 타입 ttsFile 생성 완료 : {}", ttsFile);

            // File 타입을 multipartFile 타입으로 변환
            return convert(ttsFile);

        } else { // 오류 발생 시
            try (BufferedReader br = new BufferedReader(new InputStreamReader(con.getErrorStream()))) {
                StringBuilder responseError = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    responseError.append(line);
                }
                throw new IOException("Failed to retrieve MP3 from CLOVA TTS API: " + responseError);
            }
        }
    }

    // 응답 데이터 File 형태로 쓰기
    private static File getFile(HttpURLConnection con) throws IOException {

        // S3 업로드 로직에 고유 파일명 생성 과정이 있으므로 임시 파일명은 고정.
        File ttsFile = new File("tts.mp3");
        byte[] bytes = new byte[1024];

        // 응답 데이터(바이트 배열 형태의 음성 파일) 읽기
        InputStream is = con.getInputStream();

        // ttsFile에 응답 데이터 쓰기
        try (OutputStream outputStream = new FileOutputStream(ttsFile)) {
            int length = 0;
            while ((length = is.read(bytes)) != -1) {
                outputStream.write(bytes, 0, length);
            }
            is.close();
        }
        return ttsFile;
    }

    // File 타입을 multipartFile 타입으로 변환
    public static MultipartFile convert(File file) throws IOException {
        try (FileInputStream input = new FileInputStream(file)) {
            return new MockMultipartFile("convertFile", file.getName(), "audio/mpeg", input);
        }
    }
}

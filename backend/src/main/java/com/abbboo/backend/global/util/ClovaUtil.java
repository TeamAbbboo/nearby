package com.abbboo.backend.global.util;

import com.abbboo.backend.global.error.ErrorCode;
import com.abbboo.backend.global.error.exception.BadRequestException;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
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
    public MultipartFile createTTS(String content) { // TODO : exception 처리 고민

        // HTTP 요청을 통해 content를 전송하기 위해서 URL 인코딩.
        String encodedText = URLEncoder.encode(content, StandardCharsets.UTF_8);

        URI uri = null;
        URL url = null;
        try {
            // naver에 요청할 url 주소를 URL객체에 넣기.
            uri = new URI(requestURL);
            url = uri.toURL();
        } catch (URISyntaxException e) {
            throw new BadRequestException(ErrorCode.INVALID_URI);
        } catch (MalformedURLException e) {
            throw new BadRequestException(ErrorCode.INVALID_URL);
        }

        // http 요청 헤더 설정, 데이터 전송을 위한 설정
        HttpURLConnection con = null;
        try {
            log.info("clova API 요청 설정 시작");
            con = (HttpURLConnection) url.openConnection();
            // naver clova에서 요구하는 요청 형식 설정
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
            log.info("clova API 요청 설정 : http request 설정 성공");

            // 음성 합성음 옵션 설정 TODO: 추후에 음성 합성음 결정 후 옵션 조정 필요
            String voiceOptions = "speaker=nara&volume=0&speed=0&pitch=0";
            String postParams = "&format=mp3&text=" + encodedText;

            log.info("http 출력 스트림 쓰기 및 전송 시작");
            // 출력 가능 상태로 설정
            con.setDoOutput(true);
            // 출력 스트림에 데이터 쓰기
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(voiceOptions + postParams);
            wr.flush(); // 스트림을 전송
            wr.close();  // 자원 정리
            log.info("http 출력 스트림 쓰기 및 전송 완료");
        } catch (IOException e) {
            throw new BadRequestException(ErrorCode.REQUEST_CLOVA_SERVER);
        }

        // 요청 후 받은 응답 처리
        try {
            int responseCode = con.getResponseCode();
            log.info("tts 파일 요청 응답 코드 : {}", responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {  // 응답 코드 정상인 경우
                // 응답 바이너리 배열 데이터 multipart-file로 변환
                return getFile(con);
            }
            else { // 응답 오류 발생 시
                BufferedReader br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
                StringBuilder responseError = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    responseError.append(line);
                }
                log.info("ClovaUtil : CLOVA TTS API 통신 실패: {}", responseError);
                throw new IOException(String.valueOf(responseError));
            }
        } catch (IOException e) {
            throw new BadRequestException(ErrorCode.REQUEST_CLOVA_SERVER);
        }
    }

    // 응답 바이너리 배열 데이터 multipart-file로 변환
    private static MultipartFile getFile(HttpURLConnection con) {

        // 응답 데이터(바이트 배열 형태의 음성 파일) 읽기
        try (InputStream is = con.getInputStream()) {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] bytes = new byte[1024];  // 데이터를 특정 크기만큼 읽어서 저장하기 위한 배열

            int length = 0;
            while ((length = is.read(bytes)) != -1) {
                outputStream.write(bytes, 0, length);
            }
            is.close();

            // outputStream에 저장된 바이너리 데이터를 최종 바이트 배열로 반환
            byte[] results = outputStream.toByteArray();

            // S3 업로드 로직에 고유 파일명 생성 과정이 있으므로 임시 파일명은 고정.
            // 바이트 배열을 multipart-file로 변환.
            return new MockMultipartFile("tts", "tts.mp3", "audio/mpeg", results);
        }
        catch (IOException e) {
            log.info("ClovaUtil :: multipart-file 변환 실패");
            throw new BadRequestException(ErrorCode.CONVERT_FILE_IS_FAIL);
        }
    }
}

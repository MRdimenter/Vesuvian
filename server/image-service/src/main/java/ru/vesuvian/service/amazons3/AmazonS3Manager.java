package ru.vesuvian.service.amazons3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Component
public class AmazonS3Manager {
    final AmazonS3 s3client;
    @Getter
    @Value("${yandex-cloud.bucket-name}")
    String bucketName;

    public Resource getElementByPathAndFileName(String path, String fileName) {
        String key = path + "/" + fileName;
        S3Object s3object = s3client.getObject(new GetObjectRequest(bucketName, key));
        return getResourceFromS3Object(s3object);
    }

    public Resource getElementByPath(String path) {
        S3Object s3object = s3client.getObject(new GetObjectRequest(bucketName, path));
        return getResourceFromS3Object(s3object);
    }

    public List<String> getListObjectsInFolder(String path) {
        ListObjectsV2Request request = new ListObjectsV2Request()
                .withBucketName(bucketName)
                .withPrefix(path + "/");
        ListObjectsV2Result result = s3client.listObjectsV2(request);

        return result.getObjectSummaries().stream()
                .map(S3ObjectSummary::getKey)
                .collect(Collectors.toList());
    }


    private Resource getResourceFromS3Object(S3Object s3object) {
        return new InputStreamResource(s3object.getObjectContent());
    }


}

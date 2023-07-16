package ru.vesuvian.service.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DesignElementsService {
    final AmazonS3 s3client;
    @Value("${yandex-cloud.bucket-name}")
    String bucketName;
    @Value("${yandex-cloud.buckets.vesuvian-images.client.design-elements}")
    String pathDesignElementsClient;

    public Resource getRandomAvatar() {
        var random = new Random();
        // Выбрать случайный объект из списка
        int randomNameFile = random.nextInt(7) + 1;
        S3Object s3Object = s3client.getObject("vesuvian-images", "customers/avatars/" + randomNameFile + ".jpg");
        return new InputStreamResource(s3Object.getObjectContent());
    }

    public List<String> getListDesignElementNames(String page) {
        return listObjectsInFolder(pathDesignElementsClient + page);
    }

    public Resource getDesignElementByKey(String path, String fileName) {
        S3Object s3object = s3client.getObject(new GetObjectRequest(bucketName, pathDesignElementsClient + path + "/"  + fileName));
        return new InputStreamResource(s3object.getObjectContent());
    }

    private List<String> listObjectsInFolder(String folder) {
        ListObjectsV2Request request = new ListObjectsV2Request()
                .withBucketName("vesuvian-images")
                .withPrefix(folder + "/");
        ListObjectsV2Result result = s3client.listObjectsV2(request);

        return result.getObjectSummaries().stream()
                .map(S3ObjectSummary::getKey)
                .collect(Collectors.toList());
    }


}

package ru.vesuvian.images.service;

import org.springframework.beans.factory.annotation.Value;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import ru.vesuvian.images.amazons3.AmazonS3Manager;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DesignElementsService {
    @Value("${yandex-cloud.buckets.vesuvian-images.client.design-elements}")
    String pathDesignElements;
    final AmazonS3Manager amazonS3Manager;

    public List<String> getListDesignElementNames(String page) {
        return amazonS3Manager.getListObjectsInFolder(getFullPathDesignElements(page));
    }

    public Resource getDesignElementByKey(String folder, String fileName) {
        return amazonS3Manager.getElementByPathAndFileName(getFullPathDesignElements(folder), fileName);
    }

    public String getFullPathDesignElements(String folder) {
        return pathDesignElements + folder;
    }


//    public Resource getRandomAvatar() {
//        var random = new Random();
//        // Выбрать случайный объект из списка
//        int randomNameFile = random.nextInt(7) + 1;
//        S3Object s3Object = s3client.getObject("vesuvian-images", "customers/avatars/" + randomNameFile + ".jpg");
//        return new InputStreamResource(s3Object.getObjectContent());
//    }


}

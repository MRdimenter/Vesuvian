package ru.vesuvian.service.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vesuvian.service.service.ImageService;

import java.util.List;

@RestController()
@RequestMapping("api/v1/images")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping(
            value = "/avatar/random/get",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public Resource getRandomAvatarImage() {
        return imageService.getRandomAvatar();
    }

    @GetMapping("/client/design-elements/{page}/get")
    public List<String> getDesignElementNames(@PathVariable String page) {
        return imageService.getListDesignElementNames(page);
    }

    @GetMapping(
            value = "/client/design-elements/{path}/{fileName}",
            produces = MediaType.IMAGE_PNG_VALUE
    )
    public Resource getDesignElementByKey(@PathVariable String path, @PathVariable String fileName) {
        return imageService.getDesignElementByKey(path, fileName);
    }
}

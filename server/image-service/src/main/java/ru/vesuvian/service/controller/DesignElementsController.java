package ru.vesuvian.service.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vesuvian.service.service.DesignElementsService;

import java.util.List;

@RestController
@RequestMapping("api/v1/images/client/design_elements")
public class DesignElementsController {

    private final DesignElementsService imageService;


    public DesignElementsController(DesignElementsService imageService) {
        this.imageService = imageService;
    }

    @Operation(summary = "Get list of design element names", responses = {
            @ApiResponse(responseCode = "200", description = "List of design elements", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))})
    @GetMapping("/{page}/get")
    public List<String> getDesignElementNames(
            @Parameter(name = "page", description = "Page name", required = true, example = "homepage") @PathVariable String page) {
        return imageService.getListDesignElementNames(page);
    }

    @Operation(summary = "Get design element by key", responses = {
            @ApiResponse(responseCode = "200", description = "Design element", content = @Content(mediaType = "image/png", schema = @Schema(implementation = Resource.class)))})
    @GetMapping(value = "/{path}/{file_name}", produces = MediaType.IMAGE_PNG_VALUE)
    public Resource getDesignElementByKey(
            @Parameter(name = "path", description = "Page name", required = true, example = "homepage") @PathVariable String path,
            @Parameter(name = "file_name", description = "File name of the design element", required = true, example = "1.png") @PathVariable String file_name) {
        return imageService.getDesignElementByKey(path, file_name);
    }
}

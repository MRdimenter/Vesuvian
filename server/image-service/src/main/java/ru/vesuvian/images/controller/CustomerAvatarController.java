package ru.vesuvian.images.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vesuvian.images.service.AvatarProfileService;

@Tag(name = "Customer Avatar Controller", description = "Controller for handling user avatars")
@RestController
@RequestMapping("api/v1/images/avatars")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerAvatarController {
    final AvatarProfileService avatarProfileService;

    @Operation(summary = "Get user avatar by UUID", description = "Provides user's avatar found by their UUID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User avatar successfully found and returned"),
            @ApiResponse(responseCode = "404", description = "User avatar not found")
    })
    @GetMapping(value = "/{id}", produces = MediaType.IMAGE_PNG_VALUE)
    public Resource getCustomerAvatarById(@Parameter(description = "User's UUID", name = "id") @PathVariable String id) {
        return avatarProfileService.getCustomerAvatarByCustomerUUID(id);
    }
}

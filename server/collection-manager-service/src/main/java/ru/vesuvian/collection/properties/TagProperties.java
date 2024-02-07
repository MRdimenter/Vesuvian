package ru.vesuvian.collection.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "tag")
@Getter
@Setter
public class TagProperties {
    private Integer maxTagsInCollection;
}

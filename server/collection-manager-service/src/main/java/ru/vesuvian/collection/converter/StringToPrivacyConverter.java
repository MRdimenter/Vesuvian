package ru.vesuvian.collection.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.enums.Privacy;

@Component
public class StringToPrivacyConverter implements Converter<String, Privacy> {

    @Override
    public Privacy convert(String source) {
        return Privacy.valueOf(source.toUpperCase());
    }
}

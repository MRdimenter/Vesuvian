package ru.vesuvian.collection.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.repository.TagRepository;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TagService {
    final TagRepository tagRepository;


}




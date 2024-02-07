package ru.vesuvian.collection.exception.tag;

public class MaxTagsPerCollectionReachedException extends RuntimeException{
    public MaxTagsPerCollectionReachedException(String message) {
        super(message);
    }
}

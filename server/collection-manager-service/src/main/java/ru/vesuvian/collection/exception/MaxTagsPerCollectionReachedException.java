package ru.vesuvian.collection.exception;

public class MaxTagsPerCollectionReachedException extends RuntimeException{
    public MaxTagsPerCollectionReachedException(String message) {
        super(message);
    }
}

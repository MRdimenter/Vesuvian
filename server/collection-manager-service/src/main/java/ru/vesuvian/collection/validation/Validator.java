package ru.vesuvian.collection.validation;

public interface Validator<T, R> {

    void validate(T t);

    void validate(T t, R r);
}

package ru.vesuvian.service.security.error;


public enum ErrorCode {
    USER_EXISTS(409);
    private final int code;

    ErrorCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

}


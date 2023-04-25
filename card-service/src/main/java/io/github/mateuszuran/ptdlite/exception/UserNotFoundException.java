package io.github.mateuszuran.ptdlite.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("You have no permissions.");
    }
}
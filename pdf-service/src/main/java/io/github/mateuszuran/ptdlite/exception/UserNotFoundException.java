package io.github.mateuszuran.ptdlite.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() { super("User not found in csv file, please contact admin."); }
}

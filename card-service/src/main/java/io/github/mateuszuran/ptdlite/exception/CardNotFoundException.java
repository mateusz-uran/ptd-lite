package io.github.mateuszuran.ptdlite.exception;

public class CardNotFoundException extends RuntimeException {
    public CardNotFoundException() {
        super("Card not found.");
    }
}
package io.github.mateuszuran.ptdlite.exception;

public class CardEmptyException extends RuntimeException {
    public CardEmptyException() {
        super("Card is empty.");
    }
}

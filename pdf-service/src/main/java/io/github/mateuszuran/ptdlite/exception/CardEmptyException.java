package io.github.mateuszuran.ptdlite.exception;

public class CardEmptyException extends RuntimeException {
    public CardEmptyException() { super("Card's trips or fuels cannot be empty"); }
}

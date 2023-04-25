package io.github.mateuszuran.ptdlite.exception;

public class CsvFileException extends RuntimeException {
    public CsvFileException() {
        super("PDF cannot be generated, please try again later.");
    }
}

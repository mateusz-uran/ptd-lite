package io.github.mateuszuran.ptdlite.controller;

import io.github.mateuszuran.ptdlite.dto.PdfRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    @PostMapping("/generate")
    public ResponseEntity<?> generatePdf(@RequestBody PdfRequest pdfRequest) {
        showReceivedData(pdfRequest);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    void showReceivedData(PdfRequest pdfRequest) {
        log.info(String.valueOf(pdfRequest));
    }
}

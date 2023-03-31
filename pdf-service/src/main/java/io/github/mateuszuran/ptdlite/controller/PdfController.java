package io.github.mateuszuran.ptdlite.controller;

import io.github.mateuszuran.ptdlite.dto.PdfRequest;
import io.github.mateuszuran.ptdlite.service.PdfService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class PdfController {
    private final PdfService service;

    @PostMapping("/generate")
    public ResponseEntity<?> generatePdf(@RequestBody PdfRequest pdfRequest) throws IOException {
        service.gatherAllData(pdfRequest);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}

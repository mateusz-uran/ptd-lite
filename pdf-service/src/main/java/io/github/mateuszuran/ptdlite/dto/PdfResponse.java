package io.github.mateuszuran.ptdlite.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PdfResponse {
    private PdfCsvReader pdfCsvReader;
}

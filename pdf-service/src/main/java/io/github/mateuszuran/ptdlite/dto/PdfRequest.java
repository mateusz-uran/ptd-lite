package io.github.mateuszuran.ptdlite.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PdfRequest {
    private String number;
    private String username;
    private List<CardTrips> cardTripsList;
    private List<CardFuels> cardFuelsList;
}

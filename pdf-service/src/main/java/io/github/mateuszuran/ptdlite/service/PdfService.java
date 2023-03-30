package io.github.mateuszuran.ptdlite.service;

import io.github.mateuszuran.ptdlite.dto.CardFuels;
import io.github.mateuszuran.ptdlite.dto.CardTrips;
import io.github.mateuszuran.ptdlite.dto.Counters;
import io.github.mateuszuran.ptdlite.dto.PdfRequest;
import org.springframework.stereotype.Service;

@Service
public class PdfService {

    public Counters calculateCounters(PdfRequest pdfRequest) {
        var firstCounterFromCard = pdfRequest.getCardTripsList().stream().mapToInt(CardTrips::getCounterStart).min()
                .orElseThrow(IllegalArgumentException::new);
        var lastCounterFromCard = pdfRequest.getCardTripsList().stream().mapToInt(CardTrips::getCounterEnd).max()
                .orElseThrow(IllegalArgumentException::new);

        var sumMileage = pdfRequest.getCardTripsList().stream().mapToInt(CardTrips::getCarMileage).sum();

        var cardRefuelingAmount = pdfRequest.getCardFuelsList().stream().mapToInt(CardFuels::getRefuelingAmount).sum();

        return Counters.builder()
                .firstCounter(firstCounterFromCard)
                .lastCounter(lastCounterFromCard)
                .mileage(sumMileage)
                .refuelingSum(cardRefuelingAmount)
                .build();
    }
}

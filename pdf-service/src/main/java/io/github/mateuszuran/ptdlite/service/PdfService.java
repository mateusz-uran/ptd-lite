package io.github.mateuszuran.ptdlite.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import io.github.mateuszuran.ptdlite.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PdfService {

    private static final String cloudinaryUrl = "https://res.cloudinary.com/dzwnsabwr/raw/upload/v1680186582/test_omlqwp.csv";

    public List<PdfCsvReader> getFileAgain() throws IOException {
        URL url = new URL(cloudinaryUrl);
        InputStreamReader reader = new InputStreamReader(url.openStream(), StandardCharsets.UTF_8);
        CsvToBean<PdfCsvReader> csvToBean = new CsvToBeanBuilder<PdfCsvReader>(reader)
                .withType(PdfCsvReader.class)
                .withSeparator(';')
                .withSkipLines(1)
                .build();
        return csvToBean.stream().collect(Collectors.toList());
    }

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

    public PdfCsvReader getUserInformation(String username) throws IOException {
        return getFileAgain().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Username not found"));
    }

    public String gatherAllData(PdfRequest pdfRequest) throws IOException {
        var userInfo = getUserInformation(pdfRequest.getUsername());
        log.info(String.valueOf(userInfo));
        var counterInfo = calculateCounters(pdfRequest);
        log.info(String.valueOf(counterInfo));
        return "PDF";
    }
}

package io.github.mateuszuran.ptdlite.controller;

import io.github.mateuszuran.ptdlite.dto.request.CardRequest;
import io.github.mateuszuran.ptdlite.dto.response.CardResponse;
import io.github.mateuszuran.ptdlite.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlite.dto.response.TripResponse;
import io.github.mateuszuran.ptdlite.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/card")
@RequiredArgsConstructor
public class CardController {
    private final CardService service;

    @GetMapping("/all")
    public ResponseEntity<List<CardResponse>> getCardsByMonth(
            @RequestParam String username, @RequestParam int year, @RequestParam int month) {
        return ResponseEntity.ok().body(service.getAllCardByUserAndDate(username, year, month));
    }

    @PostMapping("/add")
    public ResponseEntity<?> saveCard(@RequestBody CardRequest cardRequest, @RequestParam int year, @RequestParam int month, @RequestParam int dayOfMonth) {
        return ResponseEntity.ok().body(service.saveCard(cardRequest, year, month, dayOfMonth));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam Long cardId) {
        service.deleteCard(cardId);
        return ResponseEntity.ok().body(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/fuel")
    public ResponseEntity<List<FuelResponse>> getFuelsFromCard(@RequestParam Long id) {
        return ResponseEntity.ok()
                .body(service.getFuelsFromCard(id));
    }

    @GetMapping("/trip")
    public ResponseEntity<List<TripResponse>> getTripsFromCard(@RequestParam Long id) {
        return ResponseEntity.ok()
                .body(service.getTripsFromCard(id));
    }
}

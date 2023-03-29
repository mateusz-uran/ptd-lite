package io.github.mateuszuran.ptdlite.controller;

import io.github.mateuszuran.ptdlite.dto.request.TripRequest;
import io.github.mateuszuran.ptdlite.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip")
@RequiredArgsConstructor
public class TripController {
    private final TripService service;

    @PostMapping
    public ResponseEntity<?> addTripsList(@RequestBody List<TripRequest> trips, @RequestParam Long cardId) {
        service.addManyTips(trips, cardId);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll(@RequestBody List<Long> selectedTripId) {
        service.deleteSelected(selectedTripId);
        return ResponseEntity.ok().body(HttpStatus.NO_CONTENT);
    }
}

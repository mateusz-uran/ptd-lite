package io.github.mateuszuran.ptdlite.controller;

import io.github.mateuszuran.ptdlite.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlite.service.FuelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fuel")
@RequiredArgsConstructor
public class FuelController {
    private final FuelService fuelService;

    @PostMapping
    public ResponseEntity<?> addFuel(@RequestBody FuelRequest fuelDto, @RequestParam Long id) {
        fuelService.addRefuelling(fuelDto, id);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestParam Long id) {
        fuelService.delete(id);
        return ResponseEntity.ok().body(HttpStatus.NO_CONTENT);
    }
}

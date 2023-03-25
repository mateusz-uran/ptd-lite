package io.github.mateuszuran.ptdlite.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/card")
public class CardController {

    @GetMapping("/live")
    public ResponseEntity<String> getTestValue() {
        return ResponseEntity.ok().body("Hello there");
    }
}

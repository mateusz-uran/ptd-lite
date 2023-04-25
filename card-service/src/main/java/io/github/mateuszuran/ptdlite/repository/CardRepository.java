package io.github.mateuszuran.ptdlite.repository;

import io.github.mateuszuran.ptdlite.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    boolean existsByNumberAndUsername(String number, String username);

    Optional<Card> findById(Long id);

    List<Card> findAllByUsernameAndCreationTimeBetween(String username, LocalDateTime start, LocalDateTime end);
}

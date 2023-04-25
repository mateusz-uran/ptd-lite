package io.github.mateuszuran.ptdlite.repository;

import io.github.mateuszuran.ptdlite.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, Long> {
}

package io.github.mateuszuran.ptdlite.service;

import io.github.mateuszuran.ptdlite.dto.request.TripRequest;
import io.github.mateuszuran.ptdlite.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlite.mapper.TripMapper;
import io.github.mateuszuran.ptdlite.model.Trip;
import io.github.mateuszuran.ptdlite.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {
    private final CardService service;
    private final TripRepository repository;
    private final TripMapper tripMapper;

    public void addManyTips(List<TripRequest> trips, Long cardId) {
        var card = service.checkIfCardExists(cardId);

        List<Trip> tripsToSave = new ArrayList<>();
        trips.forEach(
                tripValues -> {
                    var trip = tripMapper.mapToTripValuesWithModelMapper(tripValues);
                    trip.setCarMileage(calculateCarMileage(tripValues.getCounterStart(), tripValues.getCounterEnd()));
                    trip.setCard(card);
                    tripsToSave.add(trip);
                }
        );
        repository.saveAll(tripsToSave);
    }

    public void deleteSelected(List<Long> selectedTrips) {
        var result = repository.findAllById(selectedTrips);
        repository.deleteAll(result);
    }

    private Integer calculateCarMileage(Integer min, Integer max) {
        return max - min;
    }

}

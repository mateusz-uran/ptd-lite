package io.github.mateuszuran.ptdlite.mapper;

import io.github.mateuszuran.ptdlite.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlite.dto.request.TripRequest;
import io.github.mateuszuran.ptdlite.dto.response.TripResponse;
import io.github.mateuszuran.ptdlite.model.Trip;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripMapper {
    private final ModelMapperConfig mapper;

    public TripResponse mapToTripResponseWithModelMapper(Trip trip) {
        return mapper.modelMapper().map(trip, TripResponse.class);
    }

    public Trip mapToTripValuesWithModelMapper(TripRequest tripValues) {
        return mapper.modelMapper().map(tripValues, Trip.class);
    }
}

package io.github.mateuszuran.ptdlite.mapper;

import io.github.mateuszuran.ptdlite.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlite.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlite.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlite.model.Fuel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FuelMapper {
    private final ModelMapperConfig mapper;

    public FuelResponse mapToFuelResponseWithModelMapper(Fuel fuel) {
        return mapper.modelMapper().map(fuel, FuelResponse.class);
    }

    public Fuel mapToFuelRequest(FuelRequest fuelRequest) {
        return mapper.modelMapper().map(fuelRequest, Fuel.class);
    }
}

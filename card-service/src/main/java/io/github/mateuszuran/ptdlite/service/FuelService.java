package io.github.mateuszuran.ptdlite.service;

import io.github.mateuszuran.ptdlite.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlite.mapper.FuelMapper;
import io.github.mateuszuran.ptdlite.repository.FuelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FuelService {
    private final CardService service;
    private final FuelMapper fuelMapper;
    private final FuelRepository repository;

    public void addRefuelling(FuelRequest fuelDto, Long id) {
        var card = service.checkIfCardExists(id);
        var fuel = fuelMapper.mapToFuelRequest(fuelDto);
        fuel.setCard(card);
        repository.save(fuel);
    }

    public void delete(Long id) {
        repository.findById(id)
                .ifPresent(fuel -> {
                    repository.deleteById(fuel.getId());
                });
    }
}

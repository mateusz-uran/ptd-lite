package io.github.mateuszuran.ptdlite.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FuelResponse {
    private Long id;
    private String refuelingDate;
    private String refuelingLocation;
    private Integer vehicleCounter;
    private Integer refuelingAmount;
}

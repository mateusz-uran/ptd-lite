package io.github.mateuszuran.ptdlite.dto;

import com.opencsv.bean.CsvBindByPosition;
import lombok.Data;

@Data
public class PdfCsvReader {
    @CsvBindByPosition(position = 0)
    private String username;
    @CsvBindByPosition(position = 1)
    private String truckModel;
    @CsvBindByPosition(position = 2)
    private String truckType;
    @CsvBindByPosition(position = 3)
    private String truckLicencePlate;
    @CsvBindByPosition(position = 4)
    private String truckLeftTankFuelCapacity;
    @CsvBindByPosition(position = 5)
    private String truckRightTankFuelCapacity;
    @CsvBindByPosition(position = 6)
    private String truckFullTankCapacity;
    @CsvBindByPosition(position = 7)
    private String truckAdBlueCapacity;
}

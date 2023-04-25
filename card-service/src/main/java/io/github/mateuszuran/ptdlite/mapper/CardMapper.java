package io.github.mateuszuran.ptdlite.mapper;

import io.github.mateuszuran.ptdlite.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlite.dto.response.CardResponse;
import io.github.mateuszuran.ptdlite.model.Card;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class CardMapper {
    private final ModelMapperConfig mapper;

    public CardResponse mapToCardResponseWithModelMapper(Card card) {
        return mapper.modelMapper().map(card, CardResponse.class);
    }

    public CardResponse mapToCardResponseWithFormattedCreationTime(Card card) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedTime = card.getCreationTime().format(formatter);
        CardResponse response = mapper.modelMapper().map(card, CardResponse.class);
        response.setCreationTime(formattedTime);
        return response;
    }
}

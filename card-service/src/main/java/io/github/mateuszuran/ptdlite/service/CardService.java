package io.github.mateuszuran.ptdlite.service;

import io.github.mateuszuran.ptdlite.dto.CardRequest;
import io.github.mateuszuran.ptdlite.dto.CardResponse;
import io.github.mateuszuran.ptdlite.exception.CardEmptyException;
import io.github.mateuszuran.ptdlite.exception.CardExistsException;
import io.github.mateuszuran.ptdlite.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlite.mapper.CardMapper;
import io.github.mateuszuran.ptdlite.model.Card;
import io.github.mateuszuran.ptdlite.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardRepository repository;
    private final CardMapper mapper;

    public CardResponse saveCard(CardRequest cardRequest, int year, int month, int dayOfMonth) {
        if (repository.existsByNumberAndUsername(cardRequest.getNumber(), cardRequest.getUsername())) {
            throw new CardExistsException(cardRequest.getNumber());
        }

        if (cardRequest.getNumber().isEmpty()) {
            throw new CardEmptyException();
        }

        var now = LocalDateTime.now();
        var date = LocalDateTime.of(year, month, dayOfMonth, now.getHour(), now.getMinute(), now.getSecond());
        var card = Card.builder()
                .number(cardRequest.getNumber())
                .username(cardRequest.getUsername())
                .creationTime(date)
                .build();
        repository.save(card);

        return mapper.mapToCardResponseWithFormattedCreationTime(card);
    }

    public List<CardResponse> getAllCardByUserAndDate(String username, int year, int month) {
        var actualDate = LocalDate.of(year, month, 1);

        LocalDateTime startDate = actualDate.with(firstDayOfMonth()).atStartOfDay();
        LocalDateTime endDate = actualDate.with(lastDayOfMonth()).atStartOfDay();

        var result = repository.findAllByUsernameAndCreationTimeBetween(username, startDate, endDate);
        return result.stream().map(mapper::mapToCardResponseWithFormattedCreationTime)
                .sorted(Comparator.comparing(CardResponse::getCreationTime).reversed())
                .toList();
    }

    public void deleteCard(Long cardId) {
        repository.findById(cardId).ifPresentOrElse(
                (card) -> repository.deleteById(card.getId()),
                () -> {
                    throw new CardNotFoundException();
                });
    }

}

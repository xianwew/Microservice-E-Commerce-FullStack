package com.example.XianweiECommerce.mapper;
import com.example.XianweiECommerce.dto.CardDTO;
import com.example.XianweiECommerce.model.Card;

public class CardMapper {
    public static CardDTO toDTO(Card card) {
        CardDTO dto = new CardDTO();
        dto.setId(card.getId());
        dto.setUserId(card.getUser().getId());
        dto.setType(card.getType());
        dto.setCardNumber(card.getCardNumber());
        dto.setExpirationDate(card.getExpirationDate());
        dto.setCardholderName(card.getCardholderName());
        dto.setBillingAddress(card.getBillingAddress());
        return dto;
    }

    public static Card toEntity(CardDTO cardDTO) {
        Card card = new Card();
        card.setType(cardDTO.getType());
        card.setCardNumber(cardDTO.getCardNumber());
        card.setExpirationDate(cardDTO.getExpirationDate());
        card.setCardholderName(cardDTO.getCardholderName());
        card.setBillingAddress(cardDTO.getBillingAddress());
        return card;
    }
}


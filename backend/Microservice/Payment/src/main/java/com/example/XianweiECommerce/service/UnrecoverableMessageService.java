package com.example.XianweiECommerce.service;

import com.example.XianweiECommerce.model.FailedMessage;
import com.example.XianweiECommerce.repository.FailedMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnrecoverableMessageService {

    @Autowired
    private FailedMessageRepository failedMessageRepository;

    public void saveUnrecoverableMessage(String topic, String message, String error) {
        FailedMessage failedMessage = new FailedMessage();
        failedMessage.setTopic(topic);
        failedMessage.setMessage(message);
        failedMessage.setError(error);
        failedMessageRepository.save(failedMessage);
    }
}

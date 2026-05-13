package org.inventrfid.backend.util;

import org.springframework.integration.annotation.MessagingGateway;

@MessagingGateway(defaultRequestChannel = "mqttInputChannel")
public interface MqttGateway {
    void sendToMqtt(String message);
}


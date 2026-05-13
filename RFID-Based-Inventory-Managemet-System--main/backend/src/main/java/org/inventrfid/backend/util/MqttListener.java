package org.inventrfid.backend.util;

import org.inventrfid.backend.service.StockService;
import org.inventrfid.backend.service.ReleaseService;
import org.inventrfid.backend.service.TutorialHandler;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.stereotype.Service;

@Service
public class MqttListener {

    private final StockService stockService;
    private final ReleaseService releaseService;
    private final TutorialHandler tutorialHandler;

    public MqttListener(StockService stockService, ReleaseService releaseService, TutorialHandler tutorialHandler) {
        this.stockService = stockService;
        this.releaseService = releaseService;
        this.tutorialHandler = tutorialHandler;
    }

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleMessage(String message) {

        if (message.startsWith("STK")) {
            System.out.println("Message received: " + message);
            try {
                if (stockService.doesStockExist(message)) {
                    releaseService.createRelease(message);
                    System.out.println("New Release created for RFID: " + message);

                    // Send update to frontend
                    tutorialHandler.broadcastMessage("New Release created: " + message);
                } else {
                    stockService.createStockFromMqtt(message);
                    System.out.println("New Stock created with RFID: " + message);

                    // Send update to frontend
                    tutorialHandler.broadcastMessage("New Stock created: " + message);
                }
            } catch (RuntimeException e) {
                System.err.println("Error processing message: " + e.getMessage());
            }
        } else {
            System.out.println("Unknown message received: " + message);
        }
    }
}

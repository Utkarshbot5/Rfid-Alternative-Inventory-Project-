package org.inventrfid.backend.service;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.CopyOnWriteArraySet;

@Slf4j
public class TutorialHandler implements WebSocketHandler {

    // Thread-safe set to store active WebSocket sessions
    private final CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        log.info("Connection established on session: {}", session.getId());
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String tutorial = (String) message.getPayload();
        log.info("Message: {}", tutorial);
        session.sendMessage(new TextMessage("Started processing tutorial: " + tutorial));
        Thread.sleep(1000);
        session.sendMessage(new TextMessage("Completed processing tutorial: " + tutorial));
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("Exception occurred: {} on session: {}", exception.getMessage(), session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        sessions.remove(session);
        log.info("Connection closed on session: {} with status: {}", session.getId(), closeStatus.getCode());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    // Method to send a message to all connected clients
    public void broadcastMessage(String message) {
        for (WebSocketSession session : sessions) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (Exception e) {
                log.error("Failed to send message to session {}: {}", session.getId(), e.getMessage());
            }
        }
    }
}

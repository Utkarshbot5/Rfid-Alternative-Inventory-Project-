package org.inventrfid.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@Entity
public class Stock {

    @Id
    private String rfid;

    @ManyToOne
    @JoinColumn(name ="ProductID", nullable = true)
    private Product product;

    @Column(name = "Timestamp", nullable = true)
    private java.util.Date timestamp;

    @Column(name = "Quantity", nullable = true)
    private int Quantity;

    @Column(name = "stockPrice", nullable = true)
    private java.math.BigDecimal stockPrice;

    @Column(name = "Profit", nullable = true)
    private java.math.BigDecimal profit;

}

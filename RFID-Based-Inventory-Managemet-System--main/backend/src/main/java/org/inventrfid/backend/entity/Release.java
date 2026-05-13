package org.inventrfid.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;



@Setter
@Getter
@Entity
@Table(name = "Releases")
public class Release {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "stockId", nullable = false)
    private Stock stock;

    @Column(name = "Timestamp", nullable = true)
    private java.util.Date timestamp;

    @Column(name = "releaseQuantity", nullable = true)
    private int releaseQuantity;

    @Column(name = "releasePrice", nullable = true)
    private java.math.BigDecimal releasePrice;

    @Column(name = "Profit", nullable = true)
    private java.math.BigDecimal profit;



    // Getters and Setters


}


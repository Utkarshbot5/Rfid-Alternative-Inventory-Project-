package org.inventrfid.backend.entity;

// Product Entity
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;

    @Column(name = "productName", nullable = false)
    private String productName;

    @Column(name = "Profit", nullable = true)
    private java.math.BigDecimal profit;

}
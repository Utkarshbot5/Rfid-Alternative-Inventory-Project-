package org.inventrfid.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
public class ProductDetailsDTO {
    private int productId;
    private String productName;
    private int totalStocks;
    private int totalReleases;
    private int stockQuantity;
    private int releaseQuantity;
    private BigDecimal profit;

    public ProductDetailsDTO(int productId, String productName, int totalStocks, int totalReleases,
                            int stockQuantity, int releaseQuantity, BigDecimal profit) {
        this.productId = productId;
        this.productName = productName;
        this.totalStocks = totalStocks;
        this.totalReleases = totalReleases;
        this.stockQuantity = stockQuantity;
        this.releaseQuantity = releaseQuantity;
        this.profit = profit;
    }

    // Getters and Setters
}


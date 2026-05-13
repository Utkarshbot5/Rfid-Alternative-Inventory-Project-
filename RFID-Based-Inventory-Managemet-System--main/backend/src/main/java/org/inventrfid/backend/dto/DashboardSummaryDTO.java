package org.inventrfid.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
public class DashboardSummaryDTO {
    private long totalProducts;
    private int totalStockQuantity;
    private int totalReleaseUnits;
    private BigDecimal totalPurchasePrice;
    private BigDecimal totalRevenue;
    private BigDecimal totalProfit;

    public DashboardSummaryDTO(long totalProducts, int totalStockQuantity, int totalReleaseUnits,
                               BigDecimal totalPurchasePrice, BigDecimal totalRevenue, BigDecimal totalProfit) {
        this.totalProducts = totalProducts;
        this.totalStockQuantity = totalStockQuantity;
        this.totalReleaseUnits = totalReleaseUnits;
        this.totalPurchasePrice = totalPurchasePrice;
        this.totalRevenue = totalRevenue;
        this.totalProfit = totalProfit;
    }

}


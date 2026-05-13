package org.inventrfid.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
public class StockDTO {

    private String rfid;
    private int productId;
    private Date timestamp;
    private int quantity;
    private BigDecimal stockPrice;
    private BigDecimal profit;

}


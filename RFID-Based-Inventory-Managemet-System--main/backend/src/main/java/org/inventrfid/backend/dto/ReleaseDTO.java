package org.inventrfid.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
public class ReleaseDTO {

    private Long transactionId;
    private String rfid;
    private int releaseQuantity;
    private BigDecimal releasePrice;
    private Date timestamp;
    private BigDecimal profit;

}

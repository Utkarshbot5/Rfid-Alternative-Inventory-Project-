package org.inventrfid.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

// ProductDTO
@Setter
@Getter
public class ProductDTO {

    private int pid;
    private String productName;
    private BigDecimal profit;

}

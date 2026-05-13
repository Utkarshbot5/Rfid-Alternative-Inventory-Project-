package org.inventrfid.backend.controller;

import org.inventrfid.backend.dto.StockDTO;
import org.inventrfid.backend.entity.Stock;
import org.inventrfid.backend.service.ProductService;
import org.inventrfid.backend.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;
    @Autowired
    private ProductService productService;

    // Get all stocks
    @GetMapping
    public ResponseEntity<List<StockDTO>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    // Get stock by RFID
    @GetMapping("/{rfid}")
    public StockDTO getStockByRfid(@PathVariable String rfid) {
        Stock stock = stockService.getStockByRfid(rfid).orElseThrow(() -> new RuntimeException("Stock not found"));
        return stockService.mapToDto(stock);
    }

    // Update stock
    @PutMapping("/{rfid}")
    public StockDTO updateStock(@PathVariable String rfid, @RequestBody StockDTO stockDTO) {
        Stock updatedStock = stockService.updateStock(rfid, stockDTO.getQuantity(), stockDTO.getProductId(), stockDTO.getStockPrice());
        return stockService.mapToDto(updatedStock);
    }

    // Delete stock
    @DeleteMapping("/{rfid}")
    public void deleteStock(@PathVariable String rfid) {
        stockService.deleteStock(rfid);
    }


    // Get the last stock item
    @GetMapping("/last")
    public StockDTO getLastStock() {
        Stock stock = stockService.getLastStock();
        return stockService.mapToDto(stock);
    }
}
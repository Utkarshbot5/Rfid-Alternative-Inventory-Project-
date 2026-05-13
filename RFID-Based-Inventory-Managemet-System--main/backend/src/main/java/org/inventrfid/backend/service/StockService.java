package org.inventrfid.backend.service;

import org.inventrfid.backend.dto.StockDTO;
import org.inventrfid.backend.entity.Product;
import org.inventrfid.backend.entity.Stock;
import org.inventrfid.backend.repository.ProductRepository;
import org.inventrfid.backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private ProductRepository productRepository;

    // Method to create a new stock when an MQTT message is received
    public Stock createStockFromMqtt(String rfid) {
        Stock stock = new Stock();

        stock.setRfid(rfid);
        stock.setStockPrice(BigDecimal.valueOf(0));
        stock.setQuantity(0);// Default stock price as 0
        stock.setTimestamp(new Date());

        return stockRepository.save(stock);
    }

    public boolean doesStockExist(String rfid) {
        return stockRepository.findByRfid(rfid) != null;
    }

    // Method to get a stock by RFID
    public Optional<Stock> getStockByRfid(String rfid) {
        return Optional.ofNullable(stockRepository.findByRfid(rfid));
    }

    public Stock updateStock(String rfid, int quantity, int productID, BigDecimal stockPrice) {
        Stock stock = stockRepository.findByRfid(rfid);
        if (stock != null) {
            // Get the product, throwing a custom exception if not found
            Product product = productRepository.findById(productID)
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productID));

            stock.setQuantity(quantity);
            stock.setProduct(product);
            stock.setStockPrice(stockPrice);
            stock.setProfit(BigDecimal.valueOf(0));
            //stock.setTimestamp(new Date());  // Update timestamp when stock is updated
            return stockRepository.save(stock);
        } else {
            throw new RuntimeException("Stock not found with RFID: " + rfid);
        }
    }


    // Method to delete a stock by RFID
    public void deleteStock(String rfid) {
        Stock stock = stockRepository.findByRfid(rfid);
        if (stock != null) {
            stockRepository.delete(stock);
        } else {
            throw new RuntimeException("Stock not found with RFID: " + rfid);
        }
    }

    // Method to get all stocks
    public List<StockDTO> getAllStocks() {
        return stockRepository.findAll().stream()
                .filter(stock -> stock.getProduct() != null)
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Convert Stock entity to StockDTO
    public StockDTO mapToDto(Stock stock) {
        StockDTO stockDTO = new StockDTO();
        stockDTO.setRfid(stock.getRfid());
        // Add check for null Product
        if (stock.getProduct() != null) {
            stockDTO.setProductId(stock.getProduct().getPid());
        } else {
            stockDTO.setProductId(0);  // Or handle it as required
        }

        stockDTO.setTimestamp(stock.getTimestamp());
        stockDTO.setQuantity(stock.getQuantity());
        stockDTO.setStockPrice(stock.getStockPrice());
        stockDTO.setProfit(stock.getProfit());
        return stockDTO;
    }


    // Method to get the last stock item
    public Stock getLastStock() {
        return stockRepository.findTopByOrderByTimestampDesc();
    }
//    public Stock getLastStock() {
//        return stockRepository.findLastStock();
//    }

}



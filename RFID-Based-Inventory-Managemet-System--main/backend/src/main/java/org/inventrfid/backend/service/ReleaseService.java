package org.inventrfid.backend.service;

import org.inventrfid.backend.dto.ReleaseDTO;
import org.inventrfid.backend.entity.Product;
import org.inventrfid.backend.entity.Release;
import org.inventrfid.backend.entity.Stock;
import org.inventrfid.backend.repository.ProductRepository;
import org.inventrfid.backend.repository.ReleaseRepository;
import org.inventrfid.backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ReleaseService {


    @Autowired
    private final ReleaseRepository releaseRepository;
    @Autowired
    private final StockRepository stockRepository;
    @Autowired
    private final ProductRepository productRepository;

    public ReleaseService(ReleaseRepository releaseRepository, StockRepository stockRepository, ProductRepository productRepository) {
        this.releaseRepository = releaseRepository;
        this.stockRepository = stockRepository;
        this.productRepository = productRepository;
    }

    public Release createRelease(String rfid) {
        Stock stock = stockRepository.findByRfid(rfid);
        Release release = new Release();
        release.setStock(stock);
        release.setProfit(BigDecimal.valueOf(0));
        release.setReleasePrice(BigDecimal.valueOf(0));
        release.setReleaseQuantity(0);
        release.setTimestamp(new Date());
        return releaseRepository.save(release);
    }

    public Release updateRelease(Long transactionId, int releaseQuantity, BigDecimal releasePrice) {
        // Fetch the release by transaction ID
        Release release = releaseRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Release not found with Transaction ID: " + transactionId));

        // Fetch the associated stock by stock ID from the release
        Stock stock = stockRepository.findById(release.getStock().getRfid())
                .orElseThrow(() -> new RuntimeException("Stock not found with Stock ID: " + release.getStock().getRfid()));

        Product product = productRepository.findById(stock.getProduct().getPid())
                .orElseThrow(() -> new RuntimeException("Product not found with Product ID: " + stock.getProduct().getPid()));

        // Check if the new release quantity exceeds the available stock
        int stockAvailable = stock.getQuantity();
        int currentReleaseQuantity = release.getReleaseQuantity();

        // Calculate the net change in release quantity
        int quantityDifference = releaseQuantity - currentReleaseQuantity;

        if (quantityDifference > stockAvailable) {
            throw new RuntimeException("Insufficient stock to update the release. Available stock: " + stockAvailable);
        }

        // Update the stock quantity
        stock.setQuantity(stockAvailable - quantityDifference);

        //Update the profit per stock
        BigDecimal stockPrice = stock.getStockPrice();
        BigDecimal currentProfitInStock = stock.getProfit();
        BigDecimal currentProfitInProduct = product.getProfit();
        BigDecimal currentProfitInRelease = release.getProfit();
        BigDecimal quantityDifferenceDec = BigDecimal.valueOf(quantityDifference);
        BigDecimal priceDifference = releasePrice.subtract(stockPrice);
        BigDecimal profit = quantityDifferenceDec.multiply(priceDifference);

        //Update the profit per product
        product.setProfit(currentProfitInProduct.add(profit));

        //Update the profit per stock
        stock.setProfit(currentProfitInStock.add(profit));

        // Update the release details
        release.setReleaseQuantity(releaseQuantity);
        release.setReleasePrice(releasePrice);
        release.setProfit(currentProfitInRelease.add(profit));

        productRepository.save(product);
        stockRepository.save(stock);
        return releaseRepository.save(release);
    }


    public List<ReleaseDTO> getAll() {
        List<Release> releases = releaseRepository.findAll();
        return releases.stream()
                .filter(release -> release.getReleaseQuantity() > 0)
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public Optional<Release> getById(Long id) {
        return Optional.ofNullable(releaseRepository.findByTransactionId(id));
    }

    public void deleteRelease(Long id) {
        // Fetch the release by ID
        Release release = releaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Release not found with ID: " + id));

        // Fetch the associated stock by stock ID from the release
        Stock stock = stockRepository.findById(release.getStock().getRfid())
                .orElseThrow(() -> new RuntimeException("Stock not found with Stock ID: " + release.getStock().getRfid()));

        //Fetch the associated product
        Product product = productRepository.findById(stock.getProduct().getPid())
                .orElseThrow(() -> new RuntimeException("Product not found with Product ID: " + stock.getProduct().getPid()));


        // Restore the release quantity back to the stock
        stock.setQuantity(stock.getQuantity() + release.getReleaseQuantity());

        //Restore the gained profit back to the stock and product
        stock.setProfit(stock.getProfit().subtract(release.getProfit()));
        product.setProfit(product.getProfit().subtract(release.getProfit()));

        stockRepository.save(stock);
        productRepository.save(product);

        // Delete the release
        releaseRepository.delete(release);
    }


    public Release getLastRelease() {
        return releaseRepository.findTopByOrderByTimestampDesc();
    }

    public ReleaseDTO mapToDto(Release release) {
        ReleaseDTO dto = new ReleaseDTO();
        dto.setTransactionId(release.getTransactionId());
        dto.setReleaseQuantity(release.getReleaseQuantity());
        dto.setReleasePrice(release.getReleasePrice());
        dto.setTimestamp(release.getTimestamp());
        dto.setProfit(release.getProfit());
        dto.setRfid(release.getStock() != null ? release.getStock().getRfid() : null);
        return dto;
    }

}




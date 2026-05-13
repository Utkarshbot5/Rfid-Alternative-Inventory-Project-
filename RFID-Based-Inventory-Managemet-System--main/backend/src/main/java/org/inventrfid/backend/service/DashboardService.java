package org.inventrfid.backend.service;

import org.inventrfid.backend.dto.DashboardSummaryDTO;
import org.inventrfid.backend.dto.ProductDetailsDTO;
import org.inventrfid.backend.entity.Product;
import org.inventrfid.backend.entity.Release;
import org.inventrfid.backend.entity.Stock;
import org.inventrfid.backend.repository.ProductRepository;
import org.inventrfid.backend.repository.ReleaseRepository;
import org.inventrfid.backend.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final StockRepository stockRepository;
    private final ReleaseRepository releaseRepository;
    private final ProductRepository productRepository;

    public DashboardService(StockRepository stockRepository, ReleaseRepository releaseRepository, ProductRepository productRepository) {
        this.stockRepository = stockRepository;
        this.releaseRepository = releaseRepository;
        this.productRepository = productRepository;
    }

    public DashboardSummaryDTO getDashboardSummary() {
        // Calculate total products
        long totalProducts = productRepository.count();

        // Calculate total stock quantity and purchase price (only stocks with quantity > 0)
        List<Stock> stocks = stockRepository.findAll();
        int totalStockQuantity = stocks.stream()
                .filter(stock -> stock.getQuantity() > 0) // Filter stocks with quantity > 0
                .mapToInt(Stock::getQuantity)
                .sum();
        BigDecimal totalPurchasePrice = stocks.stream()
                .filter(stock -> stock.getQuantity() > 0) // Filter stocks with quantity > 0
                .map(stock -> stock.getStockPrice().multiply(BigDecimal.valueOf(stock.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calculate total release units and total revenue (only releases with quantity > 0)
        List<Release> releases = releaseRepository.findAll();
        int totalReleaseUnits = releases.stream()
                .filter(release -> release.getReleaseQuantity() > 0) // Filter releases with quantity > 0
                .mapToInt(Release::getReleaseQuantity)
                .sum();
        BigDecimal totalRevenue = releases.stream()
                .filter(release -> release.getReleaseQuantity() > 0) // Filter releases with quantity > 0
                .map(release -> release.getReleasePrice().multiply(BigDecimal.valueOf(release.getReleaseQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        // Calculate total profit (only for stocks with quantity > 0)
        BigDecimal totalProfit = stocks.stream()
                .filter(stock -> stock.getQuantity() > 0) // Filter stocks with quantity > 0
                .map(Stock::getProfit)
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        // Create the summary DTO
        return new DashboardSummaryDTO(
                totalProducts,
                totalStockQuantity,
                totalReleaseUnits,
                totalPurchasePrice,
                totalRevenue,
                totalProfit
        );
    }

    public List<ProductDetailsDTO> getProductDetails() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> {
                    int productId = product.getPid();
                    String productName = product.getProductName();

                    int totalStocks = productRepository.countTotalStocksByProductId(productId);
                    int totalReleases = productRepository.countTotalReleasesByProductId(productId);
                    int stockQuantity = productRepository.findTotalStockQuantityByProductId(productId) == null ? 0
                            : productRepository.findTotalStockQuantityByProductId(productId);
                    int releaseQuantity = productRepository.findTotalReleaseQuantityByProductId(productId) == null ? 0
                            : productRepository.findTotalReleaseQuantityByProductId(productId);
                    BigDecimal totalProfit = productRepository.findProfitByProductId(productId);

                    return new ProductDetailsDTO(productId,productName, totalStocks, totalReleases, stockQuantity, releaseQuantity, totalProfit);
                }).sorted((p1, p2) -> p2.getProfit().compareTo(p1.getProfit())) // Sort by profit descending
                .collect(Collectors.toList());
    }
}


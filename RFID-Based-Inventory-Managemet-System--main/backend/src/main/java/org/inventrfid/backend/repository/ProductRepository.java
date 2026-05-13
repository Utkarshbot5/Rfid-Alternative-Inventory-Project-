package org.inventrfid.backend.repository;



import org.inventrfid.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // Additional query methods if needed

    @Query("SELECT SUM(s.Quantity) FROM Stock s WHERE s.product.pid = :productId")
    Integer findTotalStockQuantityByProductId(@Param("productId") int productId);

    @Query("SELECT SUM(r.releaseQuantity) FROM Release r WHERE r.stock.product.pid = :productId")
    Integer findTotalReleaseQuantityByProductId(@Param("productId") int productId);

    @Query("SELECT COUNT(s) FROM Stock s WHERE s.product.pid = :productId")
    Integer countTotalStocksByProductId(@Param("productId") int productId);

    @Query("SELECT COUNT(r) FROM Release r WHERE r.stock.product.pid = :productId")
    Integer countTotalReleasesByProductId(@Param("productId") int productId);

    @Query("SELECT p.profit FROM Product p WHERE p.pid = :productId")
    BigDecimal findProfitByProductId(@Param("productId") int productId);
}

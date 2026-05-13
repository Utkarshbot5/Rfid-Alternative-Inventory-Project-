package org.inventrfid.backend.service;

import org.inventrfid.backend.dto.ProductDTO;
import org.inventrfid.backend.entity.Product;
import org.inventrfid.backend.exception.ResourceNotFoundException;
import org.inventrfid.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Get product by ID
    public ProductDTO getProductById(int id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        return mapToDTO(product);
    }

    // Create a new product
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = mapToEntity(productDTO);
        product.setProfit(BigDecimal.valueOf(0));
        product = productRepository.save(product);
        return mapToDTO(product);
    }

    // Update an existing product
    public ProductDTO updateProduct(int id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        product.setProductName(productDTO.getProductName());
        product = productRepository.save(product);
        return mapToDTO(product);
    }

    // Delete product by ID
    public void deleteProduct(int id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with ID: " + id);
        }
        productRepository.deleteById(id);
    }

    // Map Product entity to DTO
    private ProductDTO mapToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setPid(product.getPid());
        dto.setProductName(product.getProductName());
        dto.setProfit(product.getProfit());
        return dto;
    }

    // Map DTO to Product entity
    private Product mapToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setPid(dto.getPid());
        product.setProductName(dto.getProductName());
        product.setProfit(dto.getProfit());
        return product;
    }
}


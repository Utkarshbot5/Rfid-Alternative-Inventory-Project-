package org.inventrfid.backend.controller;

import org.inventrfid.backend.dto.DashboardSummaryDTO;
import org.inventrfid.backend.dto.ProductDetailsDTO;
import org.inventrfid.backend.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {
        DashboardSummaryDTO summary = dashboardService.getDashboardSummary();
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/product-profits")
    public ResponseEntity<List<ProductDetailsDTO>> getProductProfits() {
        List<ProductDetailsDTO> productDetails = dashboardService.getProductDetails();
        return ResponseEntity.ok(productDetails);
    }

}


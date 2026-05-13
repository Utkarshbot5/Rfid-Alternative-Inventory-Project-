package org.inventrfid.backend.controller;

import org.inventrfid.backend.dto.ReleaseDTO;
import org.inventrfid.backend.dto.StockDTO;
import org.inventrfid.backend.entity.Release;
import org.inventrfid.backend.entity.Stock;
import org.inventrfid.backend.service.ReleaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
@RestController
@RequestMapping("/api/releases")
public class ReleaseController {
    @Autowired
    private final ReleaseService releaseService;
    public ReleaseController(ReleaseService releaseService) {
        this.releaseService = releaseService;
    }

    @GetMapping
    public ResponseEntity<List<ReleaseDTO>> getAllReleases() {
        List<ReleaseDTO> releases = releaseService.getAll();
        return ResponseEntity.ok(releases);
    }

    @GetMapping("/{id}")
    public ReleaseDTO getReleaseById(@PathVariable Long id) {
        Release release = releaseService.getById(id).orElseThrow(() -> new RuntimeException("Release not found"));
        return releaseService.mapToDto(release);
    }

    // Get the last stock item
    @GetMapping("/last")
    public ReleaseDTO getLastRelease() {
        Release release = releaseService.getLastRelease();
        return releaseService.mapToDto(release);
    }

    @PutMapping("/{transactionId}")
    public ReleaseDTO updateRelease(
            @PathVariable Long transactionId,
            @RequestBody ReleaseDTO releaseDto) {
        Release updatedRelease = releaseService.updateRelease(transactionId,releaseDto.getReleaseQuantity(),releaseDto.getReleasePrice());
        return releaseService.mapToDto(updatedRelease);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelease(@PathVariable Long id) {
        releaseService.deleteRelease(id);
        return ResponseEntity.noContent().build();
    }



}


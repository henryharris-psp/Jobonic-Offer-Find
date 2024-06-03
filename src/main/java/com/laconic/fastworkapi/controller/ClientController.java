package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.ClientDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IClientService;
import com.laconic.fastworkapi.service.impl.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/client")
public class ClientController {
    private final IClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @Operation(summary = APIDocsHelper.ClientAPI.GET_CLIENT)
    @GetMapping
    public ClientDTO getClient(@RequestParam UUID id) {
        return this.clientService.getById(id);
    }

    @Operation(summary = APIDocsHelper.ClientAPI.SAVE_CLIENT)
    @PostMapping
    public ClientDTO create(@RequestBody ClientDTO clientDTO) {
        return this.clientService.save(clientDTO);
    }

    @Operation(summary = APIDocsHelper.ClientAPI.UPDATE_CLIENT)
    @PutMapping
    public ClientDTO update(@RequestParam UUID id, @RequestBody ClientDTO clientDTO) {
        return this.clientService.update(id, clientDTO);
    }

    @Operation(summary = APIDocsHelper.ClientAPI.GET_ALL_CLIENT)
    @PostMapping("/all")
    public PaginationDTO<ClientDTO> getAllClients(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.clientService.getAllClients(pageAndFilterDTO);
    }

    @Operation(summary = APIDocsHelper.ClientAPI.DELETE_CLIENT)
    @DeleteMapping
    public String delete(UUID id) {
        return this.clientService.delete(id);
    }
}

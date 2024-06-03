package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ClientDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.UUID;

public interface IClientService {
    ClientDTO save(ClientDTO clientDTO);
    ClientDTO update(UUID id, ClientDTO clientDTO);
    ClientDTO getById(UUID id);
    String delete(UUID id);
    PaginationDTO<ClientDTO> getAllClients(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);
}

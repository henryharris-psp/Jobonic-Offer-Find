package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ClientDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Client;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.IClientRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IClientService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class ClientService implements IClientService {
    private final IClientRepo clientRepo;

    public ClientService(IClientRepo clientRepo) {
        this.clientRepo = clientRepo;
    }

    @Override
    public ClientDTO save(ClientDTO clientDTO) {
        return new ClientDTO(this.clientRepo.save(clientDTO.updateClient(new Client())));
    }

    @Override
    public ClientDTO update(UUID id, ClientDTO clientDTO) {
        var existingClient = this.getClient(id);
        return new ClientDTO(this.clientRepo.save(clientDTO.updateClient(existingClient)));
    }

    @Override
    public ClientDTO getById(UUID id) {
        return new ClientDTO(this.getClient(id));
    }

    @Override
    public String delete(UUID id) {
        var existingClient = this.getClient(id);
        existingClient.setActive(false);
        this.clientRepo.save(existingClient);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.CLIENT);
    }

    @Override
    public PaginationDTO<ClientDTO> getAllClients(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var searchColumns = Set.of("firstName", "lastName", "company");
        Specification<Client> specification =
                GenericSpecification.hasKeyword(pageAndFilterDTO.getFilter().getSearchKeyword(), searchColumns);
        var result = this.clientRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result, result.getContent().stream().map(ClientDTO::new).toList());
    }

    private Client getClient(UUID id) {
        return this.clientRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CLIENT, "id",
                                                                                                            id.toString()));
    }
}

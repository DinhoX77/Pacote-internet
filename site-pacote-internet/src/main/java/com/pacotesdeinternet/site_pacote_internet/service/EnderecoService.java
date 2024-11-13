package com.pacotesdeinternet.site_pacote_internet.service;

import com.pacotesdeinternet.site_pacote_internet.model.Endereco;
import com.pacotesdeinternet.site_pacote_internet.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Endereco cadastrarEndereco(Endereco endereco) {
        // Aqui você pode adicionar mais validações ou lógica de negócios, se necessário.
        return enderecoRepository.save(endereco);
    }

    public Endereco salvarEndereco(Endereco endereco) {
        // Salvar o endereço no banco de dados
        return enderecoRepository.save(endereco);
    }

}

package com.pacotesdeinternet.site_pacote_internet.controller;

import com.pacotesdeinternet.site_pacote_internet.model.Endereco;
import com.pacotesdeinternet.site_pacote_internet.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @PostMapping("/cadastro")
    public ResponseEntity<Endereco> cadastrarEndereco(@RequestBody Endereco endereco) {
        Endereco novoEndereco = enderecoService.cadastrarEndereco(endereco);
        return new ResponseEntity<>(novoEndereco, HttpStatus.CREATED);
    }
}

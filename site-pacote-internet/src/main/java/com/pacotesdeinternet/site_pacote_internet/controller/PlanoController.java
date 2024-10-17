package com.pacotesdeinternet.site_pacote_internet.controller;

import com.pacotesdeinternet.site_pacote_internet.model.Plano;
import com.pacotesdeinternet.site_pacote_internet.service.PlanoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planos")
public class PlanoController {

    @Autowired
    private PlanoService planoService;

    @GetMapping
    public List<Plano> listarPlanos() {
        return planoService.listarPlanos();
    }

    @PostMapping
    public Plano cadastrarPlano(@RequestBody Plano plano) {
        return planoService.cadastrarPlano(plano);
    }

    @DeleteMapping("/{id}")
    public void deletarPlano(@PathVariable Long id) {
        planoService.deletarPlano(id);
    }
}
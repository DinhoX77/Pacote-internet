package com.pacotesdeinternet.site_pacote_internet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    // Mapeamento para a página de Gerenciar Planos
    @GetMapping("/gerenciar-planos")
    public String gerenciarPlanos() {
        return "gerenciarPlanos";  // Retorna a página gerenciar-planos.html
    }
}


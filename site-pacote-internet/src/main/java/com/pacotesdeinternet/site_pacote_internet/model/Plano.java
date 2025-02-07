package com.pacotesdeinternet.site_pacote_internet.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private int velocidade; // Em Mbps
    private double preco; // Preço do plano em Reais

    // Construtor com parâmetros
    public Plano(Long id, String nome, int velocidade, double preco) {
        this.id = id;
        this.nome = nome;
        this.velocidade = velocidade;
        this.preco = preco;
    }

    // Construtor padrão
    public Plano() {}
}

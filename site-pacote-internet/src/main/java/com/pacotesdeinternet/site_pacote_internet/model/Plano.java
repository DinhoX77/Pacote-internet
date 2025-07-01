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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getVelocidade() {
        return velocidade;
    }

    public void setVelocidade(int velocidade) {
        this.velocidade = velocidade;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }
}

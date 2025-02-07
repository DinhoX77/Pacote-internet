package com.pacotesdeinternet.site_pacote_internet.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Gerar ID automaticamente
    private Long id;  // ID agora é um Long auto-incrementável

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @Size(min = 14, max = 14, message = "CPF deve ter 14 caracteres")
    private String cpf;

    @Email
    private String email;

    private String telefone;
    private String cep;
    private String cidade;
    private String bairro;
    private String rua;
    private String numero;
    private String complemento;
    private String pontoReferencia;
    private String tipoImovel;

    @ManyToOne
    @JoinColumn(name = "plano_id")
    private Plano plano;  // Associação com o plano escolhido

    // Construtor padrão
    public Cliente() {}

    // Construtor com parâmetros (ID é gerado automaticamente)
    public Cliente(String nome, String cpf, String email, String telefone, String cep, String cidade, String bairro,
                   String rua, String numero, String complemento, String pontoReferencia, String tipoImovel, Plano plano) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.cep = cep;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.pontoReferencia = pontoReferencia;
        this.tipoImovel = tipoImovel;
        this.plano = plano;
    }
}

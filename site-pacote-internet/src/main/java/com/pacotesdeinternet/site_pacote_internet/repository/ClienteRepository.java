package com.pacotesdeinternet.site_pacote_internet.repository;


import com.pacotesdeinternet.site_pacote_internet.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
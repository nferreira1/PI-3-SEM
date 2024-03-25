package br.edu.senac.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.senac.models.AgendamentoStatus;

public interface AgendamentoStatusRepository extends JpaRepository<AgendamentoStatus, Byte> {

}

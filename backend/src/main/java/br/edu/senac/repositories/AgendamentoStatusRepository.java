package br.edu.senac.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.AgendamentoStatus;

@Repository
public interface AgendamentoStatusRepository extends JpaRepository<AgendamentoStatus, Byte> {

}

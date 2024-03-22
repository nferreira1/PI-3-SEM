package br.edu.senac.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.senac.models.AgendamentoStatus;

public interface AgendamentoStatusRepository extends JpaRepository<AgendamentoStatus, Byte> {

  // @Query(nativeQuery = true, value = "SELECT * FROM agendamento_status WHERE id
  // = :id")
  // AgendamentoStatus buscarPorId(Byte id);

}

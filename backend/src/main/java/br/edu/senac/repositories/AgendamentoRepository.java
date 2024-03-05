package br.edu.senac.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

  @Query(nativeQuery = true, value = "UPDATE agendamentos SET status = :status WHERE id = :id")
  public void alterarStatus(@Param("id") Long id, @Param("status") Agendamento.Status status);

}

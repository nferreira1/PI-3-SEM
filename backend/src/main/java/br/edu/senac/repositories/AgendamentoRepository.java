package br.edu.senac.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Agendamento;
import jakarta.transaction.Transactional;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

  public List<Agendamento> findAllByUsuarioId(Long id);

  public List<Agendamento> findAllByStatusId(Long id);

  @Modifying
  @Transactional
  @Query(nativeQuery = true, value = "UPDATE agendamentos SET status_id = :idStatus WHERE id = :idAgendamento")
  public void alterarStatusAgendamento(@Param("idAgendamento") Long idAgendamento, @Param("idStatus") Long idStatus);

}

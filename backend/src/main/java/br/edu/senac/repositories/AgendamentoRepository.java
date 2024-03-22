package br.edu.senac.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

  @Query(nativeQuery = true, value = "SELECT * FROM agendamentos WHERE usuario_id = :id")
  public List<Agendamento> buscarTodosPorIdUsuario(@Param("id") Long id);
}

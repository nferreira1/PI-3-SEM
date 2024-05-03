package br.edu.senac.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.AvaliacaoAgendamento;

@Repository
public interface AvaliacaoAgendamentoRepository extends JpaRepository<AvaliacaoAgendamento, Long> {

  @Query(nativeQuery = true, value = """
        SELECT COUNT(*) AS quantidade, ROUND(AVG(A.nota), 1) AS media FROM avaliacoes_agendamentos AS A
        INNER JOIN agendamentos AS AG ON A.agendamento_id = AG.id
        INNER JOIN espacos_horarios AS EH ON AG.espaco_horario_id = EH.id
        INNER JOIN espacos AS E ON EH.espaco_id = E.id
        INNER JOIN atividades AS AT ON E.atividade_id = AT.id
        WHERE AT.id = :id
      """)
  public List<Object[]> findByIdAtividadeId(@Param("id") String id);

}

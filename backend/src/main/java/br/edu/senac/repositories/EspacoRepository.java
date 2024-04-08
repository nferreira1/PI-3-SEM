package br.edu.senac.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Espaco;
import jakarta.transaction.Transactional;

@Repository
public interface EspacoRepository extends JpaRepository<Espaco, Long> {

  public List<Espaco> findAllByAtividadeIdAndStatusTrueAndEspacoHorariosNotNull(String atividadeId);

  @Query(nativeQuery = true, value = """
        SELECT H.horario_inicial, H.horario_final
        FROM espacos AS E
        INNER JOIN espacos_horarios AS EH ON EH.espaco_id = E.id
        INNER JOIN horarios AS H ON H.id = EH.horario_id
        LEFT JOIN agendamentos AS A ON A.espaco_horario_id = EH.id AND
        A.data_agendamento = :dataAgendamento
        WHERE A.id IS NULL AND E.atividade_id = :atividadeId AND H.status = 1 AND
        E.status = 1 ORDER BY H.horario_inicial
      """)
  public List<Object[]> findByDataAndAtividadeId(@Param("atividadeId") String atividadeId,
      @Param("dataAgendamento") LocalDate dataAgendamento);

  @Query(nativeQuery = true, value = "SELECT DISTINCT E.*, H.id AS horario_id, H.horario_inicial, H.horario_final, H.status AS status_horario FROM espacos E INNER JOIN espacos_horarios EH ON E.id = EH.espaco_id INNER JOIN horarios H ON EH.horario_id = H.id WHERE E.atividade_id = :atividadeId AND E.status = TRUE AND H.status = 1")
  public List<Espaco> findAllByAtividadeIdAndStatusTrueAndEspacoHorariosNotNullAndEspacoStatusTrue(
      @Param("atividadeId") String atividadeId);

  public Espaco findByAtividadeIdAndNome(String id, String nome);

  @Modifying
  @Transactional
  @Query(nativeQuery = true, value = "UPDATE espacos SET status = true WHERE id = :id")
  public void alternarStatusEspacoTrue(@Param("id") Long id);

}

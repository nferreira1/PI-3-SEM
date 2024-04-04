package br.edu.senac.repositories;

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

  @Query(nativeQuery = true, value = "SELECT DISTINCT E.*, H.id AS horario_id, H.horario_inicial, H.horario_final, H.status AS status_horario FROM espacos E INNER JOIN espacos_horarios EH ON E.id = EH.espaco_id INNER JOIN horarios H ON EH.horario_id = H.id WHERE E.atividade_id = :atividadeId AND E.status = TRUE AND H.status = 1")
  public List<Espaco> findAllByAtividadeIdAndStatusTrueAndEspacoHorariosNotNullAndEspacoStatusTrue(
      @Param("atividadeId") String atividadeId);

  public Espaco findByAtividadeIdAndNome(String id, String nome);

  @Modifying
  @Transactional
  @Query(nativeQuery = true, value = "UPDATE espacos SET status = true WHERE id = :id")
  public void alternarStatusEspacoTrue(@Param("id") Long id);

}

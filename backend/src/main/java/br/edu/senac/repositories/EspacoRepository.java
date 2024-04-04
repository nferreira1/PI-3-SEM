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

  public Espaco findByAtividadeIdAndNome(String id, String nome);

  @Modifying
  @Transactional
  @Query(nativeQuery = true, value = "UPDATE espacos SET status = true WHERE id = :id")
  public void alternarStatusEspacoTrue(@Param("id") Long id);

}

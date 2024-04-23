package br.edu.senac.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Atividade;

@Repository
public interface AtividadeRepository extends JpaRepository<Atividade, String> {

  public Optional<Atividade> findByIdAndStatusTrueAndEspacosNotNullAndEspacosStatusTrue(String id);

  public List<Atividade> findAllByStatusTrueAndEspacosNotNullAndEspacosStatusTrue();

  @Query(nativeQuery = true, value = """
      SELECT
      A.*,
      MAX(E.id) AS espaco_id, 
      MAX(E.imagem) AS espaco_imagem, 
      MAX(E.nome) AS espaco_nome, 
      MAX(E.status) AS espaco_status, 
      MAX(E.atividade_id) AS espaco_atividade_id,
      MAX(EH.id) AS espacos_horarios_id, 
      MAX(EH.espaco_id) AS espacos_horarios_espaco_id, 
      MAX(EH.horario_id) AS espacos_horarios_horario_id
      FROM atividades AS A
      INNER JOIN espacos AS E ON E.atividade_id = A.id AND E.status = 1
      INNER JOIN espacos_horarios AS EH ON EH.espaco_id = E.id
      INNER JOIN horarios AS H ON H.id = EH.horario_id AND H.status = 1
      WHERE A.status = 1
      GROUP BY A.id;
  """)
  public List<Atividade> buscarTodasAtividades();

}

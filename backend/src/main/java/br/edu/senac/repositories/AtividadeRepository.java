package br.edu.senac.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Atividade;

@Repository
public interface AtividadeRepository extends JpaRepository<Atividade, String> {

  public Optional<Atividade> findByIdAndStatusTrueAndEspacosNotNullAndEspacosStatusTrue(String id);

  public List<Atividade> findAllByStatusTrueAndEspacosNotNullAndEspacosStatusTrue();

}
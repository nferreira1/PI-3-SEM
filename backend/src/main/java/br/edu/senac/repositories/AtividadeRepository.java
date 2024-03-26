package br.edu.senac.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Atividade;

@Repository
public interface AtividadeRepository extends JpaRepository<Atividade, String> {

  public List<Atividade> findAllByStatusTrue();

}
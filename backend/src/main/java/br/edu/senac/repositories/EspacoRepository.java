package br.edu.senac.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Espaco;

@Repository
public interface EspacoRepository extends JpaRepository<Espaco, Long> {

  public List<Espaco> findAllByAtividadeIdAndStatusTrue(String atividadeId);

}

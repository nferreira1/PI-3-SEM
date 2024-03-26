package br.edu.senac.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.EspacoHorario;

@Repository
public interface EspacoHorarioRepository extends JpaRepository<EspacoHorario, Long> {

  Optional<EspacoHorario> findByEspacoIdAndHorarioId(Long espacoId, Long horarioId);

}

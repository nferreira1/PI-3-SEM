package br.edu.senac.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import br.edu.senac.models.AgendamentoStatus;
import br.edu.senac.repositories.AgendamentoStatusRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class AgendamentoStatusService {

  @Autowired
  private AgendamentoStatusRepository agendamentoStatusRepository;

  public AgendamentoStatus buscarPorId(@NonNull Byte id) {

    Optional<AgendamentoStatus> agendamentoStatus = this.agendamentoStatusRepository.findById(id);

    return agendamentoStatus.orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado!"));
  }
}

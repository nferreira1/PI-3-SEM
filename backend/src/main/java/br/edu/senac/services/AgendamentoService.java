package br.edu.senac.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.EspacoHorario;
import br.edu.senac.models.Usuario;
import br.edu.senac.models.dtos.Agendamento.AgendamentoCriarDTO;
import br.edu.senac.repositories.AgendamentoRepository;
import br.edu.senac.repositories.EspacoHorarioRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class AgendamentoService {

  @Autowired
  private AgendamentoRepository agendamentoRepository;

  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private EspacoHorarioRepository espacoHorarioRepository;

  @Autowired
  private AgendamentoStatusService agendamentoStatusService;

  public Agendamento buscarPorId(@NonNull Long id) {
    Optional<Agendamento> agendamento = this.agendamentoRepository.findById(id);

    return agendamento.orElseThrow(() -> new ObjectNotFoundException("Agendamento não encontrado!"));
  }

  public List<Agendamento> buscarTodosPorIdUsuario(@NonNull Long id) {
    return this.agendamentoRepository.findAllByUsuarioId(id);
  }

  @Transactional
  public Agendamento criar(@NonNull AgendamentoCriarDTO obj) {

    Agendamento agendamento = new Agendamento();

    Usuario usuario = this.usuarioService.buscarPorId(obj.getIdUsuario());

    EspacoHorario espacoHorario = espacoHorarioRepository
        .findByEspacoIdAndHorarioId(obj.getEspacoId(), obj.getHorarioId())
        .orElseThrow(() -> new ObjectNotFoundException("Espaço horário não encontrado!"));

    agendamento.setEspacoHorario(espacoHorario);
    agendamento.setUsuario(usuario);
    agendamento.setStatus(agendamentoStatusService.buscarPorId((byte) 1));
    agendamento.setDataAgendamento(obj.getDataAgendamento());

    this.agendamentoRepository.save(agendamento);

    return agendamento;
  }

}

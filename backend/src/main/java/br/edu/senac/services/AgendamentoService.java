package br.edu.senac.services;

import java.time.LocalDateTime;
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
import br.edu.senac.models.dtos.Agendamento.AgendamentoDTO;
import br.edu.senac.repositories.AgendamentoRepository;
import br.edu.senac.repositories.ConfiguracaoRepository;
import br.edu.senac.repositories.EspacoHorarioRepository;
import br.edu.senac.services.exceptions.CancelarAgendamentoFinalizadoOuCancelado;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class AgendamentoService {

  public static final Long ID_TEMPO_ANTES_DATA_PARA_CONFIRMAR_AGENDAMENTO = 4L;
  public static final Long STATUS_AGUARDANDO_CONFIRMACAO = 1L;
  public static final Long STATUS_CANCELADO = 3L;
  public static final Long STATUS_FINALIZADO = 4L;

  @Autowired
  private AgendamentoRepository agendamentoRepository;

  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private EspacoHorarioRepository espacoHorarioRepository;

  @Autowired
  private AgendamentoStatusService agendamentoStatusService;

  @Autowired
  private ConfiguracaoRepository configuracaoRepository;

  public Agendamento buscarPorId(@NonNull Long id) {
    Optional<Agendamento> agendamento = this.agendamentoRepository.findById(id);

    return agendamento.orElseThrow(() -> new ObjectNotFoundException("Agendamento não encontrado!"));
  }

  public List<AgendamentoDTO> buscarTodosPorIdUsuario(@NonNull Long id) {

    this.usuarioService.buscarPorId(id);

    var agendamentos = this.agendamentoRepository.findAllByUsuarioId(id);
    var agendamentosDto = agendamentos.stream().map(AgendamentoDTO::new).toList();
    var idAvaliados = this.agendamentoRepository.findAvaliadosStatusByUsuarioId(id);
    agendamentosDto.forEach(agendamento -> agendamento.setAvaliado(idAvaliados.contains(agendamento.getId())));

    return agendamentosDto;
  }

  @Transactional
  public Agendamento criar(@NonNull AgendamentoCriarDTO obj) {

    Agendamento agendamento = new Agendamento();

    Usuario usuario = this.usuarioService.buscarPorId(obj.getIdUsuario());

    EspacoHorario espacoHorario = espacoHorarioRepository
        .findByEspacoIdAndHorarioId(obj.getEspacoId(), obj.getHorarioId())
        .orElseThrow(() -> new ObjectNotFoundException("Espaço ou horário não encontrado!"));

    String valor = configuracaoRepository.findById(ID_TEMPO_ANTES_DATA_PARA_CONFIRMAR_AGENDAMENTO)
        .orElseThrow(() -> new RuntimeException("Configuração não encontrada!"))
        .getValor();

    LocalDateTime dataHorarioExpiracao = obj.getDataAgendamento().atTime(espacoHorario.getHorario().getHorarioInicial())
        .minusMinutes(Long.parseLong(valor));

    if (dataHorarioExpiracao.isAfter(LocalDateTime.now())) {
      agendamento.setStatus(agendamentoStatusService.buscarPorId((byte) 1));
    } else {
      agendamento.setStatus(agendamentoStatusService.buscarPorId((byte) 2));
    }

    agendamento.setEspacoHorario(espacoHorario);
    agendamento.setUsuario(usuario);
    agendamento.setDataAgendamento(obj.getDataAgendamento());
    agendamento.setDataHorarioExpiracao(dataHorarioExpiracao);

    this.agendamentoRepository.save(agendamento);

    return agendamento;
  }

  public void cancelarReserva(@NonNull Long id) {
    Agendamento agendamento = this.buscarPorId(id);

    if (agendamento.getStatus().getId() == STATUS_FINALIZADO || agendamento.getStatus().getId() == STATUS_CANCELADO) {
      throw new CancelarAgendamentoFinalizadoOuCancelado("Agendamento finalizado ou cancelado não pode ser cancelado!");
    }

    agendamento.setStatus(agendamentoStatusService.buscarPorId((byte) 3));

    this.agendamentoRepository.save(agendamento);
  }

  public void confirmarReserva(@NonNull Long id) {
    Agendamento agendamento = this.buscarPorId(id);

    if (agendamento.getStatus().getId() != STATUS_AGUARDANDO_CONFIRMACAO) {
      throw new CancelarAgendamentoFinalizadoOuCancelado(
          "Agendamento finalizado ou cancelado não pode ser confirmado!");
    }

    agendamento.setStatus(agendamentoStatusService.buscarPorId((byte) 2));

    this.agendamentoRepository.save(agendamento);
  }
}

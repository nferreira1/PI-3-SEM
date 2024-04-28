package br.edu.senac.tasks.agendamento;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;

import br.edu.senac.models.Agendamento;
import br.edu.senac.repositories.AgendamentoRepository;
import br.edu.senac.repositories.ConfiguracaoRepository;

@Component
public class AgendamentoConfirmarTask implements ApplicationListener<ApplicationReadyEvent> {

  public static final Long INTERVALO_CONFIGURACAO = 2L;
  public static final Long STATUS_CONFIRMADO = 2L;
  public static final Long STATUS_FINALIZADO = 4L;

  @Autowired
  private TaskScheduler taskScheduler;

  @Autowired
  private ConfiguracaoRepository configuracaoRepository;

  @Autowired
  private AgendamentoRepository agendamentoRepository;

  private ScheduledFuture<?> scheduledFuture;
  private String currentInterval;

  private final ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();

  @Override
  public void onApplicationEvent(ApplicationReadyEvent event) {
    reagendarTask();
    startPollingForIntervalChange();
  }

  private void startPollingForIntervalChange() {
    executorService.scheduleAtFixedRate(this::reagendarTask, 0, 10, TimeUnit.SECONDS);
  }

  public synchronized void reagendarTask() {
    String novoIntervalo = configuracaoRepository.findById(INTERVALO_CONFIGURACAO)
        .orElseThrow(() -> new RuntimeException("Configuração não encontrada!"))
        .getValor();

    if (scheduledFuture != null && novoIntervalo.equals(currentInterval)) {
      return;
    }

    if (scheduledFuture != null) {
      scheduledFuture.cancel(false);
    }

    String cronExpression = String.format("0 */%s * * * *", novoIntervalo);
    scheduledFuture = taskScheduler.schedule(this::task, new CronTrigger(cronExpression));
    currentInterval = novoIntervalo;
  }

  public void task() {
    List<Agendamento> agendamentosConfirmados = agendamentoRepository.findAllByStatusId(STATUS_CONFIRMADO);

    if (agendamentosConfirmados.isEmpty()) {
      System.out.println("NÃO HÁ AGENDAMENTOS CONFIRMADOS!");
      return;
    }

    System.out.println("AGENDAMENTOS CONFIRMADOS: \n");

    agendamentosConfirmados.forEach(agendamento -> {
      LocalDateTime data = agendamento.getDataAgendamento()
          .atTime(agendamento.getEspacoHorario().getHorario().getHorarioInicial());

      System.out.println("""
          id: %d,
          data: %s,
          status: %s,
          atividade: %s,
          espaço: %s,
          horário: %s - %s,
          usuario: {
            id: %d,
            nome: %s,
            email: %s
          }
          \n""".formatted(
          agendamento.getId(),
          agendamento.getDataAgendamento(),
          agendamento.getStatus().getNome(),
          agendamento.getEspacoHorario().getEspaco().getAtividade().getNome(),
          agendamento.getEspacoHorario().getEspaco().getNome(),
          agendamento.getEspacoHorario().getHorario().getHorarioInicial(),
          agendamento.getEspacoHorario().getHorario().getHorarioFinal(),
          agendamento.getUsuario().getId(),
          agendamento.getUsuario().getNome(),
          agendamento.getUsuario().getEmail()));

      if (data.isBefore(LocalDateTime.now())) {
        agendamentoRepository.alterarStatusAgendamento(agendamento.getId(), STATUS_FINALIZADO);
      }
    });

  }
}

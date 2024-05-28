package br.edu.senac.email;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import br.edu.senac.models.Agendamento;

@Component
public class AgendamentoEmailComponente extends EmailComponente {

  @Value("${IP_PUBLICO}")
  private String ipPublico;

  private TemplateEngine templateEngine;

  public AgendamentoEmailComponente(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
    super(javaMailSender);
    this.templateEngine = templateEngine;
  }

  public void enviarEmailConfirmacaoAgendamento(Agendamento agendamento) {
    Context context = new Context();

    String dataAgendamento = agendamento.getDataAgendamento()
        .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    String horaAgendamento = agendamento.getEspacoHorario().getHorario().getHorarioInicial().toString();
    String dataHoraAgendamento = dataAgendamento + " às " + horaAgendamento;
    String dataAgendamentoExpiracao = agendamento.getDataHorarioExpiracao().format(
        DateTimeFormatter.ofPattern("HH:mm 'do dia' dd/MM/yyyy"));
    String atividade = Arrays
        .stream(agendamento.getEspacoHorario().getEspaco().getAtividade().getNome()
            .split("\\s+"))
        .filter(palavra -> !palavra.isEmpty())
        .map(palavra -> palavra.substring(0, 1).toUpperCase()
            + palavra.substring(1).toLowerCase())
        .collect(Collectors.joining(" "));
    String confirmarAgendamento = "http://" + ipPublico + "/api/agendamentos";
    String cancelarAgendamento = "http://" + ipPublico + "/api/agendamentos";

    context.setVariable("atividade", atividade);
    context.setVariable("dataAgendamento", dataHoraAgendamento);
    context.setVariable("dataExpiracao", dataAgendamentoExpiracao);
    context.setVariable("logoAtividade",
        agendamento.getEspacoHorario().getEspaco().getAtividade().getImagem().toString());
    context.setVariable("confirmarAgendamento", confirmarAgendamento);
    context.setVariable("cancelarAgendamento", cancelarAgendamento);

    String templateHtml = this.templateEngine.process("agendamento-template", context);

    Email email = Email.builder()
        .destinatario(agendamento.getUsuario().getEmail())
        .remetente("sysclub.app@gmail.com")
        .assunto("Agendamento")
        .mensagem(templateHtml)
        .build();

    this.enviarEmail(email);
  }
}

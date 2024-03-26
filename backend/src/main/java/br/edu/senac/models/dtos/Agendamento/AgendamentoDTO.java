package br.edu.senac.models.dtos.Agendamento;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.AgendamentoStatus;
import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AgendamentoDTO {

  private Long id;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataAgendamento;
  private String horarioInicial;
  private String horarioFinal;
  private AgendamentoStatus status;
  private EspacoDTO espaco;

  public AgendamentoDTO(Agendamento agendamento) {
    this.id = agendamento.getId();
    this.dataAgendamento = agendamento.getDataAgendamento();
    this.status = agendamento.getStatus();

    this.horarioInicial = agendamento.getEspacoHorario().getHorario().getHorarioInicial().toString();
    this.horarioFinal = agendamento.getEspacoHorario().getHorario().getHorarioFinal().toString();

    this.espaco = new EspacoDTO(agendamento.getEspacoHorario().getEspaco().getNome(),
        agendamento.getEspacoHorario().getEspaco().getImagem());
  }

}

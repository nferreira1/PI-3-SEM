package br.edu.senac.models.dtos.Agendamento;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.AgendamentoStatus;
import br.edu.senac.models.dtos.Atividade.AtividadeDTO;
import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AgendamentoDTO {

  private Long id;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataAgendamento;
  @Schema(example = "08:00")
  private String horarioInicial;
  @Schema(example = "09:00")
  private String horarioFinal;
  private AgendamentoStatus status;
  private AtividadeDTO atividade;
  private EspacoDTO espaco;

  public AgendamentoDTO(Agendamento agendamento) {
    this.id = agendamento.getId();
    this.dataAgendamento = agendamento.getDataAgendamento();
    this.status = agendamento.getStatus();

    this.atividade = new AtividadeDTO(agendamento.getEspacoHorario().getEspaco().getAtividade().getNome(),
        agendamento.getEspacoHorario().getEspaco().getAtividade().getLocal(),
        agendamento.getEspacoHorario().getEspaco().getAtividade().getImagem(),
        agendamento.getEspacoHorario().getEspaco().getAtividade().getTelefone());

    this.horarioInicial = agendamento.getEspacoHorario().getHorario().getHorarioInicial().toString();
    this.horarioFinal = agendamento.getEspacoHorario().getHorario().getHorarioFinal().toString();

    this.espaco = new EspacoDTO(agendamento.getEspacoHorario().getEspaco().getNome(),
        agendamento.getEspacoHorario().getEspaco().getImagem());

  }

}

package br.edu.senac.models.dtos.Agendamento;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.AgendamentoStatus;
import br.edu.senac.models.Atividade;
import br.edu.senac.models.Espaco;
import br.edu.senac.models.Horario;
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
  private EspacoDTO espaco;
  private AtividadeDTO atividade;

  public AgendamentoDTO(Agendamento agendamento) {

    Horario espacoHorario = agendamento.getEspacoHorario().getHorario();
    Espaco espaco = agendamento.getEspacoHorario().getEspaco();
    Atividade atividade = espaco.getAtividade();

    this.id = agendamento.getId();
    this.dataAgendamento = agendamento.getDataAgendamento();
    this.status = agendamento.getStatus();

    this.atividade = new AtividadeDTO(
        atividade.getNome(),
        atividade.getLocal(),
        atividade.getImagem(),
        atividade.getTelefone());

    this.espaco = new EspacoDTO(
        espaco.getId(),
        espaco.getNome(),
        espaco.getImagem());

    this.horarioInicial = espacoHorario.getHorarioInicial().toString();
    this.horarioFinal = espacoHorario.getHorarioFinal().toString();

  }

}

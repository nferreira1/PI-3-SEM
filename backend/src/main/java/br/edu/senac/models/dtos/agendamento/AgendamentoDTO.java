package br.edu.senac.models.dtos.agendamento;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.AgendamentoStatus;
import br.edu.senac.models.dtos.usuario.UsuarioDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AgendamentoDTO {

  private Long id;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataAgendamento;

  @JsonFormat(pattern = "HH:mm")
  @Schema(type = "string", pattern = "HH:mm")
  private LocalTime horaAgendamento;

  private AgendamentoStatus status;
  private UsuarioDTO usuario;

  public AgendamentoDTO(Agendamento agendamento) {
    this.id = agendamento.getId();
    this.dataAgendamento = agendamento.getDataAgendamento();
    this.horaAgendamento = agendamento.getHoraAgendamento();
    this.status = agendamento.getStatus();
    this.usuario = new UsuarioDTO(agendamento.getUsuario().getId(), agendamento.getUsuario().getNome(),
        agendamento.getUsuario().getEmail(), agendamento.getUsuario().getImagem());
  }

}

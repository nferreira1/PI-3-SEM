package br.edu.senac.models.dtos.Agendamento;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AgendamentoCriarDTO {

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataAgendamento;

  @Schema(type = "integer")
  private byte idStatus = 1;
  private Long idUsuario;

}

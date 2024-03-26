package br.edu.senac.models.dtos.Agendamento;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AgendamentoCriarDTO {

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataAgendamento;
  private Long idUsuario;
  private Long horarioId;
  private Long espacoId;

}

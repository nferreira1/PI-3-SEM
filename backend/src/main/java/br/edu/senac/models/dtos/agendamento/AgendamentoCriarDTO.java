package br.edu.senac.models.dtos.Agendamento;

import java.time.LocalDate;
import java.time.LocalTime;

import br.edu.senac.models.AgendamentoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AgendamentoCriarDTO {

  private LocalDate dataAgendamento;
  private LocalTime horaAgendamento;
  private AgendamentoStatus status;

}

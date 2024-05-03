package br.edu.senac.models.dtos.AvaliacaoAgendamento;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AvaliacaoAgendamentoDTO {

  private Long quantidade;
  private Float media;

}

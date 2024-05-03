package br.edu.senac.models.dtos.AvaliacaoAgendamento;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AvaliacaoAgendamentoCriarDTO {

  @Schema(type = "integer")
  private Byte nota;
  private Long idAgendamento;

}

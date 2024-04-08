package br.edu.senac.models.dtos.EspacoHorario;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class EspacoHorarioDTO {

  private Long id;
  private String horarioInicial;
  private String horarioFinal;

  public EspacoHorarioDTO(Long id, String horarioInicial, String horarioFinal) {
    this.id = id;
    this.horarioInicial = horarioInicial.replaceFirst("^(\\d{2}:\\d{2}):\\d{2}$", "$1");
    this.horarioFinal = horarioFinal.replaceFirst("^(\\d{2}:\\d{2}):\\d{2}$", "$1");
  }

}

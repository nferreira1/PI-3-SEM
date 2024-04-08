package br.edu.senac.models.dtos.EspacoHorario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EspacoHorarioDTO {

  private Long id;
  private String horarioInicial;
  private String horarioFinal;

}

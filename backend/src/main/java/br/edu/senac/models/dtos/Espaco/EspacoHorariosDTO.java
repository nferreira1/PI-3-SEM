package br.edu.senac.models.dtos.Espaco;

import java.util.List;

import br.edu.senac.models.dtos.EspacoHorario.EspacoHorarioDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EspacoHorariosDTO extends EspacoDTO {

  private List<EspacoHorarioDTO> horarios;

  public EspacoHorariosDTO(String nome, String imagem, List<EspacoHorarioDTO> horarios) {
    super(nome, imagem);
    this.horarios = horarios;
  }

}

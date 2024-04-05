package br.edu.senac.models.dtos.Atividade;

import java.util.List;

import br.edu.senac.models.Atividade;
import br.edu.senac.models.dtos.Espaco.EspacoHorariosDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AtividadeEspacoDTO extends AtividadeIdDTO {

  private List<EspacoHorariosDTO> espacos;

  public AtividadeEspacoDTO(Atividade atividade) {
    super(atividade);
    this.espacos = atividade.getEspacos().stream().map(espaco -> new EspacoHorariosDTO(espaco)).toList();
  }

  public AtividadeEspacoDTO(Atividade atividade, List<EspacoHorariosDTO> espacos) {
    super(atividade);
    this.espacos = espacos;
  }

}

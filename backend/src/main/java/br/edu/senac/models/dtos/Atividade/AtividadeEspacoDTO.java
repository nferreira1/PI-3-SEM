package br.edu.senac.models.dtos.Atividade;

import java.util.List;

import br.edu.senac.models.Atividade;
import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AtividadeEspacoDTO extends AtividadeIdDTO {

  private List<EspacoDTO> espacos;

  public AtividadeEspacoDTO(Atividade atividade) {
    super(atividade);
    this.espacos = atividade.getEspacos().stream().map(EspacoDTO::new).toList();
  }

  public AtividadeEspacoDTO(Atividade atividade, List<EspacoDTO> espacos) {
    super(atividade);
    this.espacos = espacos;
  }

}

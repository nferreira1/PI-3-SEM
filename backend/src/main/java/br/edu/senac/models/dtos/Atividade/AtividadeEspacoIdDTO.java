package br.edu.senac.models.dtos.Atividade;

import java.util.List;

import br.edu.senac.models.Atividade;
import br.edu.senac.models.dtos.Espaco.EspacoIdDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtividadeEspacoIdDTO extends AtividadeIdDTO {

  private List<EspacoIdDTO> espacos;

  public AtividadeEspacoIdDTO(Atividade atividade, List<EspacoIdDTO> espacos) {
    super(atividade);
    this.espacos = atividade.getEspacos().stream().map(EspacoIdDTO::new).toList();
  }
}

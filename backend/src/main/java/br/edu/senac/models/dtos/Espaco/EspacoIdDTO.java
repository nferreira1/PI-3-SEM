package br.edu.senac.models.dtos.Espaco;

import br.edu.senac.models.Espaco;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EspacoIdDTO extends EspacoDTO {

  private Long id;

  public EspacoIdDTO(Espaco espaco) {
    super(espaco);
    this.id = espaco.getId();
  }

}

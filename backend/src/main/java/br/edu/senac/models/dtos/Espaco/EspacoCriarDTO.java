package br.edu.senac.models.dtos.Espaco;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EspacoCriarDTO extends EspacoDTO {

  private String atividadeId;

  public EspacoCriarDTO(String nome, String imagem, boolean status, String atividadeId) {
    super(nome, imagem);
    this.atividadeId = atividadeId;
  }

}

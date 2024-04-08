package br.edu.senac.models.dtos.Espaco;

import br.edu.senac.models.Espaco;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EspacoIdDTO {

  private Long id;
  private String nome;
  private String imagem;

  public EspacoIdDTO(Espaco espaco) {
    this.id = espaco.getId();
    this.nome = espaco.getNome();
    this.imagem = espaco.getImagem();
  }

}

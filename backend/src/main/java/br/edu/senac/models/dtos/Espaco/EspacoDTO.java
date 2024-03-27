package br.edu.senac.models.dtos.Espaco;

import br.edu.senac.models.Espaco;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EspacoDTO {

  private String nome;
  private String imagem;

  public EspacoDTO(Espaco espaco) {
    this.nome = espaco.getNome();
    this.imagem = espaco.getImagem();
  }

}

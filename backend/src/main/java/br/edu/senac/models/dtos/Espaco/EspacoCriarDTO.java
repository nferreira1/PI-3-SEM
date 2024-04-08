package br.edu.senac.models.dtos.Espaco;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EspacoCriarDTO {

  private String atividadeId;
  private String nome;
  private String imagem;

  public EspacoCriarDTO(String nome, String imagem, boolean status, String atividadeId) {
    this.nome = nome;
    this.imagem = imagem;
    this.atividadeId = atividadeId;
  }

}

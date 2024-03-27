package br.edu.senac.models.dtos.Atividade;

import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AtividadeDTO {

  private String nome;
  private String local;
  private String imagem;
  private String telefone;
  private EspacoDTO espaco;

  public AtividadeDTO(String nome, String local, String imagem, String telefone, String espacoNome,
      String espacoImagem) {
    this.nome = nome;
    this.local = local;
    this.imagem = imagem;
    this.telefone = telefone;
    this.espaco = new EspacoDTO(espacoNome, espacoImagem);
  }

}

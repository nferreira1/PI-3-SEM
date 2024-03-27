package br.edu.senac.models.dtos.Atividade;

import br.edu.senac.models.Atividade;
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

  public AtividadeDTO(Atividade atividade) {
    this.nome = atividade.getNome();
    this.local = atividade.getLocal();
    this.imagem = atividade.getImagem();
    this.telefone = atividade.getTelefone();
    this.espaco = new EspacoDTO(
        atividade.getNome(),
        atividade.getImagem());
  }

}

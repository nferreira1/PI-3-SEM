package br.edu.senac.models.dtos.Atividade;

import java.util.List;

import br.edu.senac.models.Atividade;
import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AtividadeEspacosDTO {

  private String id;
  private String nome;
  private String local;
  private String imagem;
  private String telefone;
  private List<EspacoDTO> espacos;

  public AtividadeEspacosDTO(Atividade atividade) {
    this.id = atividade.getId();
    this.nome = atividade.getNome();
    this.local = atividade.getLocal();
    this.imagem = atividade.getImagem();
    this.telefone = atividade.getTelefone();
    this.espacos = atividade.getEspacos().stream().map(EspacoDTO::new).toList();
  }

}

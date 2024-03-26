package br.edu.senac.models.dtos.Atividade;

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

}

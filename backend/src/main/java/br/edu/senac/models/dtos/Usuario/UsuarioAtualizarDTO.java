package br.edu.senac.models.dtos.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuarioAtualizarDTO {

  private String nome;
  private String email;
  private String imagem;

}

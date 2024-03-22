package br.edu.senac.models.dtos.usuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuarioCriarDTO {

  private String nome;
  private String email;
  private String imagem = null;
  private String senha;

}

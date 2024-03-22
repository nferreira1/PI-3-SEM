package br.edu.senac.models.dtos.usuario;

import br.edu.senac.models.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuarioDTO {

    private Long id;
    private String nome;
    private String email;
    private String imagem;

}

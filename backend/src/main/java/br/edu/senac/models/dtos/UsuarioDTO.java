package br.edu.senac.models.dtos;

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

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class Criar {
        private String nome;
        private String email;
        private String imagem = null;
        private String senha;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class Atualizar {
        private Long id;
        private String nome;
        private String email;
        private String imagem;
    }

    public UsuarioDTO(Usuario obj) {
        this.id = obj.getId();
        this.nome = obj.getNome();
        this.email = obj.getEmail();
        this.imagem = obj.getImagem();
    }

}

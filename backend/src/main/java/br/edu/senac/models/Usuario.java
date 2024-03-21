package br.edu.senac.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.edu.senac.dtos.UsuarioDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = Usuario.NOME_TABELA)
public class Usuario {

  public static final String NOME_TABELA = "usuarios";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotBlank
  @Size(min = 3, max = 255)
  private String nome;

  @Column(nullable = false, unique = true)
  @NotBlank
  @Size(min = 3, max = 255)
  private String email;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(nullable = false)
  @NotBlank
  @Size(min = 6, max = 50)
  private String senha;

  private String imagem = null;

  @Column(nullable = false)
  private boolean status = true;

  @OneToMany(mappedBy = "usuario")
  private List<Agendamento> agendamentos = new ArrayList<Agendamento>();

  public Usuario(UsuarioDTO.Criar usuario) {
    this.nome = usuario.getNome().toUpperCase();
    this.senha = usuario.getSenha();
    this.email = usuario.getEmail().toLowerCase();
    this.imagem = usuario.getImagem();
  }

  public Usuario(UsuarioDTO.Atualizar usuario) {
    this.nome = usuario.getNome().toUpperCase();
    this.email = usuario.getEmail().toLowerCase();
    this.imagem = usuario.getImagem();
  }

}

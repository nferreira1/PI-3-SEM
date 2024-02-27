package br.edu.senac.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
  @Size(groups = CriarUsuario.class, min = 3, max = 255)
  private String nome;

  @Column(nullable = false, unique = true)
  @NotBlank(groups = { CriarUsuario.class, AtualizarUsuario.class })
  @Size(groups = CriarUsuario.class, min = 3, max = 255)
  private String email;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(nullable = false)
  @NotBlank
  @Size(groups = { CriarUsuario.class, AtualizarUsuario.class }, min = 6, max = 50)
  private String senha;

  private String imageUrl;

  @Column(nullable = false)
  private boolean status;

  public interface CriarUsuario {

  }

  public interface AtualizarUsuario {

  }

}

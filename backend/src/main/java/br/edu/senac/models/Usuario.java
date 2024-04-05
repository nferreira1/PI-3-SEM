package br.edu.senac.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.edu.senac.models.dtos.Login.LoginRequest;
import br.edu.senac.models.dtos.Usuario.UsuarioDTO;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
  @Email(message = "Email inválido")
  private String email;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(nullable = false)
  @NotBlank
  @Size(min = 6)
  private String senha;

  private String imagem = null;

  @Column(nullable = false)
  private boolean status = true;

  @Column(nullable = false)
  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(name = "usuarios_roles", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<Role>();

  @OneToMany(mappedBy = "usuario")
  private List<Agendamento> agendamentos = new ArrayList<Agendamento>();

  public Usuario(UsuarioDTO obj) {
    this.id = obj.getId();
    this.nome = obj.getNome();
    this.email = obj.getEmail();
    this.imagem = obj.getImagem();
  }

  @Override
  public String toString() {
    return "Usuario [email=" + email + ", id=" + id + ", imagem=" + imagem + ", nome=" + nome + ", status=" + status
        + "]";
  }

  public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
    return passwordEncoder.matches(loginRequest.senha(), this.senha);
  }
}

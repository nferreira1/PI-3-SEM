package br.edu.senac.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = Role.NOME_TABELA)
public class Role {

  public static final String NOME_TABELA = "roles";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nome;

  public enum Values {
    ADMIN(1L),
    BASICO(2L);

    Long id;

    Values(Long id) {
      this.id = id;
    }
  }

}

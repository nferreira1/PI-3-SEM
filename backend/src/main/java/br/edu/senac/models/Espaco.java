package br.edu.senac.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = Espaco.NOME_TABELA)
// @Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "nome",
// "atividade_id" }) })
public class Espaco {

  public static final String NOME_TABELA = "espacos";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @Size(min = 3, max = 255)
  private String nome;

  private String imagem;

  @Column(nullable = false)
  private boolean status;

  @OneToMany(mappedBy = "espaco", cascade = CascadeType.ALL)
  private List<EspacoHorario> espacoHorarios = new ArrayList<EspacoHorario>();

  @ManyToOne
  @JoinColumn(name = "atividade_id", nullable = false)
  private Atividade atividade;

  @Override
  public String toString() {
    return "Espaco [id=" + id + ", nome=" + nome + ", imagem=" + imagem + ", status=" + status + "]";
  }

}

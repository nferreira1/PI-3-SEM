package br.edu.senac.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = Servico.NOME_TABELA)
public class Servico {

  public static final String NOME_TABELA = "servicos";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @Size(min = 3, max = 255)
  private String nome;

  private String imagem;

  @ManyToOne
  @JoinColumn(name = "atividade_id", nullable = false)
  private Atividade atividade;

}

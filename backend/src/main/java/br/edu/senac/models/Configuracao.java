package br.edu.senac.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = Configuracao.NOME_TABELA)
@Table(name = Configuracao.NOME_TABELA)
public class Configuracao {

  public static final String NOME_TABELA = "configuracoes";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String nome;

  @Column(nullable = false)
  private String valor;

  @Column(nullable = false)
  private String descricao;

  @Column(nullable = false)
  @JsonIgnore
  private boolean status = true;

}

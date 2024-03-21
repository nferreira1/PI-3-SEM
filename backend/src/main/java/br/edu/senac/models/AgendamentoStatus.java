package br.edu.senac.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = AgendamentoStatus.NOME_TABELA)
public class AgendamentoStatus {

  public static final String NOME_TABELA = "agendamentos_status";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private byte id;

  @Column(nullable = false)
  private String nome;

}
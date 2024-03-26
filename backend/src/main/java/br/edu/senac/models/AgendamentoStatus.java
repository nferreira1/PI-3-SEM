package br.edu.senac.models;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Entity(name = AgendamentoStatus.NOME_TABELA)
public class AgendamentoStatus {

  public static final String NOME_TABELA = "agendamentos_status";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(type = "integer")
  private byte id;

  @Column(nullable = false)
  private String nome;

}

package br.edu.senac.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = AvaliacaoAgendamento.NOME_TABELA)
public class AvaliacaoAgendamento {

  public static final String NOME_TABELA = "avaliacoes_agendamentos";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotNull
  @Min(value = 1, message = "A nota deve ser maior ou igual a 1")
  @Max(value = 5, message = "A nota deve ser menor ou igual a 5")
  private byte nota;

  @Column(nullable = false)
  @NotNull
  private LocalDateTime dataAvaliacao;

  @OneToOne
  @JoinColumn(name = "agendamento_id", nullable = false)
  private Agendamento agendamento;

}

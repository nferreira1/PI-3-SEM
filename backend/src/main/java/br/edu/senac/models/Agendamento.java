package br.edu.senac.models;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = Agendamento.NOME_TABELA)
public class Agendamento {

  public static final String NOME_TABELA = "agendamentos";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = false, updatable = false)
  private Usuario usuario;

  @Column(nullable = false)
  @NotBlank
  private LocalDate dataAgendamento;

  @Column(nullable = false, columnDefinition = "time")
  @NotBlank
  private LocalTime horaAgendamento;

  @Column(nullable = false)
  @NotBlank
  private boolean status;

}

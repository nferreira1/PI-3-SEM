package br.edu.senac.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = Agendamento.NOME_TABELA)
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = { "dataAgendamento", "horaAgendamento", "status_id", "usuario_id" })
})
public class Agendamento {

  public static final String NOME_TABELA = "agendamentos";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  @NotNull
  private LocalDate dataAgendamento;

  @ManyToOne
  @JoinColumn(name = "espaco_horario_id", nullable = false)
  private EspacoHorario espacoHorario;

  @ManyToOne
  @JoinColumn(name = "status_id", nullable = false)
  private AgendamentoStatus status;

  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = false, updatable = false)
  private Usuario usuario;

  @Override
  public String toString() {
    return "Agendamento [dataAgendamento=" + dataAgendamento + ", horaAgendamento=" + ", id=" + id
        + ", status=" + status + ", usuario=" + usuario.getNome() + "]";
  }

}

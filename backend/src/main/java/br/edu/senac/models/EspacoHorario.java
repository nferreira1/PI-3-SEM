package br.edu.senac.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = EspacoHorario.NOME_TABELA)
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = { "espaco_id", "horario_id" })
})
public class EspacoHorario {

  public static final String NOME_TABELA = "espacos_horarios";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "espacoHorario")
  private List<Agendamento> agendamentos = new ArrayList<Agendamento>();

  @ManyToOne
  @JoinColumn(name = "espaco_id")
  private Espaco espaco;

  @ManyToOne
  @JoinColumn(name = "horario_id")
  private Horario horario;

  @Override
  public String toString() {
    return "EspacoHorario [id=" + id + ", agendamentos=" + null + ", espaco=" + espaco + ", horario="
        + horario
        + "]";
  }

}

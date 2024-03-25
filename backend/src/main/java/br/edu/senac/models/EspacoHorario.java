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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = EspacoHorario.NOME_TABELA)
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

}

package br.edu.senac.models;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = Horario.NOME_TABELA)
public class Horario {

  public static final String NOME_TABELA = "horarios";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, columnDefinition = "time")
  @NotNull
  private LocalTime horarioInicial;

  @Column(nullable = false, columnDefinition = "time")
  @NotNull
  private LocalTime horarioFinal;

  @Column(nullable = false)
  @NotNull
  private boolean status;

  @OneToMany(mappedBy = "horario", cascade = CascadeType.ALL)
  private List<EspacoHorario> espacoHorarios = new ArrayList<>();

}

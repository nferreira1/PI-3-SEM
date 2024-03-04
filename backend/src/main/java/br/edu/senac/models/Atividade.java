package br.edu.senac.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = Atividade.NOME_TABELA)
public class Atividade {

  public static final String NOME_TABELA = "atividades";

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  @NotBlank
  @Size(min = 3, max = 255)
  private String nome;

  @Column(nullable = false)
  @NotBlank
  @Size(max = 255)
  private String local;

  private String imagem;

  @Column(nullable = false, length = 15)
  @NotBlank
  @Size(min = 14, max = 15)
  private String telefone;

  @Column(nullable = false)
  @NotBlank
  private boolean status;

  @OneToMany(mappedBy = "atividade")
  private List<Servico> servicos = new ArrayList<Servico>();

}
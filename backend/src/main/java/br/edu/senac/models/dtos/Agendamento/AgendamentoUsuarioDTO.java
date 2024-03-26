package br.edu.senac.models.dtos.Agendamento;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.dtos.Usuario.UsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AgendamentoUsuarioDTO extends AgendamentoDTO {

  private UsuarioDTO usuario;

  public AgendamentoUsuarioDTO(Agendamento agendamento) {
    super(agendamento);
    this.usuario = new UsuarioDTO(agendamento.getUsuario().getId(),
        agendamento.getUsuario().getNome(),
        agendamento.getUsuario().getEmail(),
        agendamento.getUsuario().getImagem());
  }

}

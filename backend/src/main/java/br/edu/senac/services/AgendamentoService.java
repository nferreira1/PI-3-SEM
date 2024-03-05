package br.edu.senac.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.Usuario;
import br.edu.senac.repositories.AgendamentoRepository;

public class AgendamentoService {

  @Autowired
  private AgendamentoRepository agendamentoRepository;

  @Autowired
  private UsuarioService usuarioService;

  public Agendamento findById(@NonNull Long id) {
    Optional<Agendamento> agendamento = this.agendamentoRepository.findById(id);

    return agendamento
        .orElseThrow(
            () -> new RuntimeException("Agendamento não encontrado" + id + ",  tipo: " + Agendamento.class.getName()));
  }

  @Transactional
  public Agendamento create(@NonNull Agendamento obj) {

    Usuario usuario = this.usuarioService.findById(obj.getUsuario().getId());
    obj.setId(null);
    obj.setUsuario(usuario);
    obj = this.agendamentoRepository.save(obj);

    return obj;
  }

  @Transactional
  public void update(@NonNull Long id, @NonNull Agendamento.Status status) {

    findById(id);

    this.agendamentoRepository.alterarStatus(id, status);

  }

}

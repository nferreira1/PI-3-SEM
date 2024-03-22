package br.edu.senac.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.Usuario;
import br.edu.senac.repositories.AgendamentoRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class AgendamentoService {

  @Autowired
  private AgendamentoRepository agendamentoRepository;

  @Autowired
  private UsuarioService usuarioService;

  public Agendamento buscarPorId(@NonNull Long id) {
    Optional<Agendamento> agendamento = this.agendamentoRepository.findById(id);

    return agendamento.orElseThrow(() -> new ObjectNotFoundException("Agendamento não encontrado!"));
  }

  public List<Agendamento> buscarTodosPorIdUsuario(@NonNull Long id) {
    return this.agendamentoRepository.buscarTodosPorIdUsuario(id);
  }

  @Transactional
  public Agendamento criar(@NonNull Agendamento obj) {

    Usuario usuario = this.usuarioService.buscarPorId(obj.getUsuario().getId());
    obj.setId(null);
    obj.setUsuario(usuario);
    obj = this.agendamentoRepository.save(obj);

    return obj;
  }

}

package br.edu.senac.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.edu.senac.models.Agendamento;
import br.edu.senac.models.dtos.agendamento.AgendamentoDTO;
import br.edu.senac.services.AgendamentoService;
import br.edu.senac.services.UsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Agendamento", description = "API de Agendamento")
@RestController
@RequestMapping("/agendamento")
@Validated
public class AgendamentoController {

  @Autowired
  private AgendamentoService agendamentoService;

  @Autowired
  private UsuarioService usuarioService;

  @GetMapping("/{id}")
  public ResponseEntity<AgendamentoDTO> buscarPorId(@PathVariable @NonNull Long id) {

    Agendamento agendamento = this.agendamentoService.buscarPorId(id);

    return ResponseEntity.ok().body(new AgendamentoDTO(agendamento));
  }

  @GetMapping("/usuario/{id}")
  public ResponseEntity<List<AgendamentoDTO>> buscarTodosPorIdUsuario(@PathVariable @NonNull Long id) {

    this.usuarioService.buscarPorId(id);
    List<Agendamento> agendamentos = this.agendamentoService.buscarTodosPorIdUsuario(id);

    return ResponseEntity.ok().body(agendamentos.stream().map(AgendamentoDTO::new).toList());
  }

  @PostMapping
  public ResponseEntity<Void> criar(@Valid @RequestBody @NonNull Agendamento obj) {

    this.agendamentoService.criar(obj);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();

    return ResponseEntity.created(uri).build();
  }

}

package br.edu.senac.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.senac.models.Configuracao;
import br.edu.senac.services.ConfiguracaoService;
import br.edu.senac.tasks.agendamento.AgendamentoConfirmarTask;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "Configurações", description = "API de gerenciamento de configurações, onde é possível criar, listar, atualizar e excluir configurações. ")
@RestController
@RequestMapping("/configuracao")
@Validated
public class ConfiguracaoController {

  @Autowired
  private AgendamentoConfirmarTask agendamentoConfirmarTask;

  @Autowired
  private ConfiguracaoService configuracaoService;

  @GetMapping
  public List<Configuracao> buscarTodos() {
    return configuracaoService.findAll();
  }

  @GetMapping("/{id}")
  public Configuracao buscarPorId(Long id) {
    return configuracaoService.findById(id);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
  public ResponseEntity<Void> deletar(Long id) {

    this.buscarPorId(id);

    configuracaoService.alternarStatus(id);

    HttpStatus statusCode = HttpStatus.NO_CONTENT;

    return new ResponseEntity<>(statusCode);
  }

  @PostMapping
  @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
  public ResponseEntity<Void> criar(@RequestBody Configuracao obj) {
    configuracaoService.criar(obj);

    HttpStatus statusCode = HttpStatus.CREATED;

    return new ResponseEntity<>(statusCode);
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
  public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody Configuracao obj) {
    configuracaoService.atualizar(obj, id);
    agendamentoConfirmarTask.reagendarTask();

    return ResponseEntity.noContent().build();
  }

}

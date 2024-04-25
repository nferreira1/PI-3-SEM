package br.edu.senac.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.senac.models.Configuracao;
import br.edu.senac.services.ConfiguracaoService;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Configurações", description = "API de gerenciamento de configurações, onde é possível criar, listar, atualizar e excluir configurações. ")
@RestController
@RequestMapping("/configuracao")
@Validated
public class ConfiguracaoController {

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
  public ResponseEntity<Void> deletar(Long id) {

    this.buscarPorId(id);

    configuracaoService.alternarStatus(id);

    HttpStatus statusCode = HttpStatus.NO_CONTENT;

    return new ResponseEntity<>(statusCode);
  }

  @PostMapping
  public ResponseEntity<Void> criar(@RequestBody Configuracao obj) {
    configuracaoService.criar(obj);

    HttpStatus statusCode = HttpStatus.CREATED;

    return new ResponseEntity<>(statusCode);
  }

}

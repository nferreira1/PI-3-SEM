package br.edu.senac.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.edu.senac.models.AvaliacaoAgendamento;
import br.edu.senac.models.dtos.AvaliacaoAgendamento.AvaliacaoAgendamentoDTO;
import br.edu.senac.models.dtos.AvaliacaoAgendamento.AvaliacaoAgendamentoCriarDTO;
import br.edu.senac.services.AvaliacaoAgendamentoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Avaliação", description = "API de gerenciamento de avaliações, onde é possível criar e listar avaliações.")
@RestController
@RequestMapping("/avaliacao")
@Validated
public class AvaliacaoAgendamentoController {

  @Autowired
  private AvaliacaoAgendamentoService avaliacaoAgendamentoService;

  @GetMapping("/quantidade/{id}")
  public ResponseEntity<AvaliacaoAgendamentoDTO> buscarQuantidadePorIdAtividade(@PathVariable String id) {

    AvaliacaoAgendamentoDTO avaliacao = this.avaliacaoAgendamentoService.buscarQuantidadePorIdAtividade(id);

    return ResponseEntity.ok().body(avaliacao);
  }

  @PostMapping
  public ResponseEntity<Void> criar(@RequestBody AvaliacaoAgendamentoCriarDTO obj) {

    AvaliacaoAgendamento avaliacaoAgendamento = this.avaliacaoAgendamentoService.criar(obj);

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(avaliacaoAgendamento.getId())
        .toUri();

    return ResponseEntity.created(uri).build();
  }

}

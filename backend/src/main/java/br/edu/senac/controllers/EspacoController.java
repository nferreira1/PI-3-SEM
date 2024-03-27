package br.edu.senac.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.senac.models.Espaco;
import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import br.edu.senac.services.EspacoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "Espaço", description = "API de gerenciamento de espaços, onde é possível criar, listar, atualizar e excluir espaços.")
@RestController
@RequestMapping("/espacos")
@Validated
public class EspacoController {

  @Autowired
  private EspacoService espacoService;

  @GetMapping("{atividadeId}")
  public ResponseEntity<List<EspacoDTO>> buscarTodosServicosPorId(@PathVariable @NonNull String atividadeId) {

    List<Espaco> espacos = this.espacoService.buscarTodosServicosPorId(atividadeId);

    return ResponseEntity.ok().body(espacos.stream().map(EspacoDTO::new).toList());
  }

}

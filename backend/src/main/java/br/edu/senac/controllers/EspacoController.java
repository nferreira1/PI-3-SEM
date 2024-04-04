package br.edu.senac.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.edu.senac.models.Espaco;
import br.edu.senac.models.dtos.Espaco.EspacoCriarDTO;
import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import br.edu.senac.models.dtos.Espaco.EspacoHorariosDTO;
import br.edu.senac.models.dtos.EspacoHorario.EspacoHorarioDTO;
import br.edu.senac.services.EspacoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Espaço", description = "API de gerenciamento de espaços, onde é possível criar, listar, atualizar e excluir espaços.")
@RestController
@RequestMapping("/espaco")
@Validated
public class EspacoController {

  @Autowired
  private EspacoService espacoService;

  @GetMapping("{atividadeId}")
  public ResponseEntity<List<EspacoHorariosDTO>> buscarTodosServicosPorId(@PathVariable @NonNull String atividadeId) {

    List<Espaco> espacos = this.espacoService.buscarTodosServicosPorId(atividadeId);

    List<EspacoHorariosDTO> espacosComHorarios = espacos.stream().map(espaco -> {

      List<EspacoHorarioDTO> horarios = espaco.getEspacoHorarios().stream().map(horario -> {
        return new EspacoHorarioDTO(horario.getHorario().getHorarioInicial().toString(),
            horario.getHorario().getHorarioFinal().toString());
      }).toList();

      return new EspacoHorariosDTO(espaco.getNome(), espaco.getImagem(), horarios);
    }).toList();

    return ResponseEntity.ok().body(espacosComHorarios);
  }

  @PostMapping
  @Validated
  public ResponseEntity<Void> criar(@RequestBody EspacoCriarDTO obj) {

    Espaco espaco = this.espacoService.criar(obj);

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(espaco.getId()).toUri();

    return ResponseEntity.created(uri).build();
  }

}

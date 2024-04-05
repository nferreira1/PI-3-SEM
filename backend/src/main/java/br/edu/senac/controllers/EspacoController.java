package br.edu.senac.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.edu.senac.models.Espaco;
import br.edu.senac.models.dtos.Espaco.EspacoCriarDTO;
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
    List<Espaco> espacos = this.espacoService.buscarTodosEspacosHorarios(atividadeId);

    Map<String, EspacoHorariosDTO> espacosMap = new HashMap<>();

    espacos.forEach(espaco -> {
      EspacoHorariosDTO dto = espacosMap.computeIfAbsent(espaco.getNome(),
          k -> new EspacoHorariosDTO(espaco.getNome(), espaco.getImagem(), new ArrayList<>()));

      Set<EspacoHorarioDTO> horariosSet = new LinkedHashSet<>(dto.getHorarios());

      horariosSet.addAll(espaco.getEspacoHorarios().stream().map(horario -> new EspacoHorarioDTO(
          horario.getHorario().getHorarioInicial().toString(),
          horario.getHorario().getHorarioFinal().toString())).collect(Collectors.toList()));

      dto.setHorarios(new ArrayList<>(horariosSet));
    });

    List<EspacoHorariosDTO> espacosComHorarios = new ArrayList<>(espacosMap.values());

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

package br.edu.senac.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.edu.senac.models.Atividade;
import br.edu.senac.models.dtos.Atividade.AtividadeEspacoDTO;
import br.edu.senac.models.dtos.Atividade.AtividadeIdDTO;
import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import br.edu.senac.services.AtividadeService;
import br.edu.senac.services.EspacoService;
import io.micrometer.common.lang.NonNull;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "Atividade", description = "API de gerenciamento de atividades, onde é possível criar, editar, excluir e listar atividades.")
@RestController
@RequestMapping("/atividade")
@Validated
public class AtividadeController {

  @Autowired
  private AtividadeService atividadeService;

  @Autowired
  private EspacoService espacoService;

  @GetMapping
  // @PreAuthorize("hasAuthority('SCOPE_BASICO')")
  public ResponseEntity<List<AtividadeIdDTO>> buscarTodasAtividades() {

    List<Atividade> atividades = this.atividadeService.buscarTodasAtividades();

    return ResponseEntity.ok().body(atividades.stream().map(AtividadeIdDTO::new).toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<AtividadeEspacoDTO> buscarPorId(@PathVariable @NonNull String id) {

    Atividade atividade = this.atividadeService.buscarPorId(id);

    List<EspacoDTO> espacos = this.espacoService.buscarTodosEspacos(id).stream().map(EspacoDTO::new).toList();

    // List<Espaco> espacos = this.espacoService.buscarTodosEspacosHorarios(id);

    // Map<String, EspacoHorariosDTO> espacosMap = new HashMap<>();

    // espacos.forEach(espaco -> {
    // EspacoHorariosDTO dto = espacosMap.computeIfAbsent(espaco.getNome(),
    // k -> new EspacoHorariosDTO(espaco.getNome(), espaco.getImagem(), new
    // ArrayList<>()));

    // Set<EspacoHorarioDTO> horariosSet = new LinkedHashSet<>(dto.getHorarios());

    // horariosSet.addAll(espaco.getEspacoHorarios().stream().map(horario -> new
    // EspacoHorarioDTO(
    // horario.getHorario().getHorarioInicial().toString(),
    // horario.getHorario().getHorarioFinal().toString())).collect(Collectors.toList()));

    // dto.setHorarios(new ArrayList<>(horariosSet));
    // });

    // List<EspacoHorariosDTO> espacosComHorarios = new
    // ArrayList<>(espacosMap.values());

    // for (EspacoHorariosDTO espaco : espacosComHorarios) {
    // Collections.sort(espaco.getHorarios(), new Comparator<EspacoHorarioDTO>() {
    // @Override
    // public int compare(EspacoHorarioDTO h1, EspacoHorarioDTO h2) {
    // return h1.getHorarioInicial().compareTo(h2.getHorarioInicial());
    // }
    // });
    // }

    // AtividadeEspacoDTO atividadeComEspacosHorario = new
    // AtividadeEspacoDTO(atividade, espacosComHorarios);

    AtividadeEspacoDTO atividadeComEspacosHorario = new AtividadeEspacoDTO(atividade, espacos);

    return ResponseEntity.ok().body(atividadeComEspacosHorario);
  }

  @PostMapping
  public ResponseEntity<Void> criar(@Valid @RequestBody @NonNull Atividade obj) {

    Atividade atividade = this.atividadeService.criar(obj);

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(atividade.getId()).toUri();

    return ResponseEntity.created(uri).build();
  }

}

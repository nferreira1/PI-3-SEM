package br.edu.senac.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.edu.senac.models.Usuario;
import br.edu.senac.models.dtos.Usuario.UsuarioAtualizarDTO;
import br.edu.senac.models.dtos.Usuario.UsuarioCriarDTO;
import br.edu.senac.models.dtos.Usuario.UsuarioDTO;
import br.edu.senac.services.UsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@Tag(name = "Usuário", description = "API de Usuário")
@RestController
@RequestMapping("/usuario")
@Validated
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioService;

  @GetMapping("/{id}")
  public ResponseEntity<UsuarioDTO> buscarPorId(@PathVariable @NonNull Long id) {

    Usuario usuario = this.usuarioService.buscarPorId(id);

    return ResponseEntity.ok()
        .body(new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getImagem()));
  }

  @PostMapping
  @Validated
  public ResponseEntity<Void> criar(@Valid @RequestBody UsuarioCriarDTO obj) {

    Usuario usuario = this.usuarioService.criar(obj);

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(usuario.getId()).toUri();

    return ResponseEntity.created(uri).build();
  }

  @PutMapping("/{id}")
  @Validated
  public ResponseEntity<Void> atualizar(@Valid @RequestBody UsuarioAtualizarDTO obj, @PathVariable Long id) {

    this.usuarioService.atualizar(obj, id);

    return ResponseEntity.noContent().build();
  }

  @PutMapping("/alternar-status/{id}")
  public ResponseEntity<Void> alternarStatus(@PathVariable @NonNull Long id) {

    this.usuarioService.buscarPorId(id);

    this.usuarioService.alternarStatus(id);

    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> excluir(@PathVariable @NonNull Long id) {

    this.usuarioService.excluir(id);

    return ResponseEntity.noContent().build();
  }

}

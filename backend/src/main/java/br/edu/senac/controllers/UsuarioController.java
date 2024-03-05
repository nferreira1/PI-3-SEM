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

import br.edu.senac.models.Usuario;
import br.edu.senac.models.Usuario.AtualizarUsuario;
import br.edu.senac.models.Usuario.CriarUsuario;
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

  @GetMapping
  public ResponseEntity<List<Usuario>> buscarTodos() {

    List<Usuario> list = this.usuarioService.buscarTodos();

    return ResponseEntity.ok().body(list);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Usuario> buscarPorId(@PathVariable @NonNull Long id) {

    Usuario usuario = this.usuarioService.buscarPorId(id);

    return ResponseEntity.ok().body(usuario);
  }

  @PostMapping
  @Validated(CriarUsuario.class)
  public ResponseEntity<Void> criar(@Valid @RequestBody Usuario obj) {

    this.usuarioService.criar(obj);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();

    return ResponseEntity.created(uri).build();
  }

  @PutMapping("/{id}")
  @Validated(AtualizarUsuario.class)
  public ResponseEntity<Void> atualizar(@Valid @RequestBody Usuario obj, @PathVariable Long id) {

    obj.setId(id);
    this.usuarioService.atualizar(obj);

    return ResponseEntity.noContent().build();
  }

  @PutMapping("/alternar-status/{id}")
  public String alternarStatus(@PathVariable String id, @RequestBody String entity) {

    return entity;
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> excluir(@PathVariable @NonNull Long id) {

    this.usuarioService.excluir(id);

    return ResponseEntity.noContent().build();
  }

}

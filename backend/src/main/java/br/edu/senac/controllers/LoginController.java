package br.edu.senac.controllers;

import java.nio.file.attribute.UserPrincipalNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.senac.models.dtos.Usuario.LoginDTO;
import br.edu.senac.models.dtos.Usuario.UsuarioDTO;
import br.edu.senac.services.UsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Login", description = "API de gerenciamento de login, onde é possível realizar login.")
@RestController
@RequestMapping("/login")
@Validated
public class LoginController {

  @Autowired
  private UsuarioService usuarioService;

  @PostMapping
  public ResponseEntity<UsuarioDTO> login(@RequestBody LoginDTO obj) throws UserPrincipalNotFoundException {
    return ResponseEntity.ok().body(this.usuarioService.login(obj));
  }

}

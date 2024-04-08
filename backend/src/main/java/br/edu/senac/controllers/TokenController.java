package br.edu.senac.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.edu.senac.models.dtos.Login.LoginRequest;
import br.edu.senac.models.dtos.Login.LoginResponse;
import br.edu.senac.repositories.UsuarioRepository;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.Instant;

@Tag(name = "Login", description = "API de gerenciamento de login, onde é possível realizar o login.")
@RestController
public class TokenController {

  @Autowired
  private JwtEncoder jwtEncoder;

  @Autowired
  private UsuarioRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder senhaEncoder;

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

    var usuario = userRepository.findByEmailAndStatusTrue(loginRequest.email());

    if (usuario.isEmpty() || !usuario.get().isLoginCorrect(loginRequest, senhaEncoder)) {
      throw new BadCredentialsException("Usuário ou senha inválidos");
    }

    var agora = Instant.now();
    var expiraEm = 60 * 60 * 2; // 2 horas

    var roles = usuario.get().getRoles().stream()
        .map(role -> role.getNome().toUpperCase())
        .toList();

    var claims = JwtClaimsSet.builder()
        .issuer("SysClub")
        .claim("id", usuario.get().getId().toString())
        .claim("nome", usuario.get().getNome())
        .claim("email", usuario.get().getEmail())
        .claim("imagem", usuario.get().getImagem() != null ? usuario.get().getImagem() : "")
        .claim("roles", roles)
        .issuedAt(agora)
        .expiresAt(agora.plusSeconds(expiraEm))
        .build();

    var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    return ResponseEntity.ok(new LoginResponse(jwtValue));
  }
}
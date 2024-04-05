package br.edu.senac.config;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.edu.senac.models.Role;
import br.edu.senac.models.Usuario;
import br.edu.senac.repositories.RoleRepository;
import br.edu.senac.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;

@Configuration
public class AdminUsuarioConfig implements CommandLineRunner {

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private BCryptPasswordEncoder senhaEncoder;

  @Override
  @Transactional
  public void run(String... args) throws Exception {

    var roleAdmin = roleRepository.findByNome(Role.Values.ADMIN.name());
    var usuarioAdmin = usuarioRepository.findByIdAndStatusTrueAndRoleAdmin((long) 1);

    usuarioAdmin.ifPresentOrElse(
        (usuario) -> {
          System.out.println("Usuário admin já existe");
        },
        () -> {
          Usuario usuario = new Usuario();
          usuario.setNome("ROOT");
          usuario.setEmail("nathan.1402@hotmail.com");
          usuario.setSenha(senhaEncoder.encode("Nathansupergato14!"));
          usuario.setStatus(true);
          usuario.setRoles(Set.of(roleAdmin));
          usuarioRepository.save(usuario);
        });
  }

}

package br.edu.senac.services;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.senac.email.UsuarioEmailComponente;
import br.edu.senac.models.Role;
import br.edu.senac.models.Usuario;
import br.edu.senac.models.dtos.Usuario.UsuarioAtualizarDTO;
import br.edu.senac.models.dtos.Usuario.UsuarioCriarDTO;
import br.edu.senac.repositories.RoleRepository;
import br.edu.senac.repositories.UsuarioRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private BCryptPasswordEncoder senhaEncoder;

  @Autowired
  private UsuarioEmailComponente usuarioEmailComponente;

  public Usuario buscarPorId(@NonNull Long id) {

    Optional<Usuario> usuario = this.usuarioRepository.findByIdAndStatusTrue(id);

    return usuario.orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado!"));
  }

  @Transactional
  public Usuario criar(UsuarioCriarDTO obj) {

    Role roleBasica = roleRepository.findByNome(Role.Values.BASICO.name());
    Usuario usuario = new Usuario();

    usuario.setNome(obj.getNome().toUpperCase());
    usuario.setEmail(obj.getEmail().toLowerCase());
    usuario.setSenha(senhaEncoder.encode(obj.getSenha()));
    usuario.setImagem(obj.getImagem());
    usuario.setRoles(Set.of(roleBasica));
    this.usuarioRepository.save(usuario);

    this.usuarioEmailComponente.enviarEmailBoasVindas(usuario);
    return usuario;
  }

  @Transactional
  public Usuario atualizar(@NonNull UsuarioAtualizarDTO obj, Long id) {

    Usuario usuario = buscarPorId(id);
    usuario.setNome(obj.getNome().toUpperCase());
    usuario.setEmail(obj.getEmail().toLowerCase());
    usuario.setImagem(obj.getImagem());

    return this.usuarioRepository.save(usuario);
  }

  public void excluir(@NonNull Long id) {

    buscarPorId(id);

    this.usuarioRepository.excluir(id);
  }

  public void alternarStatus(@NonNull Long id) {

    Optional<Usuario> obj = this.usuarioRepository.findById(id);
    Usuario usuario = obj.get();
    usuario.setStatus(!usuario.isStatus());

    this.usuarioRepository.save(usuario);
  }

}

package br.edu.senac.services;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.Optional;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

import br.edu.senac.models.Usuario;
import br.edu.senac.models.dtos.Usuario.LoginDTO;
import br.edu.senac.models.dtos.Usuario.UsuarioAtualizarDTO;
import br.edu.senac.models.dtos.Usuario.UsuarioCriarDTO;
import br.edu.senac.models.dtos.Usuario.UsuarioDTO;
import br.edu.senac.repositories.UsuarioRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
@EnableEncryptableProperties
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public Usuario buscarPorId(@NonNull Long id) {

    Optional<Usuario> usuario = this.usuarioRepository.findByIdAndStatusTrue(id);

    return usuario.orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado!"));
  }

  @Transactional
  public Usuario criar(UsuarioCriarDTO obj) {

    Usuario usuario = new Usuario();
    StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();

    usuario.setNome(obj.getNome().toUpperCase());
    usuario.setEmail(obj.getEmail().toLowerCase());
    usuario.setSenha(passwordEncryptor.encryptPassword(obj.getSenha()));
    usuario.setImagem(obj.getImagem());

    return this.usuarioRepository.save(usuario);
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

  public UsuarioDTO login(@NonNull LoginDTO obj) throws UserPrincipalNotFoundException {

    Optional<Usuario> usuario = this.usuarioRepository.findByEmailAndStatusTrue(obj.getEmail().toLowerCase());

    if (usuario.isEmpty()) {
      throw new UserPrincipalNotFoundException("Credenciais inválidas!");
    }

    StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();

    if (!passwordEncryptor.checkPassword(obj.getSenha(), usuario.get().getSenha())) {
      throw new UserPrincipalNotFoundException("Credenciais inválidas!");
    }

    UsuarioDTO usuarioDTO = new UsuarioDTO();
    usuarioDTO.setId(usuario.get().getId());
    usuarioDTO.setNome(usuario.get().getNome());
    usuarioDTO.setEmail(usuario.get().getEmail());
    usuarioDTO.setImagem(usuario.get().getImagem());

    return usuarioDTO;
  }
}

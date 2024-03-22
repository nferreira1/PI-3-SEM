package br.edu.senac.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.senac.models.Usuario;
import br.edu.senac.models.dtos.UsuarioDTO;
import br.edu.senac.repositories.UsuarioRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;
import jakarta.validation.Valid;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public Usuario buscarPorId(@NonNull Long id) {

    Optional<Usuario> usuario = this.usuarioRepository.buscarPorId(id);

    return usuario.orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado!"));
  }

  @Transactional
  public Usuario criar(Usuario obj) {
    obj.setSenha(obj.getSenha());
    obj.setEmail(obj.getEmail().toLowerCase());
    obj.setNome(obj.getNome().toUpperCase());

    return this.usuarioRepository.save(obj);
  }

  @Transactional
  public Usuario atualizar(@NonNull UsuarioDTO.Atualizar obj, Long id) {

    Usuario novoObj = buscarPorId(id);
    novoObj.setNome(obj.getNome().toUpperCase());
    novoObj.setEmail(obj.getEmail().toLowerCase());
    novoObj.setImagem(obj.getImagem());

    return this.usuarioRepository.save(novoObj);
  }

  public void excluir(@NonNull Long id) {

    buscarPorId(id);

    this.usuarioRepository.excluir(id);
  }

  public void alternarStatus(@NonNull Long id) {

    Optional<Usuario> obj = this.usuarioRepository.findById(id);
    var usuario = obj.get();
    usuario.setStatus(!usuario.isStatus());

    this.usuarioRepository.save(usuario);
  }

  public Usuario fromDTO(@Valid UsuarioDTO.Criar obj) {

    Usuario usuario = new Usuario();

    usuario.setNome(obj.getNome().toUpperCase());
    usuario.setEmail(obj.getEmail().toLowerCase());
    usuario.setSenha(obj.getSenha());
    usuario.setImagem(obj.getImagem());

    return usuario;
  }

  public Usuario fromDTO(@Valid UsuarioDTO.Atualizar obj) {

    Usuario usuario = new Usuario();

    usuario.setId(obj.getId());
    usuario.setNome(obj.getNome().toUpperCase());
    usuario.setEmail(obj.getEmail().toLowerCase());
    usuario.setImagem(obj.getImagem());

    return usuario;
  }
}

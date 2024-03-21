package br.edu.senac.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.senac.dtos.UsuarioDTO;
import br.edu.senac.models.Usuario;
import br.edu.senac.repositories.UsuarioRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public Usuario buscarPorId(@NonNull Long id) {

    Optional<Usuario> usuario = this.usuarioRepository.findById(id);

    return usuario.orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado!"));

  }

  public List<Usuario> buscarTodos() {
    return this.usuarioRepository.findAll();
  }

  @Transactional
  public Usuario criar(UsuarioDTO.Criar obj) {

    Usuario usuario = new Usuario(obj);

    this.usuarioRepository.save(usuario);

    return usuario;
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

    this.usuarioRepository.alternarStatus(id);

  }

  public void alternarStatus(@NonNull Long id) {

    Usuario obj = buscarPorId(id);
    obj.setStatus(!obj.isStatus());

    this.usuarioRepository.save(obj);
  }
}

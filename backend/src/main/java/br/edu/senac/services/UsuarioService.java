package br.edu.senac.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.senac.models.Usuario;
import br.edu.senac.repositories.UsuarioRepository;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public Usuario buscarPorId(@NonNull Long id) {

    Optional<Usuario> usuario = this.usuarioRepository.findById(id);

    return usuario
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado" + id + ",  tipo: " + Usuario.class.getName()));
  }

  public List<Usuario> buscarTodos() {
    return this.usuarioRepository.findAll();
  }

  @Transactional
  public Usuario criar(Usuario obj) {
    obj.setId(null);
    obj.setEmail(obj.getEmail().toLowerCase());
    obj.setNome(obj.getNome().toUpperCase());

    obj = this.usuarioRepository.save(obj);

    return obj;
  }

  @Transactional
  public Usuario atualizar(@NonNull Usuario obj) {

    Usuario novoObj = buscarPorId(obj.getId());
    novoObj.setNome(obj.getNome().toUpperCase());
    novoObj.setSenha(obj.getSenha());
    novoObj.setEmail(obj.getEmail().toLowerCase());
    novoObj.setImagem(obj.getImagem());

    return this.usuarioRepository.save(novoObj);
  }

  public void excluir(@NonNull Long id) {

    buscarPorId(id);

    this.usuarioRepository.alterarStatus(id);

  }

}

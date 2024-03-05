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

  public Usuario findById(@NonNull Long id) {

    Optional<Usuario> usuario = this.usuarioRepository.findById(id);

    return usuario
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado" + id + ",  tipo: " + Usuario.class.getName()));
  }

  public List<Usuario> findAll() {
    return this.usuarioRepository.findAll();
  }

  @Transactional
  public Usuario create(Usuario obj) {

    obj.setId(null);
    obj = this.usuarioRepository.save(obj);

    return obj;
  }

  @Transactional
  public Usuario update(@NonNull Usuario obj) {

    Usuario novoObj = findById(obj.getId());
    novoObj.setSenha(obj.getSenha());

    return this.usuarioRepository.save(novoObj);
  }

  public void delete(@NonNull Long id) {

    findById(id);

    this.usuarioRepository.alterarStatus(id);

  }

}

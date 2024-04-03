package br.edu.senac.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Usuario;
import jakarta.transaction.Transactional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  Optional<Usuario> findByIdAndStatusTrue(Long id);

  Optional<Usuario> findByEmailAndStatusTrue(String email);

  @Modifying
  @Transactional
  @Query(nativeQuery = true, value = "UPDATE usuarios SET status = 0 WHERE id = :id")
  void excluir(@Param("id") Long id);

  @Modifying
  @Transactional
  @Query(nativeQuery = true, value = "UPDATE usuarios SET status = 0 WHERE id = :id")
  void alternarStatus(@Param("id") Long id);

}

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

  @Query(nativeQuery = true, value = "SELECT U.id, U.email, U.imagem, U.nome, U.senha, U.status, UR.usuario_id, UR.role_id, R.id AS role_id_tabela_role, R.nome AS role_nome FROM usuarios AS U INNER JOIN usuarios_roles AS UR ON U.id = UR.usuario_id INNER JOIN roles AS R ON UR.role_id = R.id WHERE U.id = 1 AND U.status = TRUE AND R.id = 1")
  Optional<Usuario> findByIdAndStatusTrueAndRoleAdmin(@Param("id") Long id);

  @Modifying
  @Transactional
  @Query(nativeQuery = true, value = "UPDATE usuarios SET status = 0 WHERE id = :id")
  void excluir(@Param("id") Long id);

  @Modifying
  @Transactional
  @Query(nativeQuery = true, value = "UPDATE usuarios SET status = 0 WHERE id = :id")
  void alternarStatus(@Param("id") Long id);

}

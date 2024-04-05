package br.edu.senac.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.senac.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

  Role findByNome(String nome);

}

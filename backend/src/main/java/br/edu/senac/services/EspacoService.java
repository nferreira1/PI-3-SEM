package br.edu.senac.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import br.edu.senac.models.Espaco;
import br.edu.senac.repositories.EspacoRepository;

@Service
public class EspacoService {

  @Autowired
  private EspacoRepository espacoRepository;

  public List<Espaco> buscarTodosServicosPorId(@NonNull String atividadeId) {
    return this.espacoRepository.findAllByAtividadeIdAndStatusTrue(atividadeId);
  }

}

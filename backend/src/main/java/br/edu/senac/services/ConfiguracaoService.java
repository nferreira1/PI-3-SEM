package br.edu.senac.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.senac.models.Configuracao;
import br.edu.senac.repositories.ConfiguracaoRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class ConfiguracaoService {

  @Autowired
  private ConfiguracaoRepository configuracaoRepository;

  public List<Configuracao> findAll() {
    return configuracaoRepository.findAllByStatusTrue();
  }

  public Configuracao findById(Long id) {
    return configuracaoRepository.findById(id)
        .orElseThrow(() -> new ObjectNotFoundException("Configuração não encontrada"));
  }

  public Configuracao criar(Configuracao obj) {
    return configuracaoRepository.save(obj);
  }

}

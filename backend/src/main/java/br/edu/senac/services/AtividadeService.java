package br.edu.senac.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.senac.models.Atividade;
import br.edu.senac.repositories.AtividadeRepository;

@Service
public class AtividadeService {

  @Autowired
  private AtividadeRepository atividadeRepository;

  public List<Atividade> buscarTodasAtividades() {

    return this.atividadeRepository.findAllByStatusTrueAndEspacosNotNull();
  }

  public Atividade criar(Atividade obj) {

    Atividade atividade = new Atividade();

    atividade.setNome(obj.getNome());
    atividade.setLocal(obj.getLocal());
    atividade.setImagem(obj.getImagem());
    atividade.setTelefone(obj.getTelefone());
    atividade.setStatus(obj.isStatus());

    return this.atividadeRepository.save(atividade);
  }

}

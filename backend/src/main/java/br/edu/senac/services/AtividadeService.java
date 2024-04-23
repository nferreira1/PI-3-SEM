package br.edu.senac.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.senac.models.Atividade;
import br.edu.senac.repositories.AtividadeRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class AtividadeService {

  @Autowired
  private AtividadeRepository atividadeRepository;

  public Atividade buscarPorId(String id) {

    return this.atividadeRepository.findByIdAndStatusTrueAndEspacosNotNullAndEspacosStatusTrue(id)
        .orElseThrow(() -> new ObjectNotFoundException("Atividade não encontrada!"));
  }

  public List<Atividade> buscarTodasAtividades() {

    return this.atividadeRepository.buscarTodasAtividades();
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

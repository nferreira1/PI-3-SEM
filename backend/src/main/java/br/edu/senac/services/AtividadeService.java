package br.edu.senac.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.senac.models.Atividade;
import br.edu.senac.models.dtos.Espaco.EspacoDTO;
import br.edu.senac.models.dtos.Atividade.AtividadeEspacoDTO;
import br.edu.senac.repositories.AtividadeRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class AtividadeService {

  @Autowired
  private AtividadeRepository atividadeRepository;

  public AtividadeEspacoDTO buscarPorId(String id) {
    var atividades = this.atividadeRepository.buscarAtividadeEspacos(id);

    if (atividades.get().isEmpty()) {
      throw new ObjectNotFoundException("Atividade não encontrada");
    }

    AtividadeEspacoDTO atividadeEspacoDTO = null;

    for (Object[] atividade : atividades.get()) {
      String atividadeId = (String) atividade[0];
      String atividadeImagem = (String) atividade[1];
      String atividadeLocal = (String) atividade[2];
      String atividadeNome = (String) atividade[3];
      String atividadeTelefone = (String) atividade[4];
      Long espacoId = (Long) atividade[5];
      String espacoImagem = (String) atividade[6];
      String espacoNome = (String) atividade[7];

      if (atividadeEspacoDTO == null) {
        atividadeEspacoDTO = new AtividadeEspacoDTO(atividadeId, atividadeNome, atividadeLocal, atividadeImagem,
            atividadeTelefone, new ArrayList<>());
      }

      EspacoDTO espacoDTO = new EspacoDTO(espacoId, espacoNome, espacoImagem);
      atividadeEspacoDTO.getEspacos().add(espacoDTO);
    }

    return atividadeEspacoDTO;
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

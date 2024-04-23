package br.edu.senac.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import br.edu.senac.models.Atividade;
import br.edu.senac.models.Espaco;
import br.edu.senac.models.dtos.Espaco.EspacoCriarDTO;
import br.edu.senac.models.dtos.EspacoHorario.EspacoHorarioDTO;
import br.edu.senac.repositories.AtividadeRepository;
import br.edu.senac.repositories.EspacoRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class EspacoService {

  @Autowired
  private EspacoRepository espacoRepository;

  @Autowired
  private AtividadeRepository atividadeRepository;

  public List<EspacoHorarioDTO> buscarTodosEspacosPorAtividadeIdDataAgendamento(@NonNull String atividadeId,
      @NonNull LocalDate dataAgendamento, @NonNull Long espacoId) {

    var espacoExiste = this.espacoRepository.findById(espacoId)
        .orElseThrow(() -> new ObjectNotFoundException("Espaço não encontrado!"));

    var espacos = this.espacoRepository.findByDataAndAtividadeId(atividadeId, dataAgendamento, espacoExiste.getId());

    List<EspacoHorarioDTO> dtos = new ArrayList<>();
    for (Object[] espaco : espacos) {
      Long id = (Long) espaco[0];
      String horarioInicial = espaco[1].toString();
      String horarioFinal = espaco[2].toString();
      dtos.add(new EspacoHorarioDTO(id, horarioInicial, horarioFinal));
    }
    return dtos;
  }

  public List<Espaco> buscarTodosEspacosHorarios(@NonNull String atividadeId) {
    return this.espacoRepository
        .findAllByAtividadeIdAndStatusTrueAndEspacoHorariosNotNullAndEspacoStatusTrue(atividadeId);
  }

  public List<Espaco> buscarTodosEspacos(String atividadeId) {
    return this.espacoRepository
        .findAllByAtividadeIdAndStatusTrueAndEspacoHorariosNotNull(atividadeId);
  }

  public Espaco criar(EspacoCriarDTO obj) {

    Atividade atividade = atividadeRepository.findById(obj.getAtividadeId())
        .orElseThrow(() -> new ObjectNotFoundException("Atividade não encontrada!"));

    // Espaco espaco =
    // this.espacoRepository.findByAtividadeIdAndNome(obj.getAtividadeId(),
    // obj.getNome());

    // if (espaco != null && espaco.isStatus() == false) {
    // this.espacoRepository.alternarStatusEspacoTrue(espaco.getId());
    // return this.espacoRepository.save(espaco);
    // }

    Espaco espaco = new Espaco();

    espaco.setNome(obj.getNome().toUpperCase());
    espaco.setImagem(obj.getImagem());
    espaco.setStatus(true);
    espaco.setAtividade(atividade);

    return this.espacoRepository.save(espaco);
  }

}

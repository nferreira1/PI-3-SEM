package br.edu.senac.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.senac.models.AvaliacaoAgendamento;
import br.edu.senac.models.Agendamento;
import br.edu.senac.models.dtos.AvaliacaoAgendamento.AvaliacaoAgendamentoDTO;
import br.edu.senac.models.dtos.AvaliacaoAgendamento.AvaliacaoAgendamentoCriarDTO;
import br.edu.senac.repositories.AgendamentoRepository;
import br.edu.senac.repositories.AtividadeRepository;
import br.edu.senac.repositories.AvaliacaoAgendamentoRepository;
import br.edu.senac.services.exceptions.ObjectNotFoundException;

@Service
public class AvaliacaoAgendamentoService {

  @Autowired
  private AvaliacaoAgendamentoRepository avaliacaoAgendamentoRepository;

  @Autowired
  private AtividadeRepository atividadeRepository;

  @Autowired
  private AgendamentoRepository agendamentoRepository;

  public AvaliacaoAgendamentoDTO buscarQuantidadePorIdAtividade(String id) {

    this.atividadeRepository.findById(id).orElseThrow(
        () -> new ObjectNotFoundException("Atividade não encontrada"));

    var avaliacao = avaliacaoAgendamentoRepository.findByIdAtividadeId(id);

    AvaliacaoAgendamentoDTO avaliacaoDTO = null;

    for (Object[] objects : avaliacao) {

      if (objects[0] == null || objects[1] == null) {
        return avaliacaoDTO = new AvaliacaoAgendamentoDTO(0L, 0F);
      }

      var quantidade = Long.parseLong(objects[0].toString());
      BigDecimal media = (BigDecimal) objects[1];
      float mediaFormatada = Math.round((media).floatValue() * 100) / 100f;

      avaliacaoDTO = new AvaliacaoAgendamentoDTO(quantidade, mediaFormatada);
    }

    return avaliacaoDTO;
  }

  public AvaliacaoAgendamento criar(AvaliacaoAgendamentoCriarDTO obj) {

    Agendamento agendamento = this.agendamentoRepository.findById(obj.getIdAgendamento())
        .orElseThrow(
            () -> new ObjectNotFoundException("Agendamento não encontrado"));

    AvaliacaoAgendamento avaliacao = new AvaliacaoAgendamento();

    avaliacao.setAgendamento(agendamento);
    avaliacao.setNota(obj.getNota());
    avaliacao.setDataAvaliacao(LocalDateTime.now());

    return this.avaliacaoAgendamentoRepository.save(avaliacao);
  }
}

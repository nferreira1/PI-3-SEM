package br.edu.senac.services.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import jakarta.persistence.EntityNotFoundException;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class AvaliacaoAgendamentoComStatusNaoFinalizadoException extends EntityNotFoundException {

  public AvaliacaoAgendamentoComStatusNaoFinalizadoException(String message) {
    super(message);
  }

}
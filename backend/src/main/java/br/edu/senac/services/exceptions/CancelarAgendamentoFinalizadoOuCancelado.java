package br.edu.senac.services.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import jakarta.persistence.EntityNotFoundException;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class CancelarAgendamentoFinalizadoOuCancelado extends EntityNotFoundException {

  public CancelarAgendamentoFinalizadoOuCancelado(String message) {
    super(message);
  }

}

package br.edu.senac.exceptions;

import java.nio.file.attribute.UserPrincipalNotFoundException;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.edu.senac.services.exceptions.CancelarAgendamentoFinalizadoOuCancelado;
import br.edu.senac.services.exceptions.ObjectNotFoundException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "GLOBAL_EXCEPTION_HANDLER")
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @Value("${server.error.include-exception}")
  private boolean printStackTrace;

  @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException methodArgumentNotValidException, HttpHeaders headers, HttpStatus status,
      WebRequest request) {

    ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(),
        "Validation error. Check 'errors' field for details.");

    for (FieldError fieldError : methodArgumentNotValidException.getBindingResult().getFieldErrors()) {
      errorResponse.addValidationError(fieldError.getField(), fieldError.getDefaultMessage());
    }
    return ResponseEntity.unprocessableEntity().body(errorResponse);
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleAllUncaughtException(Exception exception, WebRequest request) {
    final String errorMessage = "Unknown error occurred";
    log.error(errorMessage, exception);
    return buildErrorResponse(exception, errorMessage, HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

  private ResponseEntity<Object> buildErrorResponse(Exception exception, String message, HttpStatus httpStatus,
      WebRequest request) {

    ErrorResponse errorResponse = new ErrorResponse(httpStatus.value(), message);

    if (this.printStackTrace) {
      errorResponse.setStackTrace(ExceptionUtils.getStackTrace(exception));
    }

    return ResponseEntity.status(httpStatus).body(errorResponse);
  }

  private ResponseEntity<Object> buildErrorResponse(Exception exception, HttpStatus httpStatus, WebRequest request) {
    return buildErrorResponse(exception, exception.getMessage(), httpStatus, request);
  }

  @ExceptionHandler(ObjectNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ResponseEntity<Object> handleObjectNotFoundException(ObjectNotFoundException objectNotFoundException,
      WebRequest request) {

    log.error("Failed to find the requested element", objectNotFoundException);

    return buildErrorResponse(objectNotFoundException, HttpStatus.NOT_FOUND, request);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  public ResponseEntity<Object> handleDataIntegrityViolationException(
      DataIntegrityViolationException dataIntegrityViolationException, WebRequest request) {

    String errorMessage = dataIntegrityViolationException.getMostSpecificCause().getMessage();
    log.error("Failed to save entity with integrity problems: " + errorMessage, dataIntegrityViolationException);
    return buildErrorResponse(dataIntegrityViolationException, errorMessage, HttpStatus.CONFLICT, request);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
  public ResponseEntity<Object> handleConstraintViolationException(
      ConstraintViolationException constraintViolationException, WebRequest request) {

    return buildErrorResponse(constraintViolationException, "Conteúdo inválido!", HttpStatus.UNPROCESSABLE_ENTITY,
        request);
  }

  @ExceptionHandler(UserPrincipalNotFoundException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ResponseEntity<Object> handleUserPrincipalNotFoundException(
      UserPrincipalNotFoundException userPrincipalNotFoundException,
      WebRequest request) {

    log.error("Failed to find the requested user", userPrincipalNotFoundException);

    return buildErrorResponse(userPrincipalNotFoundException, userPrincipalNotFoundException.getName(),
        HttpStatus.UNAUTHORIZED, request);
  }

  @ExceptionHandler(BadCredentialsException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ResponseEntity<Object> handleBadCredentialsException(BadCredentialsException badCredentialsException,
      WebRequest request) {

    log.error("Failed to authenticate user", badCredentialsException);

    return buildErrorResponse(badCredentialsException, badCredentialsException.getMessage(), HttpStatus.UNAUTHORIZED,
        request);
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException accessDeniedException,
      WebRequest request) {
    return buildErrorResponse(accessDeniedException, "Acesso negado!", HttpStatus.FORBIDDEN, request);
  }

  @ExceptionHandler(CancelarAgendamentoFinalizadoOuCancelado.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  public ResponseEntity<Object> handleCancelarAgendamentoFinalizadoOuCancelado(
      CancelarAgendamentoFinalizadoOuCancelado cancelarAgendamentoFinalizadoOuCancelado, WebRequest request) {
    return buildErrorResponse(cancelarAgendamentoFinalizadoOuCancelado,
        cancelarAgendamentoFinalizadoOuCancelado.getMessage(),
        HttpStatus.CONFLICT, request);
  }

}

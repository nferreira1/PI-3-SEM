package br.edu.senac.email;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Email {

    private String destinatario;
    private String remetente;
    private String assunto;
    private String mensagem;

}

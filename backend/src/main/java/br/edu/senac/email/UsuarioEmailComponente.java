package br.edu.senac.email;

import java.time.LocalDateTime;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import br.edu.senac.models.Usuario;

@Component
public class UsuarioEmailComponente extends EmailComponente {

    private TemplateEngine templateEngine;

    public UsuarioEmailComponente(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        super(javaMailSender);
        this.templateEngine = templateEngine;
    }

    public void enviarEmailBoasVindas(Usuario usuario) {
        Context context = new Context();
        String primeiroNome = usuario.getNome().split(" ")[0];
        String sobrenome = usuario.getNome().split(" ")[1];
        String primeiroNomeFormatado = primeiroNome.substring(0, 1).toUpperCase()
                + primeiroNome.substring(1).toLowerCase();
        String sobrenomeFormatado = sobrenome.substring(0, 1).toUpperCase() + sobrenome.substring(1).toLowerCase();
        context.setVariable("nome", primeiroNomeFormatado + " " + sobrenomeFormatado);
        context.setVariable("email", usuario.getEmail());
        context.setVariable("date", LocalDateTime.now());
        String templateHtml = this.templateEngine.process("boas-vindas-template", context);

        Email email = Email.builder()
                .destinatario(usuario.getEmail())
                .remetente("sysclub.app@gmail.com")
                .assunto("Bem-vindo ao SysClub!")
                .mensagem(templateHtml)
                .build();

        this.enviarEmail(email);
    }

}

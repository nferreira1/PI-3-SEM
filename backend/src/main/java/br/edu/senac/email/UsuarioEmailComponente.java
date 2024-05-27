package br.edu.senac.email;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import br.edu.senac.models.Usuario;

@Component
public class UsuarioEmailComponente extends EmailComponente {

    @Value("${IP_PUBLICO}")
    private String ipPublico;

    private TemplateEngine templateEngine;

    public UsuarioEmailComponente(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        super(javaMailSender);
        this.templateEngine = templateEngine;
    }

    public void enviarEmailBoasVindas(Usuario usuario) {
        Context context = new Context();
        String nome = Arrays.stream(usuario.getNome().split("\\s+"))
                .filter(palavra -> !palavra.isEmpty())
                .map(palavra -> palavra.substring(0, 1).toUpperCase() + palavra.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
        context.setVariable("nome", nome);
        context.setVariable("IP_PUBLICO", "http://" + ipPublico);
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

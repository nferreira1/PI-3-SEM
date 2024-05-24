package br.edu.senac.email;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
public abstract class EmailComponente {

    private JavaMailSender javaMailSender;

    protected void enviarEmail(Email email) {
        log.info("Enviando email para {}", email.getDestinatario());

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            mimeMessageHelper.setFrom(email.getRemetente(), "SysClub");
            mimeMessageHelper.setTo(email.getDestinatario());
            mimeMessageHelper.setSubject(email.getAssunto());
            mimeMessageHelper.setText(email.getMensagem(), true);

            ClassPathResource logoHeader = new ClassPathResource("static/images/logo-header.png");
            ClassPathResource banner = new ClassPathResource("static/images/banner.png");

            mimeMessageHelper.addInline("logoHeader", logoHeader);
            mimeMessageHelper.addInline("banner", banner);

            this.javaMailSender.send(mimeMessage);
            log.info("Email enviado com sucesso");
        } catch (Exception e) {
            log.error("Erro ao enviar email", e);
        }
    }

}

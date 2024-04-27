package br.edu.senac;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ApiProjetoPiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiProjetoPiApplication.class, args);
	}

}

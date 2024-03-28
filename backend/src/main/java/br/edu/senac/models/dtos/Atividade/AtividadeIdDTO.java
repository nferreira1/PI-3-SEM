package br.edu.senac.models.dtos.Atividade;

import br.edu.senac.models.Atividade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AtividadeIdDTO extends AtividadeDTO {
    
    private String id;

    public AtividadeIdDTO(Atividade atividade) {
        super(atividade);
        this.id = atividade.getId().toString();
    }
}

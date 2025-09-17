import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tarefa, TarefaRequest} from '../../models/tarefa.model';
import {TarefaService} from '../../services/tarefa.service';
import {MatriculaService} from '../../services/matricula.service';
import {Matricula} from '../../models/matricula.model';

@Component({
    selector: 'app-tarefa-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './tarefa-form.component.html',
    styleUrls: ['./tarefa-form.component.css']
})
export class TarefaFormComponent implements OnInit {
    @Input() tarefa?: Tarefa;
    @Output() tarefaSalva = new EventEmitter<Tarefa>();

    tarefaRequest: TarefaRequest = {
        matriculaId: 0,
        categoriaId: 0,
        dataTarefa: '',
        descricao: '',
        tempoGastoMinutos: 0
    };

    matriculas: Matricula[] = [];
    categorias: any[] = [];

    constructor(
        private tarefaService: TarefaService,
        private matriculaService: MatriculaService
    ) {
    }

    ngOnInit() {
        this.carregarDados();
        if (this.tarefa) {
            this.tarefaRequest = {
                matriculaId: this.tarefa.matriculaId,
                categoriaId: this.tarefa.categoriaId,
                dataTarefa: this.tarefa.dataTarefa,
                descricao: this.tarefa.descricao || '',
                tempoGastoMinutos: this.tarefa.tempoGastoMinutos || 0
            };
        }
    }

    carregarDados() {
        this.matriculaService.listarTodasMatriculas().subscribe(matriculas => {
            this.matriculas = matriculas;
        });

        this.tarefaService.listarCategorias().subscribe(categorias => {
            this.categorias = categorias;
        });
    }

    salvar() {
        if (this.tarefa) {
            // Modo edição
            this.tarefaService.atualizarTarefa(this.tarefa.id!, this.tarefaRequest).subscribe(tarefa => {
                this.tarefaSalva.emit(tarefa);
                this.resetarFormulario();
            });
        } else {
            // Modo criação
            this.tarefaService.criarTarefa(this.tarefaRequest).subscribe(tarefa => {
                this.tarefaSalva.emit(tarefa);
                this.resetarFormulario();
            });
        }
    }

    resetarFormulario() {
        this.tarefaRequest = {
            matriculaId: 0,
            categoriaId: 0,
            dataTarefa: '',
            descricao: '',
            tempoGastoMinutos: 0
        };
    }
}

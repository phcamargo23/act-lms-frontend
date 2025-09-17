import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TarefaFormComponent} from '../../components/tarefa-form/tarefa-form.component';
import {TarefaListComponent} from '../../components/tarefa-list/tarefa-list.component';
import {Tarefa} from '../../models/tarefa.model';
import {TarefaService} from '../../services/tarefa.service';

@Component({
    selector: 'app-tarefas',
    standalone: true,
    imports: [CommonModule, TarefaFormComponent, TarefaListComponent],
    templateUrl: './tarefas.component.html',
    styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
    tarefas: Tarefa[] = [];
    tarefaParaEdicao?: Tarefa;

    constructor(private tarefaService: TarefaService) {
    }

    ngOnInit() {
        this.carregarTarefas();
    }

    carregarTarefas() {
        this.tarefaService.listarTodasTarefas().subscribe(tarefas => {
            this.tarefas = tarefas;
        });
    }

    onTarefaSalva(tarefa: Tarefa) {
        if (this.tarefaParaEdicao) {
            // Atualizar tarefa existente na lista
            const index = this.tarefas.findIndex(t => t.id === tarefa.id);
            if (index !== -1) {
                this.tarefas[index] = tarefa;
            }
            this.tarefaParaEdicao = undefined;
        } else {
            // Adicionar nova tarefa à lista
            this.tarefas.push(tarefa);
        }
    }

    onTarefaEditada(tarefa: Tarefa) {
        this.tarefaParaEdicao = tarefa;
    }

    onTarefaExcluida(id: number) {
        this.tarefas = this.tarefas.filter(t => t.id !== id);
    }
}
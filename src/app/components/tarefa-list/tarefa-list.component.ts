import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Tarefa} from '../../models/tarefa.model';
import {TarefaService} from '../../services/tarefa.service';

@Component({
    selector: 'app-tarefa-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tarefa-list.component.html',

})
export class TarefaListComponent {
    @Input() tarefas: Tarefa[] = [];
    @Output() tarefaEditada = new EventEmitter<Tarefa>();
    @Output() tarefaExcluida = new EventEmitter<number>();

    constructor(private tarefaService: TarefaService) {
    }

    editar(tarefa: Tarefa) {
        this.tarefaEditada.emit(tarefa);
    }

    excluir(id: number) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            this.tarefaService.deletarTarefa(id).subscribe(() => {
                this.tarefaExcluida.emit(id);
            });
        }
    }

    formatarData(data: string): string {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    formatarTempo(minutos?: number): string {
        if (!minutos || minutos === 0) {
            return 'Não informado';
        }

        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;

        if (horas > 0) {
            return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`;
        }

        return `${mins}min`;
    }

    truncarTexto(texto?: string, limite: number = 100): string {
        if (!texto) return '';
        return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
    }
}

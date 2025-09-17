import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Matricula} from '../../models/matricula.model';
import {MatriculaService} from '../../services/matricula.service';

@Component({
    selector: 'app-matricula-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './matricula-list.component.html',
    styleUrls: ['./matricula-list.component.css']
})
export class MatriculaListComponent {
    @Input() matriculas: Matricula[] = [];
    @Output() matriculaCancelada = new EventEmitter<number>();

    constructor(private matriculaService: MatriculaService) {
    }

    cancelar(id: number) {
        if (confirm('Tem certeza que deseja cancelar esta matrícula?')) {
            this.matriculaService.cancelarMatricula(id).subscribe(() => {
                this.matriculaCancelada.emit(id);
            });
        }
    }

    formatarData(data: string): string {
        return new Date(data).toLocaleString('pt-BR');
    }
}


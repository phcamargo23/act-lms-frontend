import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatriculaService} from '../../services/matricula.service';
import {AuthService} from '../../services/auth.service';
import {Matricula} from '../../models/matricula.model';

@Component({
    selector: 'app-matricula-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './matricula-table.component.html',
})
export class MatriculaTableComponent implements OnInit {
    @Input() matriculas: Matricula[] = [];
    @Output() matriculaCancelada = new EventEmitter<number>();
    @Output() novaMatricula = new EventEmitter<void>();

    constructor(
        private matriculaService: MatriculaService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        if (this.matriculas.length === 0) {
            this.carregarMatriculas();
        }
    }

    carregarMatriculas() {
        const usuarioLogado = this.authService.getUsuarioLogado();
        if (usuarioLogado) {
            this.matriculaService.listarMatriculasPorUsuario(usuarioLogado.id).subscribe({
                next: (matriculas) => this.matriculas = matriculas,
                error: (error) => console.error('Erro ao carregar matrículas:', error)
            });
        }
    }

    cancelarMatricula(id: number) {
        if (confirm('Tem certeza que deseja cancelar esta matrícula?')) {
            this.matriculaService.cancelarMatricula(id).subscribe({
                next: () => {
                    this.matriculaCancelada.emit(id);
                },
                error: (error) => console.error('Erro ao cancelar matrícula:', error)
            });
        }
    }

    novaMatriculaClick() {
        this.novaMatricula.emit();
    }

    formatarData(data: string): string {
        return new Date(data).toLocaleString('pt-BR');
    }
}

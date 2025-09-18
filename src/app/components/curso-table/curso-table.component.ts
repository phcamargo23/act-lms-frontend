import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CursoService} from '../../services/curso.service';
import {Curso} from '../../models/curso.model';

@Component({
    selector: 'app-curso-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './curso-table.component.html',
})
export class CursoTableComponent implements OnInit {
    @Input() cursos: Curso[] = [];
    @Output() editarCurso = new EventEmitter<Curso>();
    @Output() cursoDeletado = new EventEmitter<number>();
    @Output() novoCurso = new EventEmitter<void>();

    constructor(private cursoService: CursoService) {
    }

    ngOnInit() {
        if (this.cursos.length === 0) {
            this.carregarCursos();
        }
    }

    carregarCursos() {
        this.cursoService.listarCursos().subscribe({
            next: (cursos) => this.cursos = cursos,
            error: (error) => console.error('Erro ao carregar cursos:', error)
        });
    }

    editarCursoClick(curso: Curso) {
        console.log('Clicou em editar curso:', curso);
        this.editarCurso.emit(curso);
    }

    deletarCursoClick(id: number) {
        if (confirm('Tem certeza que deseja deletar este curso?')) {
            this.cursoService.deletarCurso(id).subscribe({
                next: () => {
                    this.cursoDeletado.emit(id);
                },
                error: (error) => console.error('Erro ao deletar curso:', error)
            });
        }
    }

    novoCursoClick() {
        this.novoCurso.emit();
    }
}

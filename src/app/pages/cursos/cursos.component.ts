import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CursoFormComponent} from '../../components/curso-form/curso-form.component';
import {CursoListComponent} from '../../components/curso-list/curso-list.component';
import {Curso} from '../../models/curso.model';
import {CursoService} from '../../services/curso.service';

@Component({
    selector: 'app-cursos',
    standalone: true,
    imports: [CommonModule, CursoFormComponent, CursoListComponent],
    templateUrl: './cursos.component.html',
    styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
    cursos: Curso[] = [];
    cursoEditando?: Curso;

    constructor(private cursoService: CursoService) {
    }

    ngOnInit() {
        this.carregarCursos();
    }

    carregarCursos() {
        this.cursoService.listarCursos().subscribe(cursos => {
            this.cursos = cursos;
        });
    }

    onCursoSalvo(curso: Curso) {
        console.log('Curso salvo:', curso);
        if (this.cursoEditando) {
            const index = this.cursos.findIndex(c => c.id === curso.id);
            if (index !== -1) {
                this.cursos[index] = curso;
            }
            this.cursoEditando = undefined;
        } else {
            this.cursos.push(curso);
        }
        // Recarregar a lista para garantir que está atualizada
        this.carregarCursos();
    }

    onEditarCurso(curso: Curso) {
        console.log('Editando curso:', curso);
        console.log('cursoEditando antes:', this.cursoEditando);
        this.cursoEditando = curso;
        console.log('cursoEditando depois:', this.cursoEditando);
    }

    onCursoDeletado(id: number) {
        this.cursos = this.cursos.filter(c => c.id !== id);
        if (this.cursoEditando?.id === id) {
            this.cursoEditando = undefined;
        }
    }
}

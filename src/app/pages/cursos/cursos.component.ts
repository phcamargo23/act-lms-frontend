import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {CursoTableComponent} from '../../components/curso-table/curso-table.component';
import {Curso} from '../../models/curso.model';
import {CursoService} from '../../services/curso.service';

@Component({
    selector: 'app-cursos',
    standalone: true,
    imports: [CommonModule, CursoTableComponent],
    templateUrl: './cursos.component.html',
})
export class CursosComponent implements OnInit {
    cursos: Curso[] = [];

    constructor(
        private cursoService: CursoService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.carregarCursos();
    }

    carregarCursos() {
        this.cursoService.listarCursos().subscribe(cursos => {
            this.cursos = cursos;
        });
    }

    onEditarCurso(curso: Curso) {
        console.log('Editando curso:', curso);
        this.router.navigate(['/cursos/editar'], {
            queryParams: {id: curso.id}
        });
    }

    onNovoCurso() {
        console.log('Criando novo curso');
        this.router.navigate(['/cursos/novo']);
    }

    onCursoDeletado(id: number) {
        this.cursos = this.cursos.filter(c => c.id !== id);
    }
}

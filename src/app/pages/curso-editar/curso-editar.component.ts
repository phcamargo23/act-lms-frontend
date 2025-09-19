import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {CursoFormComponent} from '../../components/curso-form/curso-form.component';
import {Curso} from '../../models/curso.model';
import {CursoService} from '../../services/curso.service';

@Component({
    selector: 'app-curso-editar',
    standalone: true,
    imports: [CommonModule, CursoFormComponent],
    templateUrl: './curso-editar.component.html',
})
export class CursoEditarComponent implements OnInit {
    curso?: Curso;
    carregando = true;

    constructor(
        private cursoService: CursoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.carregarCurso(Number(id));
            } else {
                this.router.navigate(['/cursos']);
            }
        });
    }

    carregarCurso(id: number) {
        this.carregando = true;
        this.cursoService.buscarCurso(id).subscribe({
            next: (curso) => {
                this.curso = curso;
                this.carregando = false;
            },
            error: (error) => {
                console.error('Erro ao carregar curso:', error);
                this.router.navigate(['/cursos']);
            }
        });
    }

    onCursoSalvo(curso: Curso) {
        console.log('Curso salvo:', curso);
        this.router.navigate(['/cursos']);
    }

    onCancelar() {
        this.router.navigate(['/cursos']);
    }
}

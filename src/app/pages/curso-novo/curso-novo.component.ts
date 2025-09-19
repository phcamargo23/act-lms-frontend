import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {CursoFormComponent} from '../../components/curso-form/curso-form.component';
import {Curso} from '../../models/curso.model';

@Component({
    selector: 'app-curso-novo',
    standalone: true,
    imports: [CommonModule, CursoFormComponent],
    templateUrl: './curso-novo.component.html',
})
export class CursoNovoComponent {

    constructor(private router: Router) {
    }

    onCursoSalvo(curso: Curso) {
        console.log('Curso criado:', curso);
        this.router.navigate(['/cursos']);
    }

    onCancelar() {
        this.router.navigate(['/cursos']);
    }
}

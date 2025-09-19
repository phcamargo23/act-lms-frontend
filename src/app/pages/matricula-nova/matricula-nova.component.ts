import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MatriculaFormComponent} from '../../components/matricula-form/matricula-form.component';
import {Matricula} from '../../models/matricula.model';

@Component({
    selector: 'app-matricula-nova',
    standalone: true,
    imports: [CommonModule, MatriculaFormComponent],
    templateUrl: './matricula-nova.component.html',
})
export class MatriculaNovaComponent {

    constructor(private router: Router) {
    }

    onMatriculaSalva(matricula: Matricula) {
        console.log('Matrícula criada:', matricula);
        this.router.navigate(['/matriculas']);
    }

    onCancelar() {
        this.router.navigate(['/matriculas']);
    }
}

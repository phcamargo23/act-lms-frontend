import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatriculaFormComponent} from '../../components/matricula-form/matricula-form.component';
import {MatriculaListComponent} from '../../components/matricula-list/matricula-list.component';
import {Matricula} from '../../models/matricula.model';
import {MatriculaService} from '../../services/matricula.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-matriculas',
    standalone: true,
    imports: [CommonModule, MatriculaFormComponent, MatriculaListComponent],
    templateUrl: './matriculas.component.html',

})
export class MatriculasComponent implements OnInit {
    matriculas: Matricula[] = [];

    constructor(
        private matriculaService: MatriculaService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.carregarMatriculas();
    }

    carregarMatriculas() {
        const usuarioLogado = this.authService.getUsuarioLogado();
        if (usuarioLogado) {
            this.matriculaService.listarMatriculasPorUsuario(usuarioLogado.id).subscribe(matriculas => {
                this.matriculas = matriculas;
            });
        }
    }

    onMatriculaSalva(matricula: Matricula) {
        this.matriculas.push(matricula);
    }

    onMatriculaCancelada(id: number) {
        this.matriculas = this.matriculas.filter(m => m.id !== id);
    }
}
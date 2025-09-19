import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MatriculaListComponent} from '../../components/matricula-list/matricula-list.component';
import {Matricula} from '../../models/matricula.model';
import {MatriculaService} from '../../services/matricula.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-matriculas',
    standalone: true,
    imports: [CommonModule, MatriculaListComponent],
    templateUrl: './matriculas.component.html',
})
export class MatriculasComponent implements OnInit {
    matriculas: Matricula[] = [];

    constructor(
        private matriculaService: MatriculaService,
        private authService: AuthService,
        private router: Router
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

    onNovaMatricula() {
        console.log('Criando nova matrícula');
        this.router.navigate(['/matriculas/nova']);
    }

    onMatriculaCancelada(id: number) {
        this.matriculas = this.matriculas.filter(m => m.id !== id);
    }
}

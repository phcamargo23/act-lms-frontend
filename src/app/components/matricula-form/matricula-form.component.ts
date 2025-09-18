import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Matricula, MatriculaRequest} from '../../models/matricula.model';
import {MatriculaService} from '../../services/matricula.service';
import {CursoService} from '../../services/curso.service';
import {AuthService} from '../../services/auth.service';
import {Curso} from '../../models/curso.model';

@Component({
    selector: 'app-matricula-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './matricula-form.component.html',

})
export class MatriculaFormComponent implements OnInit {
    @Input() matricula?: Matricula;
    @Output() matriculaSalva = new EventEmitter<Matricula>();

    matriculaRequest: MatriculaRequest = {
        usuarioId: 0,
        cursoId: 0
    };

    cursos: Curso[] = [];

    constructor(
        private matriculaService: MatriculaService,
        private cursoService: CursoService,
        public authService: AuthService
    ) {
    }

    ngOnInit() {
        this.carregarDados();
        this.configurarUsuarioLogado();

        if (this.matricula) {
            this.matriculaRequest = {
                usuarioId: this.matricula.usuarioId,
                cursoId: this.matricula.cursoId
            };
        }
    }

    carregarDados() {
        this.cursoService.listarCursos().subscribe(cursos => this.cursos = cursos);
    }

    configurarUsuarioLogado() {
        const usuarioLogado = this.authService.getUsuarioLogado();
        if (usuarioLogado) {
            this.matriculaRequest.usuarioId = usuarioLogado.id;
        }
    }

    salvar() {
        this.matriculaService.criarMatricula(this.matriculaRequest).subscribe(matricula => {
            this.matriculaSalva.emit(matricula);
            this.resetarFormulario();
        });
    }

    resetarFormulario() {
        this.matriculaRequest = {
            usuarioId: this.authService.getUsuarioLogado()?.id || 0,
            cursoId: 0
        };
    }
}

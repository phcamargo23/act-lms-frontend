import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Matricula, MatriculaRequest} from '../../models/matricula.model';
import {MatriculaService} from '../../services/matricula.service';
import {CursoService} from '../../services/curso.service';
import {AuthService} from '../../services/auth.service';
import {Curso} from '../../models/curso.model';
import {ApiErrorResponse} from '../../models/usuario.model';

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

    // Estados do componente
    isLoading = false;
    isSuccess = false;
    errorMessage = '';
    successMessage = '';

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
        // Reset estados anteriores
        this.resetStates();
        this.isLoading = true;

        this.matriculaService.criarMatricula(this.matriculaRequest).subscribe({
            next: (matricula) => {
                this.isLoading = false;
                this.isSuccess = true;
                this.successMessage = 'Matrícula realizada com sucesso!';
                this.matriculaSalva.emit(matricula);
                this.resetarFormulario();
            },
            error: (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.handleError(error);
            }
        });
    }

    resetarFormulario() {
        this.matriculaRequest = {
            usuarioId: this.authService.getUsuarioLogado()?.id || 0,
            cursoId: 0
        };
        this.resetStates();
    }

    private handleError(error: HttpErrorResponse) {
        console.error('Erro ao criar matrícula:', error);

        if (error.status === 400 && error.error) {
            const apiError: ApiErrorResponse = error.error;
            this.errorMessage = apiError.message || 'Erro ao criar matrícula.';
        } else {
            // Erro de conexão ou servidor
            this.errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
        }
    }

    private resetStates() {
        this.isLoading = false;
        this.isSuccess = false;
        this.errorMessage = '';
        this.successMessage = '';
    }
}

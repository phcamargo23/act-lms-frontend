import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {CursoService} from '../../services/curso.service';
import {Curso, CursoRequest, CursoResponse} from '../../models/curso.model';
import {ApiErrorResponse} from '../../models/usuario.model';

@Component({
    selector: 'app-curso-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './curso-form.component.html',
})
export class CursoFormComponent implements OnInit, OnChanges {
    @Input() curso?: Curso;
    @Output() cursoSalvo = new EventEmitter<CursoResponse>();
    @Output() cancelar = new EventEmitter<void>();

    cursoId?: number;

    cursoForm: CursoRequest = {
        nome: ''
    };

    isEditando = false;

    // Estados do componente (igual ao matriculaform)
    isLoading = false;
    isSuccess = false;
    errorMessage = '';
    successMessage = '';

    constructor(private cursoService: CursoService) {
    }

    ngOnInit() {
        this.atualizarFormulario();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('ngOnChanges chamado:', changes);
        if (changes['curso'] && changes['curso'].currentValue) {
            console.log('Curso mudou:', changes['curso'].currentValue);
            this.atualizarFormulario();
        }
    }

    atualizarFormulario() {
        if (this.curso) {
            console.log('Atualizando formulário com curso:', this.curso);
            this.cursoForm = {nome: this.curso.nome};
            this.cursoId = this.curso.id;
            this.isEditando = true;
        } else {
            this.resetarFormulario();
        }
    }

    salvar() {
        // Reset estados anteriores
        this.resetStates();
        this.isLoading = true;

        if (!this.isFormValid()) {
            this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
            this.isLoading = false;
            return;
        }

        if (this.isEditando && this.cursoId) {
            console.log('Atualizando curso:', this.cursoId, this.cursoForm);
            this.cursoService.atualizarCurso(this.cursoId, this.cursoForm).subscribe({
                next: (cursoResponse) => {
                    console.log('Curso atualizado com sucesso:', cursoResponse);
                    this.isLoading = false;
                    this.isSuccess = true;
                    this.successMessage = 'Curso atualizado com sucesso!';
                    this.cursoSalvo.emit(cursoResponse);
                    this.resetarFormulario();
                },
                error: (error: HttpErrorResponse) => {
                    this.isLoading = false;
                    this.handleError(error);
                }
            });
        } else {
            this.cursoService.criarCurso(this.cursoForm).subscribe({
                next: (cursoResponse) => {
                    this.isLoading = false;
                    this.isSuccess = true;
                    this.successMessage = 'Curso criado com sucesso!';
                    this.cursoSalvo.emit(cursoResponse);
                    this.resetarFormulario();
                },
                error: (error: HttpErrorResponse) => {
                    this.isLoading = false;
                    this.handleError(error);
                }
            });
        }
    }

    resetarFormulario() {
        this.cursoForm = {nome: ''};
        this.isEditando = false;
        this.cursoId = undefined;
        this.resetStates();
    }

    cancelarEdicao() {
        this.resetarFormulario();
        this.cancelar.emit();
    }

    isFormValid(): boolean {
        return !!this.cursoForm.nome?.trim();
    }

    private handleError(error: HttpErrorResponse) {
        console.error('Erro ao salvar curso:', error);

        if (error.status === 400 && error.error) {
            const apiError: ApiErrorResponse = error.error;
            this.errorMessage = apiError.message || 'Erro ao salvar curso.';
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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CursoService} from '../../services/curso.service';
import {Curso} from '../../models/curso.model';

@Component({
    selector: 'app-curso-edit',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './curso-edit.component.html',
})
export class CursoEditComponent implements OnInit {
    @Input() curso?: Curso;
    @Output() cursoSalvo = new EventEmitter<Curso>();
    @Output() cancelar = new EventEmitter<void>();

    cursoForm: Curso = {
        nome: ''
    };

    isEditando = false;
    erro = '';
    carregando = false;

    constructor(private cursoService: CursoService) {
    }

    ngOnInit() {
        this.atualizarFormulario();
    }

    ngOnChanges() {
        this.atualizarFormulario();
    }

    atualizarFormulario() {
        if (this.curso) {
            console.log('Atualizando formulário com curso:', this.curso);
            this.cursoForm = {...this.curso};
            this.isEditando = true;
        } else {
            this.resetarFormulario();
        }
    }

    salvar() {
        this.erro = '';
        this.carregando = true;

        if (!this.isFormValid()) {
            this.erro = 'Por favor, preencha todos os campos obrigatórios';
            this.carregando = false;
            return;
        }

        if (this.isEditando && this.curso?.id) {
            console.log('Atualizando curso:', this.curso.id, this.cursoForm);
            this.cursoService.atualizarCurso(this.curso.id, this.cursoForm).subscribe({
                next: (curso) => {
                    console.log('Curso atualizado com sucesso:', curso);
                    this.cursoSalvo.emit(curso);
                    this.resetarFormulario();
                    this.carregando = false;
                },
                error: (error) => {
                    this.erro = 'Erro ao atualizar curso';
                    console.error('Erro ao atualizar curso:', error);
                    this.carregando = false;
                }
            });
        } else {
            this.cursoService.criarCurso(this.cursoForm).subscribe({
                next: (curso) => {
                    this.cursoSalvo.emit(curso);
                    this.resetarFormulario();
                    this.carregando = false;
                },
                error: (error) => {
                    this.erro = 'Erro ao criar curso';
                    console.error('Erro ao criar curso:', error);
                    this.carregando = false;
                }
            });
        }
    }

    resetarFormulario() {
        this.cursoForm = {nome: ''};
        this.isEditando = false;
        this.erro = '';
    }

    cancelarEdicao() {
        this.resetarFormulario();
        this.cancelar.emit();
    }

    isFormValid(): boolean {
        return !!this.cursoForm.nome?.trim();
    }
}

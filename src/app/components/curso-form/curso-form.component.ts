import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CursoService} from '../../services/curso.service';
import {Curso} from '../../models/curso.model';

@Component({
    selector: 'app-curso-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './curso-form.component.html',

})
export class CursoFormComponent implements OnInit, OnChanges {
    @Input() curso?: Curso;
    @Output() cursoSalvo = new EventEmitter<Curso>();

    cursoId?: number;

    cursoForm: Curso = {
        nome: ''
    };

    isEditando = false;
    erro = '';

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
            this.cursoForm = {...this.curso};
            this.cursoId = this.curso.id;
            this.isEditando = true;
        } else {
            this.resetarFormulario();
        }
    }

    salvar() {
        this.erro = '';

        if (!this.isFormValid()) {
            this.erro = 'Por favor, preencha todos os campos obrigatórios';
            return;
        }

        if (this.isEditando && this.cursoId) {
            console.log('Atualizando curso:', this.cursoId, this.cursoForm);
            this.cursoService.atualizarCurso(this.cursoId, this.cursoForm).subscribe({
                next: (curso) => {
                    console.log('Curso atualizado com sucesso:', curso);
                    this.cursoSalvo.emit(curso);
                    this.resetarFormulario();
                },
                error: (error) => {
                    this.erro = 'Erro ao atualizar curso';
                    console.error('Erro ao atualizar curso:', error);
                }
            });
        } else {
            this.cursoService.criarCurso(this.cursoForm).subscribe({
                next: (curso) => {
                    this.cursoSalvo.emit(curso);
                    this.resetarFormulario();
                },
                error: (error) => {
                    this.erro = 'Erro ao criar curso';
                    console.error('Erro ao criar curso:', error);
                }
            });
        }
    }

    resetarFormulario() {
        this.cursoForm = {nome: ''};
        this.isEditando = false;
        this.cursoId = undefined;
    }

    isFormValid(): boolean {
        return !!this.cursoForm.nome;
    }
}

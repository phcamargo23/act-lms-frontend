import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatriculaService} from '../../services/matricula.service';
import {CursoService} from '../../services/curso.service';
import {AuthService} from '../../services/auth.service';
import {Matricula, MatriculaRequest} from '../../models/matricula.model';
import {Curso} from '../../models/curso.model';

@Component({
    selector: 'app-matricula-create',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './matricula-create.component.html',
})
export class MatriculaCreateComponent implements OnInit {
    @Output() matriculaSalva = new EventEmitter<Matricula>();
    @Output() cancelar = new EventEmitter<void>();

    matriculaRequest: MatriculaRequest = {
        usuarioId: 0,
        cursoId: 0
    };

    cursos: Curso[] = [];
    erro = '';
    carregando = false;

    constructor(
        private matriculaService: MatriculaService,
        private cursoService: CursoService,
        public authService: AuthService
    ) {
    }

    ngOnInit() {
        this.carregarDados();
        this.configurarUsuarioLogado();
    }

    carregarDados() {
        this.cursoService.listarCursos().subscribe({
            next: (cursos) => this.cursos = cursos,
            error: (error) => {
                console.error('Erro ao carregar cursos:', error);
                this.erro = 'Erro ao carregar lista de cursos';
            }
        });
    }

    configurarUsuarioLogado() {
        const usuarioLogado = this.authService.getUsuarioLogado();
        if (usuarioLogado) {
            this.matriculaRequest.usuarioId = usuarioLogado.id;
        }
    }

    salvar() {
        this.erro = '';
        this.carregando = true;

        if (!this.isFormValid()) {
            this.erro = 'Por favor, selecione um curso';
            this.carregando = false;
            return;
        }

        this.matriculaService.criarMatricula(this.matriculaRequest).subscribe({
            next: (matricula) => {
                this.matriculaSalva.emit(matricula);
                this.resetarFormulario();
                this.carregando = false;
            },
            error: (error) => {
                this.erro = 'Erro ao realizar matrícula';
                console.error('Erro ao criar matrícula:', error);
                this.carregando = false;
            }
        });
    }

    resetarFormulario() {
        this.matriculaRequest = {
            usuarioId: this.authService.getUsuarioLogado()?.id || 0,
            cursoId: 0
        };
        this.erro = '';
    }

    cancelarCriacao() {
        this.resetarFormulario();
        this.cancelar.emit();
    }

    isFormValid(): boolean {
        return this.matriculaRequest.cursoId > 0;
    }
}

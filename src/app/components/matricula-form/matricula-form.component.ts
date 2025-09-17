import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Matricula, MatriculaRequest} from '../../models/matricula.model';
import {MatriculaService} from '../../services/matricula.service';
import {CursoService} from '../../services/curso.service';
import {UsuarioService} from '../../services/usuario.service';
import {Curso} from '../../models/curso.model';
import {Usuario} from '../../models/usuario.model';

@Component({
    selector: 'app-matricula-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './matricula-form.component.html',
    styleUrls: ['./matricula-form.component.css']
})
export class MatriculaFormComponent implements OnInit {
    @Input() matricula?: Matricula;
    @Output() matriculaSalva = new EventEmitter<Matricula>();

    matriculaRequest: MatriculaRequest = {
        usuarioId: 0,
        cursoId: 0
    };

    cursos: Curso[] = [];
    usuarios: Usuario[] = [];

    constructor(
        private matriculaService: MatriculaService,
        private cursoService: CursoService,
        private usuarioService: UsuarioService
    ) {
    }

    ngOnInit() {
        this.carregarDados();
        if (this.matricula) {
            this.matriculaRequest = {
                usuarioId: this.matricula.usuario.id!,
                cursoId: this.matricula.curso.id!
            };
        }
    }

    carregarDados() {
        this.cursoService.listarCursos().subscribe(cursos => this.cursos = cursos);
        this.usuarioService.getAllUsuarios().subscribe(usuarios => this.usuarios = usuarios);
    }

    salvar() {
        this.matriculaService.criarMatricula(this.matriculaRequest).subscribe(matricula => {
            this.matriculaSalva.emit(matricula);
            this.resetarFormulario();
        });
    }

    resetarFormulario() {
        this.matriculaRequest = {
            usuarioId: 0,
            cursoId: 0
        };
    }
}


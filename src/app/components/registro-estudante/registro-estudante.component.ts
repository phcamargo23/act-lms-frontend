import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import {EstudanteRequest} from '../../models/usuario.model';

@Component({
    selector: 'app-registro-estudante',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './registro-estudante.component.html',
    styleUrls: ['./registro-estudante.component.css']
})
export class RegistroEstudanteComponent {
    estudante: EstudanteRequest = {
        primeiroNome: '',
        ultimoNome: '',
        dataNascimento: '',
        email: '',
        telefone: ''
    };

    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) {
    }

    onSubmit() {
        this.usuarioService.registrarEstudante(this.estudante).subscribe({
            next: (response) => {
                console.log('Estudante registrado com sucesso:', response);
                this.router.navigate(['/']);
            },
            error: (error) => {
                console.error('Erro ao registrar estudante:', error);
                alert('Erro ao registrar estudante. Verifique os dados e tente novamente.');
            }
        });
    }

    cancelar() {
        this.router.navigate(['/']);
    }
}

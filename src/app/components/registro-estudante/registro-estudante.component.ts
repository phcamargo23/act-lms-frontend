import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import {AuthService} from '../../services/auth.service';
import {EstudanteRequest, LoginResponse} from '../../models/usuario.model';

@Component({
    selector: 'app-registro-estudante',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './registro-estudante.component.html',

})
export class RegistroEstudanteComponent {
    estudante: EstudanteRequest = {
        primeiroNome: '',
        ultimoNome: '',
        dataNascimento: '',
        email: '',
        telefone: '',
        senha: ''
    };

    constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    onSubmit() {
        this.usuarioService.registrarEstudante(this.estudante).subscribe({
            next: (response) => {
                console.log('Estudante registrado com sucesso:', response);

                // Criar objeto LoginResponse para fazer login automático
                const loginResponse: LoginResponse = {
                    id: response.id,
                    primeiroNome: response.primeiroNome,
                    ultimoNome: response.ultimoNome,
                    dataNascimento: response.dataNascimento,
                    email: response.email,
                    telefone: response.telefone,
                    tipoUsuario: 'ESTUDANTE',
                    dataCriacao: response.dataCriacao
                };

                // Fazer login automático após registro
                this.authService.login(loginResponse);
                this.router.navigate(['/cursos']);
            },
            error: (error) => {
                console.error('Erro ao registrar estudante:', error);
                alert('Erro ao registrar estudante. Verifique os dados e tente novamente.');
            }
        });
    }

    cancelar() {
        this.router.navigate(['/login']);
    }
}

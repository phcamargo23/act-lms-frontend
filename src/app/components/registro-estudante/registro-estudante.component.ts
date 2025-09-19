import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {UsuarioService} from '../../services/usuario.service';
import {AuthService} from '../../services/auth.service';
import {EstudanteRequest, LoginResponse, ApiErrorResponse} from '../../models/usuario.model';

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

    // Estados do componente
    isLoading = false;
    isSuccess = false;
    errorMessage = '';
    successMessage = '';

    constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    onSubmit() {
        // Reset estados anteriores
        this.resetStates();
        this.isLoading = true;

        this.usuarioService.registrarEstudante(this.estudante).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.isSuccess = true;
                this.successMessage = `Bem-vindo, ${response.primeiroNome}! Registro realizado com sucesso.`;

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
                
                // Redirecionar após um pequeno delay para mostrar a mensagem de sucesso
                setTimeout(() => {
                    this.router.navigate(['/cursos']);
                }, 2000);
            },
            error: (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.handleError(error);
            }
        });
    }

    private handleError(error: HttpErrorResponse) {
        console.error('Erro ao registrar estudante:', error);

        if (error.status === 400 && error.error) {
            const apiError: ApiErrorResponse = error.error;
            // Agora sempre recebemos apenas uma mensagem de erro
            this.errorMessage = apiError.message || 'Erro ao registrar estudante.';
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

    cancelar() {
        this.router.navigate(['/login']);
    }

    irParaLogin() {
        this.router.navigate(['/login']);
    }
}
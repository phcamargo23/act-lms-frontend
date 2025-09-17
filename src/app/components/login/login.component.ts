import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import {AuthService} from '../../services/auth.service';
import {LoginRequest} from '../../models/usuario.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    login: LoginRequest = {
        email: '',
        senha: ''
    };

    constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    onSubmit() {
        this.usuarioService.login(this.login).subscribe({
            next: (response) => {
                console.log('Login realizado com sucesso:', response);
                // Usar AuthService para gerenciar o login
                this.authService.login(response);
                this.router.navigate(['/cursos']);
            },
            error: (error) => {
                console.error('Erro ao fazer login:', error);
                alert('Email ou senha incorretos. Tente novamente.');
            }
        });
    }

    cancelar() {
        this.router.navigate(['/login']);
    }

    irParaRegistro() {
        this.router.navigate(['/registro']);
    }
}

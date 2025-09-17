import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import {LoginRequest} from '../../models/usuario.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
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
        private router: Router
    ) {
    }

    onSubmit() {
        this.usuarioService.login(this.login).subscribe({
            next: (response) => {
                console.log('Login realizado com sucesso:', response);
                // Armazenar dados do usuário no localStorage
                localStorage.setItem('usuarioLogado', JSON.stringify(response));
                this.router.navigate(['/']);
            },
            error: (error) => {
                console.error('Erro ao fazer login:', error);
                alert('Email ou senha incorretos. Tente novamente.');
            }
        });
    }

    cancelar() {
        this.router.navigate(['/']);
    }

    irParaRegistro() {
        this.router.navigate(['/registro']);
    }
}

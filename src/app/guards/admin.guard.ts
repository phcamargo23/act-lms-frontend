import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate(): boolean {
        const usuario = this.authService.getUsuarioLogado();

        if (!usuario) {
            // Se não está logado, redireciona para login
            this.router.navigate(['/login']);
            return false;
        }

        if (usuario.tipoUsuario === 'ADMIN') {
            // Se é admin, permite acesso
            return true;
        } else {
            // Se não é admin, redireciona para matriculas
            this.router.navigate(['/matriculas']);
            return false;
        }
    }
}

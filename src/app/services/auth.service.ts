import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoginResponse} from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private usuarioLogadoSubject = new BehaviorSubject<LoginResponse | null>(null);
    public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

    constructor() {
        // Verificar se há usuário logado no localStorage ao inicializar
        this.carregarUsuarioDoLocalStorage();
    }

    login(usuario: LoginResponse): void {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.usuarioLogadoSubject.next(usuario);
    }

    logout(): void {
        localStorage.removeItem('usuarioLogado');
        this.usuarioLogadoSubject.next(null);
    }

    getUsuarioLogado(): LoginResponse | null {
        return this.usuarioLogadoSubject.value;
    }

    isLogado(): boolean {
        return this.usuarioLogadoSubject.value !== null;
    }

    getNomeUsuario(): string {
        const usuario = this.getUsuarioLogado();
        if (usuario) {
            return `${usuario.primeiroNome} ${usuario.ultimoNome}`;
        }
        return '';
    }

    verificarERedirecionar(router: any): void {
        if (!this.isLogado()) {
            router.navigate(['/login']);
        }
    }

    private carregarUsuarioDoLocalStorage(): void {
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        if (usuarioSalvo) {
            try {
                const usuario = JSON.parse(usuarioSalvo);
                this.usuarioLogadoSubject.next(usuario);
            } catch (error) {
                console.error('Erro ao carregar usuário do localStorage:', error);
                localStorage.removeItem('usuarioLogado');
            }
        }
    }
}

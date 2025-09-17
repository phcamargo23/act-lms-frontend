import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LoginResponse} from '../../models/usuario.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
    title = 'ACT LMS';
    usuarioLogado: LoginResponse | null = null;
    private subscription: Subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.authService.usuarioLogado$.subscribe(usuario => {
            this.usuarioLogado = usuario;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    getNomeUsuario(): string {
        return this.authService.getNomeUsuario();
    }
}

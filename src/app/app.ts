import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavigationComponent],
    templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        // Verificar se usuário está logado ao inicializar a aplicação
        this.authService.verificarERedirecionar(this.router);
    }
}

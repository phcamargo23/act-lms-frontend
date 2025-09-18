import {Routes} from '@angular/router';
import {CursosComponent} from './pages/cursos/cursos.component';
import {MatriculasComponent} from './pages/matriculas/matriculas.component';
import {TarefasComponent} from './pages/tarefas/tarefas.component';
import {RegistroEstudanteComponent} from './components/registro-estudante/registro-estudante.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {GuestGuard} from './guards/guest.guard';
import {AdminGuard} from './guards/admin.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'matriculas', pathMatch: 'full'},
    {path: 'cursos', component: CursosComponent, canActivate: [AdminGuard]},
    {path: 'matriculas', component: MatriculasComponent, canActivate: [AuthGuard]},
    {path: 'tarefas', component: TarefasComponent, canActivate: [AuthGuard]},
    {path: 'registro', component: RegistroEstudanteComponent, canActivate: [GuestGuard]},
    {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
    {path: '**', redirectTo: ''}
];

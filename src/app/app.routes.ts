import {Routes} from '@angular/router';
import {CursosComponent} from './pages/cursos/cursos.component';
import {MatriculasComponent} from './pages/matriculas/matriculas.component';
import {TarefasComponent} from './pages/tarefas/tarefas.component';
import {RegistroEstudanteComponent} from './components/registro-estudante/registro-estudante.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'cursos', component: CursosComponent},
    {path: 'matriculas', component: MatriculasComponent},
    {path: 'tarefas', component: TarefasComponent},
    {path: 'registro', component: RegistroEstudanteComponent},
    {path: 'login', component: LoginComponent}
];

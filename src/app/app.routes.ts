import {Routes} from '@angular/router';
import {CursosComponent} from './pages/cursos/cursos.component';
import {MatriculasComponent} from './pages/matriculas/matriculas.component';
import {TarefasComponent} from './pages/tarefas/tarefas.component';

export const routes: Routes = [
    {path: '', redirectTo: '/cursos', pathMatch: 'full'},
    {path: 'cursos', component: CursosComponent},
    {path: 'matriculas', component: MatriculasComponent},
    {path: 'tarefas', component: TarefasComponent}
];

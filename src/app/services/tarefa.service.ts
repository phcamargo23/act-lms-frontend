import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tarefa, TarefaRequest} from '../models/tarefa.model';

@Injectable({
    providedIn: 'root'
})
export class TarefaService {
    private apiUrl = 'http://localhost:8080/api/tarefas';

    constructor(private http: HttpClient) {
    }

    criarTarefa(tarefa: TarefaRequest): Observable<Tarefa> {
        return this.http.post<Tarefa>(this.apiUrl, tarefa);
    }

    listarTodasTarefas(): Observable<Tarefa[]> {
        return this.http.get<Tarefa[]>(this.apiUrl);
    }

    buscarTarefaPorId(id: number): Observable<Tarefa> {
        return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
    }

    atualizarTarefa(id: number, tarefa: TarefaRequest): Observable<Tarefa> {
        return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa);
    }

    deletarTarefa(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    listarCategorias(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:8080/api/categorias-tarefa');
    }
}
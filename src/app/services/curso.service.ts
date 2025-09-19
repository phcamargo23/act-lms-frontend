import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CursoRequest, CursoResponse} from '../models/curso.model';

@Injectable({
    providedIn: 'root'
})
export class CursoService {
    private apiUrl = 'http://localhost:8080/api/cursos';

    constructor(private http: HttpClient) {
    }

    listarCursos(): Observable<CursoResponse[]> {
        return this.http.get<CursoResponse[]>(this.apiUrl);
    }

    buscarCurso(id: number): Observable<CursoResponse> {
        return this.http.get<CursoResponse>(`${this.apiUrl}/${id}`);
    }

    criarCurso(curso: CursoRequest): Observable<CursoResponse> {
        return this.http.post<CursoResponse>(this.apiUrl, curso);
    }

    atualizarCurso(id: number, curso: CursoRequest): Observable<CursoResponse> {
        return this.http.put<CursoResponse>(`${this.apiUrl}/${id}`, curso);
    }

    deletarCurso(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

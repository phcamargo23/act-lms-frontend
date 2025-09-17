import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Matricula, MatriculaRequest} from '../models/matricula.model';

@Injectable({
    providedIn: 'root'
})
export class MatriculaService {
    private apiUrl = 'http://localhost:8080/api/matriculas';

    constructor(private http: HttpClient) {
    }

    criarMatricula(matricula: MatriculaRequest): Observable<Matricula> {
        return this.http.post<Matricula>(this.apiUrl, matricula);
    }

    atualizarMatricula(id: number, matricula: Matricula): Observable<Matricula> {
        return this.http.put<Matricula>(`${this.apiUrl}/${id}`, matricula);
    }

    listarMatriculasPorUsuario(usuarioId: number): Observable<Matricula[]> {
        return this.http.get<Matricula[]>(`${this.apiUrl}/usuario/${usuarioId}`);
    }

    listarMatriculasPorCurso(cursoId: number): Observable<Matricula[]> {
        return this.http.get<Matricula[]>(`${this.apiUrl}/curso/${cursoId}`);
    }

    listarTodasMatriculas(): Observable<Matricula[]> {
        return this.http.get<Matricula[]>(this.apiUrl);
    }

    cancelarMatricula(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}


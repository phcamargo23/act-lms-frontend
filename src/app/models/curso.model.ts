export interface Curso {
    id?: number;
    nome: string;
}

export interface CursoRequest {
    nome: string;
}

export interface CursoResponse {
    id: number;
    nome: string;
}

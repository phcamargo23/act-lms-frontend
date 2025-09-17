export interface Matricula {
    id?: number;
    usuarioId: number;
    usuarioNome: string;
    cursoId: number;
    cursoNome: string;
    dataInscricao: string;
}

export interface MatriculaRequest {
    usuarioId: number;
    cursoId: number;
}


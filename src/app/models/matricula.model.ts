import {Usuario} from './usuario.model';
import {Curso} from './curso.model';

export interface Matricula {
    id?: number;
    usuario: Usuario;
    curso: Curso;
    dataInscricao: string;
    ativa: boolean;
    dataCriacao?: string;
    dataAtualizacao?: string;
}

export interface MatriculaRequest {
    usuarioId: number;
    cursoId: number;
}


export interface Usuario {
    id?: number;
    nome: string;
    primeiroNome?: string;
    ultimoNome?: string;
    dataNascimento?: string;
    telefone?: string;
    tipoUsuario?: 'ADMIN' | 'ESTUDANTE';
    email: string;
    senha?: string;
    ativo: boolean;
    dataCriacao?: string;
    dataAtualizacao?: string;
}

export interface EstudanteRequest {
    primeiroNome: string;
    ultimoNome: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    senha: string;
}

export interface EstudanteResponse {
    id: number;
    primeiroNome: string;
    ultimoNome: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    dataCriacao: string;
}

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    id: number;
    primeiroNome: string;
    ultimoNome: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    tipoUsuario: string;
    dataCriacao: string;
}

// Interfaces para tratamento de erros da API
export interface ApiErrorResponse {
    message: string;
    status: number;
}


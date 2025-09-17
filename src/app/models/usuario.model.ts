export interface Usuario {
    id?: number;
    nome: string;
    primeiroNome?: string;
    ultimoNome?: string;
    dataNascimento?: string;
    telefone?: string;
    tipoUsuario?: 'ADMIN' | 'ESTUDANTE';
    email: string;
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


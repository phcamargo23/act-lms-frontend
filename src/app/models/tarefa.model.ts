export interface Tarefa {
    id?: number;
    matriculaId: number;
    matriculaUsuarioNome: string;
    categoriaId: number;
    categoriaNome: string;
    dataTarefa: string;
    descricao?: string;
    tempoGastoMinutos?: number;
}

export interface TarefaRequest {
    matriculaId: number;
    categoriaId: number;
    dataTarefa: string;
    descricao?: string;
    tempoGastoMinutos?: number;
}

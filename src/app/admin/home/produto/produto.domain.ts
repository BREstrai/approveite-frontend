import { Tags } from '../tag/tag.domain';

export class Produto {
    idProduto: number;
    descricao: string;
    idProdutoExterno: number;
    status: boolean;
    idEmpresa: number;
    idCategoria: number;
    idTipoUnMedida: number;
    qtdDisponivel: number;
    valorUn: number;
    img: string;
}
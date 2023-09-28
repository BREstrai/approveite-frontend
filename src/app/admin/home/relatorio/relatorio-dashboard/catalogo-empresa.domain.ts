import { Categoria } from '../../categoria/categoria.domain';
import { Produto } from '../../produto/produto.domain';

export class CatalogoEmpresa {
    categoria: Categoria;
	produtos: Produto[];
}
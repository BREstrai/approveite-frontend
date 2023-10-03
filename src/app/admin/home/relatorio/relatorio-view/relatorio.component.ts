import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidoCompleto } from '../../pedido/pedido-completo.domain';
import { MatTableDataSource } from '@angular/material/table';
import { DetalhePedido } from '../../pedido/detalhe-pedido/detalhe-pedido.domain';
import * as html2pdf from 'html2pdf.js';

@Component({
	selector: 'app-relatorio',
	templateUrl: './relatorio.component.html',
	styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent {

	@ViewChild('conteudoPDF', { static: false }) conteudoPDF: ElementRef;
	paineisExpansaoAbertos = false;

	displayedColumns: string[] = [];
	documento = new jsPDF();
	dataSourceMestre = new MatTableDataSource<PedidoCompleto>(this.data);
	dataSourceDetalhe: { [key: number]: MatTableDataSource<DetalhePedido> } = {};

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: PedidoCompleto[],
	) {
		console.log('Dados recebidos:', this.data);
		this.paineisExpansaoAbertos = false;
	}

	getDataSourceDetalhe(idPedido: number): MatTableDataSource<DetalhePedido> {
		if (!this.dataSourceDetalhe[idPedido]) {
			this.dataSourceDetalhe[idPedido] = new MatTableDataSource<DetalhePedido>(
				this.data.find((pedidoCompleto) => pedidoCompleto.pedido.idPedido === idPedido)?.pedidoDetalhe || []
			);
		}
		return this.dataSourceDetalhe[idPedido];
	}

	gerarPDF(): void {
		const conteudo = this.conteudoPDF.nativeElement;

		this.paineisExpansaoAbertos = true;

		html2pdf()
			.from(conteudo)
			.save('seu-arquivo.pdf');
	}
}

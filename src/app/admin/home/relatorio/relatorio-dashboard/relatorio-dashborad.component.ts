import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { conformToMask } from 'text-mask-core';
import { dateMask } from '../../../../shared/components/date-mask/date-mask';
import { MatDatepicker } from '@angular/material/datepicker';
import { Chart } from 'chart.js';
import { RelatorioService } from '../relatorio.service';
import { Categoria } from '../../categoria/categoria.domain';
import { FormBuilder } from '@angular/forms';
import { FiltroGrafico } from './filtro.domain';
import { PedidoCompleto } from '../../pedido/pedido-completo.domain';
import { RelatorioComponent } from '../relatorio-view/relatorio.component';
import { MatTableDataSource } from '@angular/material/table';
import { DetalhePedido } from '../../pedido/detalhe-pedido/detalhe-pedido.domain';

@Component({
	selector: 'app-relatorio-dashboard',
	templateUrl: './relatorio-dashborad.component.html',
	styleUrls: ['./relatorio-dashborad.component.scss']
})
export class RelatorioDashboardComponent implements OnInit {

	@ViewChild('dateInicial') dateInicial: ElementRef;
	@ViewChild('dateInicialPicker') dateInicialPicker: MatDatepicker<Date>;
	@ViewChild('dateFinal') dateFinal: ElementRef;
	@ViewChild('dateFinalPicker') dateFinalPicker: MatDatepicker<Date>;
	@ViewChild('grafico', { static: true }) grafico: ElementRef;

	data: PedidoCompleto[] = [];
	dataSourceDetalhe = new MatTableDataSource<DetalhePedido>();

	labelGrafico: string[] = [];
	dataGrafico: any[] = [];

	documento = new jsPDF();

	categorias: Categoria[];
	categoriaSelecionada: Categoria;

	idCategoria: number;
	public dataInicial: string;
	public dataFinal: string;


	constructor(
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private modal: MatDialog,
		private relatorioService: RelatorioService,
	) { }

	ngOnInit() {
		this.relatorioService.getCategorias()
			.subscribe((data) => {

				let listaCat: Categoria[] = [];

				data.forEach(element => {
					listaCat.push(element.categoria);
				});
				this.categorias = listaCat;
			});

		this.createChart();
	}

	ngAfterViewInit() {
		const inputInicial = this.dateInicial.nativeElement;
		inputInicial.addEventListener('input', (event) => {
			const maskedValue = conformToMask(event.target.value, dateMask, { guide: false }).conformedValue;
			this.dataInicial = maskedValue;
		});

		const inputFinal = this.dateFinal.nativeElement;
		inputFinal.addEventListener('input', (event) => {
			const maskedValue = conformToMask(event.target.value, dateMask, { guide: false }).conformedValue;
			this.dataFinal = maskedValue;
		});
	}

	createChart() {
		const chart = new Chart(this.grafico.nativeElement, {
			type: 'bar',
			data: {
				labels: this.labelGrafico,
				datasets: this.dataGrafico,
			},
			options: {
				responsive: true,
				scales: {
					xAxes: [{
						time: {
						},
					}],
				},
			},
		});
	}

	getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';

		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}

		return color;
	}

	setCategoria(categoria: number): void {
	
		this.idCategoria = categoria;
	}

	gerarRelatorio(): void {

		let filtro = new FiltroGrafico();
		filtro.dataInicial = this.converterDataParaUTC(this.dataInicial);
		filtro.dataFinal = this.converterDataParaUTC(this.dataFinal);
		filtro.idCategoria = this.idCategoria ? this.idCategoria : 0;
		filtro.idEmpresa = parseInt(localStorage.getItem('idEmpresa'));
			
		this.relatorioService.getRelatorio(filtro)
		.subscribe((relatorioData: PedidoCompleto[]) => {
			this.data = relatorioData;
			console.log(this.data);

			const dialogRef = this.modal.open(RelatorioComponent, {
				width: '90%',
				height: '90%',				
				data: this.data
			});
		});

	}

	carregarDados(): void {
		let filtro: FiltroGrafico = new FiltroGrafico();

		filtro.dataInicial = this.converterDataParaUTC(this.dataInicial) || new Date();
		filtro.dataFinal = this.converterDataParaUTC(this.dataFinal) || new Date();
		filtro.idCategoria = this.categoriaSelecionada != null ? this.categoriaSelecionada.idCategoria : 0;
		filtro.idEmpresa = parseInt(localStorage.getItem('idEmpresa'));

		this.relatorioService.getVendasPeriodo(filtro).subscribe((data) => {
			this.labelGrafico = [];
			this.dataGrafico = [];

			const categoriaInfo: { [descricao: string]: { index: number; borderColor: string; backgroundColor: string } } = {};

			data.forEach((item) => {
				const descricao = item.descricao;
				const total = item.total;
				const dataVenda = new Date(item.data);

				const dataFormatada = dataVenda.toISOString().split('T')[0];

				const chaveCategoria = descricao.toLowerCase();
				
				if (!categoriaInfo[chaveCategoria]) {
					categoriaInfo[chaveCategoria] = {
						index: this.labelGrafico.length,
						borderColor: this.getRandomColor(),
						backgroundColor: this.getRandomColor(),
					};

					this.labelGrafico.push(dataFormatada);
					this.dataGrafico.push({
						label: descricao,
						data: [],
						borderColor: categoriaInfo[chaveCategoria].borderColor,
						backgroundColor: categoriaInfo[chaveCategoria].backgroundColor,
						fill: true,
					});
				}

				const categoriaIndex = categoriaInfo[chaveCategoria].index;

				this.dataGrafico[categoriaIndex].data.push({
					x: dataFormatada,
					y: total,
				});

				this.dataGrafico[categoriaIndex].data.sort((a, b) => {
					return new Date(a.x).getTime() - new Date(b.x).getTime();
				});
			});

			this.labelGrafico.sort();
			this.createChart();
		});
	}

	converterDataParaUTC(dataString: string): Date | null {
		try {
			const partesData = dataString.split('/');

			if (partesData.length === 3) {
				const dia = partesData[0];
				const mes = partesData[1];
				const ano = partesData[2];

				const dataISO8601String = `${ano}-${mes}-${dia}T00:00:00.000Z`;

				return new Date(dataISO8601String);
			}

			console.error('Formato de data inválido:', dataString);
			return null;
		} catch (error) {
			console.error('Erro ao converter a data:', error);
			return null;
		}
	}
}

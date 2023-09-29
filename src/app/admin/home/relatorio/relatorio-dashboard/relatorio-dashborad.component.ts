import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { conformToMask } from 'text-mask-core';
import { dateMask } from '../../../../shared/components/date-mask/date-mask';
import { MatDatepicker } from '@angular/material/datepicker';
import { Chart, ChartScales, ChartOptions } from 'chart.js';
import { RelatorioService } from '../relatorio.service';
import { Categoria } from '../../categoria/categoria.domain';
import { FormBuilder } from '@angular/forms';
import { FiltroGrafico } from './filtro.domain';

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

	labelGrafico: string[] = [];
	dataGrafico: any[] = [];


	documento = new jsPDF();

	categorias: Categoria[];
	categoriaSelecionada: Categoria;

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
			type: 'bar', // Tipo de gráfico de barras
			data: {
				labels: this.labelGrafico, // Rótulos no eixo X (datas)
				datasets: this.dataGrafico, // Dados dos gráficos
			},
			options: {
				responsive: true,
				scales: {
					xAxes: [{
						type: 'time', // Defina o tipo do eixo X para 'time' se estiver usando datas
						time: {
							unit: 'day', // Unidade de tempo, como 'day' para exibir datas diárias
						},
					}],
					// Outras opções de escala, como o eixo Y
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

	carregarDados(): void {
		let filtro: FiltroGrafico = new FiltroGrafico();

		filtro.dataInicial = this.converterDataParaUTC(this.dataInicial) || new Date();
		filtro.dataFinal = this.converterDataParaUTC(this.dataFinal) || new Date();
		filtro.idCategoria = this.categoriaSelecionada != null ? this.categoriaSelecionada.idCategoria : 0;
		filtro.idEmpresa = parseInt(localStorage.getItem('idEmpresa'));

		this.relatorioService.getVendasPeriodo(filtro).subscribe((data) => {
			// Inicialize os arrays de labels e datasets
			this.labelGrafico = [];
			this.dataGrafico = [];

			// Crie um objeto de mapeamento para rastrear os índices das categorias e suas cores
			const categoriaInfo: { [descricao: string]: { index: number; borderColor: string; backgroundColor: string } } = {};

			data.forEach((item) => {
				const descricao = item.descricao;
				const total = item.total;
				const dataVenda = new Date(item.data);

				// Use a data formatada como rótulo no eixo x
				const dataFormatada = dataVenda.toISOString().split('T')[0]; // Pega apenas a parte da data

				// Use a descrição da categoria como chave para rastrear os índices
				const chaveCategoria = descricao.toLowerCase();

				// Use a descrição da categoria como rótulo se não existir nos labels
				if (!categoriaInfo[chaveCategoria]) {
					categoriaInfo[chaveCategoria] = {
						index: this.labelGrafico.length,
						borderColor: this.getRandomColor(),
						backgroundColor: this.getRandomColor(), // Defina uma cor de preenchimento aleatória
					};

					this.labelGrafico.push(dataFormatada);
					this.dataGrafico.push({
						label: descricao,
						data: [],
						borderColor: categoriaInfo[chaveCategoria].borderColor,
						backgroundColor: categoriaInfo[chaveCategoria].backgroundColor, // Use a cor de preenchimento
						fill: true, // Preencher a área sob as barras
					});
				}

				// Encontre o índice da categoria
				const categoriaIndex = categoriaInfo[chaveCategoria].index;

				// Adicione os dados ao conjunto de dados correto
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

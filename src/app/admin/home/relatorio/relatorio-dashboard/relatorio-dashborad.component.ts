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
import { DadosCategoriaVendas } from './categorias-total.domain';
import { Observable } from 'rxjs';
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

	public dataInicial: string = '';
	public dataFinal: string = '';

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

		const chart = new Chart(this.grafico.nativeElement, {
			type: 'line',
			data: {
				labels: this.labelGrafico,
				datasets: this.dataGrafico,
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						labels: {
							color: 'white',
						},
					},
				},
			},
		});
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

	carregarDados(): void {

		let filtro: FiltroGrafico = new FiltroGrafico();
		filtro.dataInicial = new Date(this.dataInicial);
		filtro.dataFinal = new Date(this.dataFinal);
		filtro.idCategoria = this.categoriaSelecionada != null ? this.categoriaSelecionada.idCategoria : 0;		
		filtro.idEmpresa = parseInt(localStorage.getItem('idEmpresa'));

		this.relatorioService.getVendasPeriodo(filtro).subscribe((data) => {
			let dados: DadosCategoriaVendas[] = [];
			data.forEach(element => {
				dados.push(element);
			});
		});
	}
}

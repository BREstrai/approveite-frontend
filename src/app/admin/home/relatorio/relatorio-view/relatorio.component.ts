import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-relatorio',
	templateUrl: './relatorio.component.html',
	styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

	displayedColumns: string[] = [];
	documento = new jsPDF();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private modal: MatDialog
	) {
	}

	ngOnInit(): void {}

	downloadPDF(): void {
		
	}

	closeRelatorio(): void {
		this.router.navigate(['../'], { relativeTo: this.route });
	}
}

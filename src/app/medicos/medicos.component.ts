import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Medico } from '../model/medico';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nomeCompleto', 'dataNascimento', 'crm', 'cargo', 'telefone', 'cep'];
  dataSource!: MatTableDataSource<Medico>;
  medicos: Medico[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  form: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {

    this.form = this.fb.group({
      filtro: [''],
      categoria: [''],
      status: ['']
    });
  }

  ngOnInit() {
    this.medicos = [
      { id: 1, nomeCompleto: 'Roberto Carvalho', dataNascimento: new Date('1985-12-05'), crm: '837654', cargo: 'Cardiologista', telefone: "(11) 99321-3453", cep: '35401-100' },
      { id: 2, nomeCompleto: 'Pedro Tonini', dataNascimento: new Date('1994-12-02'), crm: '910394', cargo: 'Neurologista', telefone: "(55) 98455-1212", cep: '92031-415' },
      { id: 3, nomeCompleto: 'Mariana Schneider', dataNascimento: new Date('2001-10-03'), crm: '934009', cargo: 'Fisioterapeuta', telefone: "(13) 98100-5632", cep: '87400-050' },
      { id: 4, nomeCompleto: 'Carolina Pereira', dataNascimento: new Date('1990-03-08'), crm: '869586', cargo: 'Pediatra', telefone: "(11) 99831-2482", cep: '56706-510' },
    ];
    this.dataSource = new MatTableDataSource(this.medicos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

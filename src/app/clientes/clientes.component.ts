import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastrarClienteComponent } from '../components/modal-cadastrar-cliente/modal-cadastrar-cliente.component';
import { Cliente } from '../model/cliente';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nomeCompleto', 'dataNascimento', 'cpf', 'genero', 'telefone', 'cep', 'actions'];
  dataSource!: MatTableDataSource<Cliente>;
  clientes: Cliente[] = [];

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
    this.clientes = [
      { id: 1, nomeCompleto: 'João Silva', dataNascimento: new Date('1992-10-01'), cpf: '999.999.999-99', genero: 'Masculino', telefone: "(11) 99999-9999", cep: '01001-000' },
      { id: 2, nomeCompleto: 'Maria Oliveira', dataNascimento: new Date('2004-10-02'), cpf: '000.000.000-00', genero: 'Feminino', telefone: "(11) 99999-9999", cep: '01001-000' },
      { id: 3, nomeCompleto: 'Carlos Souza', dataNascimento: new Date('1973-10-03'), cpf: '111.111.111-11', genero: 'Masculino', telefone: "(11) 99999-9999", cep: '01001-000' },
      { id: 4, nomeCompleto: 'Ana Pereira', dataNascimento: new Date('1965-10-04'), cpf: '111.111.111-11', genero: 'Feminino', telefone: "(11) 99999-9999", cep: '01001-000' },
    ];
    this.dataSource = new MatTableDataSource(this.clientes);

    this.form = this.fb.group({
      filtro: ['']

    });
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

  limparDados(cliente: Cliente) {
    let indiceRemover = this.clientes.indexOf(cliente);
    if (indiceRemover > -1) {
      this.clientes.splice(indiceRemover, 1);
      this.dataSource = new MatTableDataSource(this.clientes);
    }
  }


  limparFiltro() {
    this.form.get('filtro')?.setValue('');
    this.dataSource.filter = '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalCadastrarClienteComponent, {
      width: '600px'
    })

    dialogRef.afterClosed().subscribe((novoCliente: Cliente) => {
      if (novoCliente) {
        this.clientes.push(novoCliente);
        this.dataSource = new MatTableDataSource(this.clientes);
        this.limparFiltro();
      }
    });
  };

  editar(cliente: Cliente) {
    const dialogRef = this.dialog.open(ModalCadastrarClienteComponent, {
      width: '600px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe((clienteEditado: Cliente) => {
      if (clienteEditado) {
        let indEditado = this.clientes.indexOf(cliente);
        if (indEditado > -1) {
          this.clientes[indEditado] = clienteEditado;
          this.dataSource = new MatTableDataSource(this.clientes);
        }
      }
    });
  }
}


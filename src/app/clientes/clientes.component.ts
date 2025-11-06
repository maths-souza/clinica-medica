import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastrarClienteComponent } from '../components/modal-cadastrar-cliente/modal-cadastrar-cliente.component';
import { Cliente } from '../model/cliente';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Endereco } from '../model/endereco';

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
      { id: 1, nomeCompleto: 'João Silva', dataNascimento: new Date('1992-10-01'), cpf: '476.965.421-92', genero: 'Masculino', telefone: "(44) 99101-0977", endereco: {cep: '87509-779'}},
      { id: 2, nomeCompleto: 'Maria Oliveira', dataNascimento: new Date('2004-10-02'), cpf: '874.786.257-20', genero: 'Feminino', telefone: "(48) 98571-4474", endereco: {cep: '88806-782'}},
      { id: 3, nomeCompleto: 'Carlos Souza', dataNascimento: new Date('1973-10-03'), cpf: '772.133.293-16', genero: 'Masculino', telefone: "(92) 98202-5590", endereco: {cep: '69088-365'}},
      { id: 4, nomeCompleto: 'Ana Pereira', dataNascimento: new Date('1965-10-04'), cpf: '856.977.492-36', genero: 'Feminino', telefone: "(51) 98468-5111", endereco: {cep: '90690-120'}},
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

    dialogRef.afterClosed().subscribe(novoCliente => {
      if (novoCliente) {
        console.log("Teste" , novoCliente);
        novoCliente = this.montarCliente(novoCliente);
        this.clientes.push(novoCliente);
        this.dataSource = new MatTableDataSource(this.clientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.limparFiltro();
      }
    }, (error) => {
      console.log(error);
      
    });
  };

  visualizar(cliente : Cliente){
    let dialogRef = this.dialog.open(ModalCadastrarClienteComponent, 
      { width: '600px',
        data: {cliente: cliente, visualizar: true}
       });
       dialogRef.afterClosed().subscribe(()=>{

       });
  }

  editar(cliente: Cliente) {
    const dialogRef = this.dialog.open(ModalCadastrarClienteComponent, {
      width: '600px',
      data: { cliente: cliente, visualizar: false }
    });

    dialogRef.afterClosed().subscribe((clienteEditado: Cliente) => {
      if (clienteEditado) {
        let indEditado = this.clientes.indexOf(cliente);
        if (indEditado > -1) {
          clienteEditado = this.montarCliente(clienteEditado);
          this.clientes[indEditado] = clienteEditado;
          this.dataSource = new MatTableDataSource(this.clientes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  private montarCliente(novoCliente: any): Cliente  {
    let endereco = new Endereco();
    endereco.cep = novoCliente.cep;
    endereco.logradouro = novoCliente.logradouro;
    endereco.bairro = novoCliente.bairro;
    endereco.numero = novoCliente.numero;
    endereco.complemento = novoCliente.complemento;
    endereco.cidade = novoCliente.cidade;
    endereco.estado = novoCliente.estado;
    novoCliente.endereco = endereco;
    return novoCliente;
  }

}


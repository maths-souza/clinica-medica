import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-cadastrar-cliente',
  templateUrl: './modal-cadastrar-cliente.component.html',
  styleUrls: ['./modal-cadastrar-cliente.component.scss']
})
export class ModalCadastrarClienteComponent implements OnInit {
  form: FormGroup;

  constructor(private cd: ChangeDetectorRef,private fb: FormBuilder) { 
    this.form = this.fb.group({
      cliente: [''],
      servico: [''],
      tempoEstimado: [''],
      valorServico: [''],
      responsavel: [''],
      dtAtendimento: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
  }

}

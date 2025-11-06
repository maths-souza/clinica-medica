import { ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/model/cliente';
import { ViacepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-modal-cadastrar-cliente',
  templateUrl: './modal-cadastrar-cliente.component.html',
  styleUrls: ['./modal-cadastrar-cliente.component.scss']
})
export class ModalCadastrarClienteComponent implements OnInit {
  form: FormGroup;
  visualizar: boolean = false;
  modo: 'visualizar' | 'novo' | 'editar' = 'novo';

  constructor(private cd: ChangeDetectorRef,
              private fb: FormBuilder,
              private viacep: ViacepService,
              private dialogRef: MatDialogRef<ModalCadastrarClienteComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente, visualizar: boolean }
  ) {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: [''],
      bairro: [''],
      numero: [''],
      complemento: [''],
      cidade: [''],
      estado: [''],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data?.cliente) {
    this.preenchimentoForm(this.data.cliente);
    if (this.data?.visualizar) {
    this.modo = 'visualizar';
    this.visualizar = true;
    this.form.disable();
  }else {
        this.modo = 'editar';
      }
    } else {
      this.modo = 'novo';
    }
   }

  cadastrar() {
    console.log("Cadastrando", this.form.value)
    this.dialogRef.close(this.form?.value)
  }

  preenchimentoForm(cliente: Cliente) {
    console.log("Edição", cliente);
    
    this.form = this.fb.group({
      nomeCompleto: [cliente.nomeCompleto, Validators.required],
      cpf: [cliente.cpf, Validators.required],
      dataNascimento: [cliente.dataNascimento, Validators.required],
      genero: [cliente.genero, Validators.required],
      telefone: [cliente.telefone, Validators.required],
      cep: [cliente.endereco.cep, Validators.required],
      logradouro: [cliente.endereco.logradouro],
      bairro: [cliente.endereco.bairro],
      numero: [cliente.endereco.numero],
      complemento: [cliente.endereco.complemento],
      cidade: [cliente.endereco.cidade],
      estado: [cliente.endereco.estado],
    });
  }

  onCepBlur(): void {
    const cep = (this.form.get('cep')?.value || '').replace(/\D/g, '');

    if (cep.length !== 8) {
      return;
    }

    this.viacep.buscarCep(cep).subscribe({
      next: (response: any) => {

        if (response && !response.erro) {
          this.form.patchValue({
            logradouro: response.logradouro || '',
            bairro: response.bairro || '',
            cidade: response.localidade || '',
            estado: response.uf || ''
          });
        } else {
          this.form.patchValue({
            logradouro: '',
            bairro: '',
            cidade: '',
            estado: ''
          });
        }
        this.cd.markForCheck();
      },
      error: () => {
        this.form.patchValue({
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: ''
        });
        this.cd.markForCheck();
      }
    });
  }
}
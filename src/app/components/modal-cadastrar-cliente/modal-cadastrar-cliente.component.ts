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

  constructor(private cd: ChangeDetectorRef,
              private fb: FormBuilder,
              private viacep: ViacepService,
              private dialogRef: MatDialogRef<ModalCadastrarClienteComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: [''],
      complemento: [''],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data) {
    this.preenchimentoForm(this.data);  
    }
   }

  cadastrar() {
    this.dialogRef.close(this.form?.value)
  }

  preenchimentoForm(cliente: Cliente) {
    this.form = this.fb.group({
      nomeCompleto: [cliente.nomeCompleto, Validators.required],
      cpf: [cliente.cpf, Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: [''],
      complemento: [''],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
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
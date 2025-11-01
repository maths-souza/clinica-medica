import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string | number): string {
    let valorFormatado = value + ''; // Converte para string
    valorFormatado = valorFormatado
      .replace(/[^0-9]/g, '') // Remove caracteres não numéricos
      .padStart(11, '0')    // Completa com zeros à esquerda se for menor que 11 dígitos (opcional, para garantir 11 dígitos)
      .substr(0, 11)       // Limita a 11 dígitos
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Aplica a máscara

    return valorFormatado;
  }
}

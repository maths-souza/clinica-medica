import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return '';

    // normaliza para string e remove tudo que não for dígito
    let digits = String(value).replace(/\D/g, '');

    // remove código do país se existir (+55 ou 55)
    if (digits.startsWith('+55')) {
      digits = digits.slice(2);
    }

    // se tiver mais de 11 dígitos, pega os últimos 11 (preserva DDD+numero)
    if (digits.length > 11) {
      digits = digits.slice(-11);
    }

    // formata conforme quantidade de dígitos
    if (digits.length === 11) {
      // (AA) 9xxxx-xxxx
      return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (digits.length === 10) {
      // (AA) xxxx-xxxx
      return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (digits.length > 2) {
      // tenta um formatação parcial (com DDD se houver)
      const ddd = digits.slice(0, 2);
      const rest = digits.slice(2);
      return `(${ddd}) ${rest}`;
    }

    // se for muito curto, retorna como está (apenas dígitos)
    return digits;
  }
}

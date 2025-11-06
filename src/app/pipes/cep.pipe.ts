import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {
 transform(value: string | number): string {
    if (!value) {
      return '';
    }

    let cepValue = String(value).replace(/\D/g, ''); // Remove non-numeric characters

    if (cepValue.length !== 8) {
      return value.toString(); // Return original if not 8 digits
    }

    // Apply the CEP mask: XXXXX-XXX
    return cepValue.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }
}

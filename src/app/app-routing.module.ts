import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { MedicosComponent } from './medicos/medicos.component';

const routes: Routes = [
  {path: '', component: ClientesComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'medicos', component: MedicosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaPrincipalMedicoComponent } from './pagina-principal-medico/pagina-principal-medico.component';
import { TabsAtenderPacienteComponent } from './tabs-atender-paciente/tabs-atender-paciente.component';
import { TablaCitasPendientesComponent } from './tabla-citas-pendientes/tabla-citas-pendientes.component';
import { TablaCitasRealizadasComponent } from './tabla-citas-realizadas/tabla-citas-realizadas.component';
import { FormularioDiagnosticarComponent } from './formulario-diagnosticar/formulario-diagnosticar.component';
import { FormularioGenerarVolanteComponent } from './formulario-generar-volante/formulario-generar-volante.component';
import { TablaHistorialComponent } from './tabla-historial/tabla-historial.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { GeneralModule } from '../general/general.module';
import { DataTablesModule } from 'angular-datatables';
import { AtenderPacienteMedicoComponent } from './atender-paciente-medico/atender-paciente-medico.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HistorialComponent } from './historial/historial.component';
import { BreadcrumbHistorialComponent } from './breadcrumb-historial/breadcrumb-historial.component';
import { FormularioHistorialComponent } from './formulario-historial/formulario-historial.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupImagenComponent } from './popup-imagen/popup-imagen.component';
import { InventarioMedicoComponent } from './inventario/inventario.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { TablaInventarioComponent } from './tabla-inventario/tabla-inventario.component';
import { CuadroInformativoMedicoComponent } from './cuadro-informativo-medico/cuadro-informativo-medico.component';
import { DetallesInventarioMedicoComponent } from './detalles-inventario-medico/detalles-inventario-medico.component';


// const routes: Routes = [
//   { path: 'medico', component: PaginaPrincipalMedicoComponent },
//   { path: 'medico/atender-paciente', component: AtenderPacienteMedicoComponent },
// ];

@NgModule({
  declarations: [
    PaginaPrincipalMedicoComponent,
       TabsAtenderPacienteComponent,
       TablaCitasPendientesComponent,
       TablaCitasRealizadasComponent,
       FormularioDiagnosticarComponent,
       FormularioGenerarVolanteComponent,
       TablaHistorialComponent,
       AtenderPacienteMedicoComponent,
       HistorialComponent,
       BreadcrumbHistorialComponent,
       FormularioHistorialComponent,
       PopupImagenComponent,
       InventarioMedicoComponent,
       PedidosComponent,
       TablaInventarioComponent,
       CuadroInformativoMedicoComponent,
       DetallesInventarioMedicoComponent,
  ],
  imports: [
    CommonModule,
    GeneralModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})


export class MedicoModule { }

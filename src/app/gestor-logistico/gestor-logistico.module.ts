import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { GeneralModule } from '../general/general.module';
import { VentanaDosOpcionesComponent } from './ventana-dos-opciones/ventana-dos-opciones.component';
import { TablaPedidosPendientesComponent } from './tabla-pedidos-pendientes/tabla-pedidos-pendientes.component';
import { TablaPedidosRecibidosComponent } from './tabla-pedidos-recibidos/tabla-pedidos-recibidos.component';
import { InterfacesModule } from '../interfaces/interfaces.module';
import { DataTablesModule } from 'angular-datatables';
import { CuadroInformativoComponent } from './cuadro-informativo/cuadro-informativo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    SolicitudesComponent,
    PedidosComponent,
    InventarioComponent,
    ProveedoresComponent,
    VentanaDosOpcionesComponent,
    TablaPedidosPendientesComponent,
    TablaPedidosRecibidosComponent,
    CuadroInformativoComponent,
  ],
  imports: [
    CommonModule,
    GeneralModule,
    InterfacesModule,
    DataTablesModule,
    FontAwesomeModule,
  ]
})
export class GestorLogisticoModule { }

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuadroInformativoComponent } from './cuadro-informativo/cuadro-informativo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CrearPedidoComponent } from './crear-pedido/crear-pedido.component';
import { DosPasosFormularioComponent } from './dos-pasos-formulario/dos-pasos-formulario.component';
import { TablaArticulosFormularioComponent } from './tabla-articulos-formulario/tabla-articulos-formulario.component';
import { TablaCarritoFormularioComponent } from './tabla-carrito-formulario/tabla-carrito-formulario.component';
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
    CrearPedidoComponent,
    DosPasosFormularioComponent,
    TablaArticulosFormularioComponent,
    TablaCarritoFormularioComponent,
  ],
  imports: [
    CommonModule,
    GeneralModule,
    InterfacesModule,
    DataTablesModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class GestorLogisticoModule { }

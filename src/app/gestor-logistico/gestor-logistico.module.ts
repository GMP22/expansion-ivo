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
import { TablaConfirmarPedidoFormularioComponent } from './tabla-confirmar-pedido-formulario/tabla-confirmar-pedido-formulario.component';
import { DetallespedidoComponent } from './detallespedido/detallespedido.component';
import { TablaInventarioComponent } from './tabla-inventario/tabla-inventario.component';
import { DetallesArticuloInventarioComponent } from './detalles-articulo-inventario/detalles-articulo-inventario.component';
import { TablaSolicitudesEntrantesComponent } from './tabla-solicitudes-entrantes/tabla-solicitudes-entrantes.component';
import { TablaSolicitudesHistorialComponent } from './tabla-solicitudes-historial/tabla-solicitudes-historial.component';
import { DetallesSolicitudComponent } from './detalles-solicitud/detalles-solicitud.component';
import { CrearProveedoresComponent } from './crear-proveedores/crear-proveedores.component';
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
    TablaConfirmarPedidoFormularioComponent,
    DetallespedidoComponent,
    TablaInventarioComponent,
    DetallesArticuloInventarioComponent,
    TablaSolicitudesEntrantesComponent,
    TablaSolicitudesHistorialComponent,
    DetallesSolicitudComponent,
    CrearProveedoresComponent,
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

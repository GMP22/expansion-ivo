import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { ConfirmaComponent } from './confirma/confirma.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MensajeConfirmacionComponent } from './mensaje-confirmacion/mensaje-confirmacion.component';
import { ComponentePendienteRealizadaComponent } from './componente-pendiente-realizada/componente-pendiente-realizada.component';
import { BtnAnteriorComponent } from './btn-anterior/btn-anterior.component';
import { BtnCancelarComponent } from './btn-cancelar/btn-cancelar.component';
import { BtnSiguienteComponent } from './btn-siguiente/btn-siguiente.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavLateralComponent } from './nav-lateral/nav-lateral.component';
import { NavOpcionesComponent } from './nav-opciones/nav-opciones.component';
import { NavLogoutComponent } from './nav-logout/nav-logout.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { ConfirmarCambiosComponent } from './confirmar-cambios/confirmar-cambios.component';




@NgModule({
  declarations: [
    BarraLateralComponent,
    NavBarComponent,
    ComponentePendienteRealizadaComponent,
    BreadcrumbComponent,
    ConfirmaComponent,
    NavLateralComponent,
    NavOpcionesComponent,
    NavLogoutComponent,
    PlantillaComponent,
    NoEncontradoComponent,
    ConfirmarCambiosComponent,
    MensajeConfirmacionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    BarraLateralComponent,
    NavBarComponent,
    ConfirmaComponent,
    ComponentePendienteRealizadaComponent,
    BreadcrumbComponent,
    PlantillaComponent,
    ConfirmarCambiosComponent,
    MensajeConfirmacionComponent,
  ]
})
export class GeneralModule { }

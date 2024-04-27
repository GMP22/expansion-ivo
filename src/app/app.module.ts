import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { MensajeConfirmacionComponent } from './general/mensaje-confirmacion/mensaje-confirmacion.component';
import { NavBarComponent } from './general/nav-bar/nav-bar.component';

import { GeneralModule } from './general/general.module';
import { RadiologoModule } from './radiologo/radiologo.module';


import { FormsModule } from '@angular/forms';
import { AdministrativoModule } from './administrativo/administrativo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { PacienteModule } from './paciente/paciente.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MedicoModule } from './medico/medico.module';
import { InterceptorService } from './interceptors/interceptor.service';
import { GestorLogisticoModule } from './gestor-logistico/gestor-logistico.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GeneralModule,
    AppRoutingModule,
    RadiologoModule,
    AdministrativoModule,
    BrowserModule,
    RadiologoModule,
    BrowserAnimationsModule,
    PacienteModule,
    LoginModule,
    HttpClientModule,
    MedicoModule,
    GestorLogisticoModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from './general/general.module';
import { MedicoModule } from './medico/medico.module';
import { GestorLogisticoModule } from './gestor-logistico/gestor-logistico.module';
import { ComponentePaginaPrincipalRadiologoComponent } from './radiologo/componente-pagina-principal-radiologo/componente-pagina-principal-radiologo.component';
import { ComponentePendienteRealizadaComponent } from './general/componente-pendiente-realizada/componente-pendiente-realizada.component';
import { TablaCitasComponent } from './radiologo/tabla-citas/tabla-citas.component';
import { CrearCitasComponent } from './administrativo/crear-citas/crear-citas.component';
import { ConfirmarCitasComponent } from './administrativo/confirmar-citas/confirmar-citas.component';
import { DetallesCitaComponent } from './administrativo/detalles-cita/detalles-cita.component';
import { ModificarCitaComponent } from './administrativo/modificar-cita/modificar-cita.component';
import { AtenderPacienteComponent } from './radiologo/atender-paciente/atender-paciente.component';
import { ComponentePaginaPrincipalAdministrativoComponent } from './administrativo/componente-pagina-principal-administrativo/componente-pagina-principal-administrativo.component';
import { TablaCitasPendientesComponent } from './administrativo/tabla-citas-pendientes/tabla-citas-pendientes.component';
import { PaginaPrincipalPacienteComponent } from './paciente/pagina-principal-paciente/pagina-principal-paciente.component';
import { PaginaCitaPruebasComponent } from './paciente/pagina-cita-pruebas/pagina-cita-pruebas.component';
import { CitasPacienteDetallesComponent } from './paciente/citas-paciente-detalles/citas-paciente-detalles.component';
import { TabsAtenderPacienteComponent } from './medico/tabs-atender-paciente/tabs-atender-paciente.component';
import { PaginaPrincipalMedicoComponent } from './medico/pagina-principal-medico/pagina-principal-medico.component';
import { AtenderPacienteMedicoComponent } from './medico/atender-paciente-medico/atender-paciente-medico.component';
import { HistorialComponent } from './medico/historial/historial.component';
import { BuscarPacienteComponent } from './administrativo/buscar-paciente/buscar-paciente.component';
import { PlantillaComponent } from './general/plantilla/plantilla.component';
import { PaginaPacienteComponent } from './administrativo/pagina-paciente/pagina-paciente.component';
import { TablaCitasGeneralesComponent } from './administrativo/tabla-citas-generales/tabla-citas-generales.component';
import { FormularioAltaPacienteComponent } from './administrativo/formulario-alta-paciente/formulario-alta-paciente.component';
import { PaginaLoginComponent } from './login/pagina-login/pagina-login.component';
import { loginGuard } from './guard/login.guard';
import { rolGuard } from './guard/rol.guard';
import { NoEncontradoComponent } from './general/no-encontrado/no-encontrado.component';
import { tableLayouts } from 'pdfmake/build/pdfmake';
import { SolicitudesComponent } from './gestor-logistico/solicitudes/solicitudes.component';
import { PedidosComponent } from './gestor-logistico/pedidos/pedidos.component';
import { InventarioComponent } from './gestor-logistico/inventario/inventario.component';
import { ProveedoresComponent } from './gestor-logistico/proveedores/proveedores.component';

const routes: Routes = [

  {
    path: 'app',
    component: PlantillaComponent,
    canActivate: [loginGuard],
    canActivateChild: [loginGuard],
    pathMatch: "prefix",
    children:[
      {
        path: 'gestor-logistico',
        component: SolicitudesComponent, // Generar componente de Gestor Logistico ptm
        canActivate: [rolGuard],
        data: {
          idRol: 6,
        }
      },
      {
        path: 'gestor-logistico/pedidos',
        component: PedidosComponent, // Generar componente de Gestor Logistico ptm
        canActivate: [rolGuard],
        data: {
          idRol: 6,
        }
      },
      {
        path: 'gestor-logistico/inventario',
        component: InventarioComponent, // Generar componente de Gestor Logistico ptm
        canActivate: [rolGuard],
        data: {
          idRol: 6,
        }
      },
      {
        path: 'gestor-logistico/proveedores',
        component: ProveedoresComponent, // Generar componente de Gestor Logistico ptm
        canActivate: [rolGuard],
        data: {
          idRol: 6,
        }
      },
      {
        path: 'administrativo',
        component: TablaCitasGeneralesComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 5,
        }
      },
      {
        path: 'administrativo/paciente/:id_paciente', // La URL contendrá el id del paciente despues de ser creado/buscado
        component: PaginaPacienteComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 5,
        }
      },
      {
        path: 'administrativo/alta-paciente',
        component: FormularioAltaPacienteComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 5,
        }
      },
      {
        path: 'administrativo/crear-citas',
        component: CrearCitasComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 5,
        }
      },
      {
        path: 'administrativo/confirmar-citas',
        component: ConfirmarCitasComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 5,
        }
      },
      {
        path: 'administrativo/detalles-citas/:nombreMedico/:nombreServicio/:hora/:fecha/:idCita/:idPaciente',
        component: DetallesCitaComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 5,
        }
      },
      {
        path: 'administrativo/modificar-citas/:id_cita',
        component: ModificarCitaComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 5,
        }
      },
      {
        path: 'administrativo/buscar-paciente',
        component: BuscarPacienteComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 5,
        }
      },
      {
        path: 'radiologo',
        component: ComponentePaginaPrincipalRadiologoComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 4,
        }
      },
      {
        path: 'radiologo/atender-paciente',
        component: AtenderPacienteComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 4,
        }
      },
      {
        path: 'paciente',
        component: PaginaPrincipalPacienteComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 3,
        }
      }
      ,
      {
        path: 'paciente/pruebas',
        component: PaginaCitaPruebasComponent,
        data: {
          idRol: 3,
        }
      },
      {
        path: 'paciente/detalles',
        component: CitasPacienteDetallesComponent,
        data: {
          idRol: 3,
        }
      },
      {
        path: 'tabla-pacientes',
        component: TablaCitasComponent,
      },
      {
        path: 'medico',
        component: PaginaPrincipalMedicoComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 2,
        }
      },
      {
        path: 'medico/atender-paciente',
        component: AtenderPacienteMedicoComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 2,
        }
      },
      {
        path: 'medico/atender-paciente/historial',
        component: HistorialComponent,
        canActivate: [rolGuard],
        data: {
          idRol: 2,
        }
      },
    ]
  },


  {
    path: 'pr',
    component: ComponentePendienteRealizadaComponent
  },

  //LOGIN
  /*
  {
    path: 'login',
    component: PaginaLoginComponent
  },
*/
  {
    path: '',
    component: PaginaLoginComponent
  },

  //RUTAS RADIÓLOGO
  /*
  {
    path: 'radiologo',
    component: ComponentePaginaPrincipalRadiologoComponent,
    children: [
      // {
      //     path: 'citas-realizadas',
      //     component: ComponenetePaginaCitaRealizadasComponent
      // }
    ]
  },
  */
  // {
  //   path: 'radiologo/citas-realizadas',
  //   component: ComponenetePaginaCitaRealizadasComponent
  // },
  {
    path: 'tabla',
    component: TablaCitasComponent
  },

  //RUTAS MÉDICO
  {
    path: 'tabs',
    component: TabsAtenderPacienteComponent
  },

  {
    path: 'plantilla',
    component: PlantillaComponent
  },
  {
    path: '**',
    component: NoEncontradoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

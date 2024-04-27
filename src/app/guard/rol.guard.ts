import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router'

export const rolGuard: CanActivateFn = (route, state) => {

  const rol = route.data['idRol']

  
  
  if (Number(localStorage.getItem("rol")) == rol) {

    return true;
  
  } else {
   
    let ubicacion:Router = new Router();

    switch (Number(localStorage.getItem("rol"))) {
      case 2:
        ubicacion.navigateByUrl('/app/medico');
      break;
      case 3:
        ubicacion.navigateByUrl('/app/paciente');
      break;
      case 4:
        ubicacion.navigateByUrl('/app/radiologo');
      break;
      case 5:
        ubicacion.navigateByUrl('/app/administrativo');
      break;
      case 6:
        ubicacion.navigateByUrl('/app/gestor-logistico');
      break;
    }

    return false;
  }

  
  
};

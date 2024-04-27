import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicioService } from 'src/app/api-servicio.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css'],
})

export class PaginaLoginComponent {
    formulario!: FormGroup;
    teHasEquivocado:boolean = false;
    sesionCerrada = false;

    correoEquivocado = false;
    passwordEquivocado = false;
    sesionCerradaExitosamente: boolean = false;

    servicio = inject(ApiServicioService);

    constructor(private router: Router){
      this.formulario = new FormGroup({
        correo: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      })

      if (localStorage.getItem('token_usuario') === null) {
        this.sesionCerrada = true;
      }
    }

    

    

    async onSubmit(){
      console.log("Datos de correo " + this.formulario.controls["correo"].value);

      if (this.formulario.invalid) {

        if (this.formulario.get('correo')?.invalid) {
          this.correoEquivocado = true;
        } else {
          this.correoEquivocado = false;
        }

        if (this.formulario.get('password')?.invalid) {
          this.passwordEquivocado = true;
        } else {
          this.passwordEquivocado = false;
        }

      } else {
        this.correoEquivocado = false;
        this.passwordEquivocado = false;
        this.servicio.login(this.formulario.value).subscribe(
          (response) => {
          console.log("Login hecho");
            localStorage.setItem('token_usuario', response.token);
            localStorage.setItem('id_usuario', response.user.id_usuario);
            localStorage.setItem('rol', response.user.id_rol);
    
            switch (Number(localStorage.getItem("rol"))) {
              case 2:
                this.router.navigateByUrl('/app/medico');
              break;
              case 3:
                this.router.navigateByUrl('/app/paciente');
              break;
              case 4:
                this.router.navigateByUrl('/app/radiologo');
              break;
              case 5:
                this.router.navigateByUrl('/app/administrativo');
              break;
              case 6:
                this.router.navigateByUrl('/app/gestor-logistico');
              break;
            }
        },
        (error) => {
            if (error.status == 401) {
              this.teHasEquivocado = true;
              this.sesionCerrada = false;
              localStorage.setItem('token_usuario', ''); 
              console.log("Credenciales erroneas");
            }
          } 
        );
      }

      
    }
}

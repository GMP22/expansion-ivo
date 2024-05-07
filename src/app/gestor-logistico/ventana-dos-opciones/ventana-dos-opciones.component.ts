import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ventana-dos-opciones',
  templateUrl: './ventana-dos-opciones.component.html',
  styleUrls: ['./ventana-dos-opciones.component.css']
})
export class VentanaDosOpcionesComponent {

  @Input() seccion1:string = "";
  @Input() seccion2:string = "";

  activeTab:string = "";

  @Output() datoEnviado = new EventEmitter<string>();

  ngOnInit(){
    this.activeTab = this.seccion1;
  }

  constructor() {
  }

  setActiveTab(activeTab: string){
    this.activeTab = activeTab;
  }
  enviarDatoAlPadre(activeTab: string) {
    this.datoEnviado.emit(activeTab);
  }
}

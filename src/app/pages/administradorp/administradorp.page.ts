import { MisdatosComponent } from './../../components/misdatos/misdatos.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AnimationController } from '@ionic/angular';
import { ForoComponent } from '../../components/foro/foro.component';
import { AdministradorcComponent } from '../../components/administradorc/administradorc.component';
import { Usuario } from '../../model/usuario';
import { AuthService } from '../../services/auth.service';
import { DataBaseService } from '../../services/data-base.service';
import { APIClientService } from '../../services/apiclient.service';


@Component({
  selector: 'app-administradorp',
  templateUrl: './administradorp.page.html',
  styleUrls: ['./administradorp.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ForoComponent, MisdatosComponent, AdministradorcComponent]
})
export class AdministradorpPage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  usuario= new Usuario();
  componente_actual = 'administradorc';

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: APIClientService,
    private animationController: AnimationController
    ) { }

    

  // ngOnInit() {
  //   this.componente_actual = 'qr';
  //   this.bd.datosQR.next('');
  // }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (this.componente_actual === 'foro') this.api.cargarPublicaciones();
    if (this.componente_actual === 'misdatos') this.authService.leerUsuarioAutenticado();
  }


  cerrarSesion() {
    this.authService.logout();
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);

      animation.play();
    }
  }

  async ngOnInit() {
    this.componente_actual = 'administradorc';
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
      }
    })
}
}

import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { RouterLink, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class RegistroPage implements OnInit {

  usuario = new Usuario();
  repeticionPassword = '';

  constructor(private authService: AuthService, private bd: DataBaseService, private router: Router) { }

  async ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
        this.repeticionPassword = usuario!.password;
      }
    })
  }

  mostrarMensaje(nombreCampo: string, valor: string, mensajeError: string) {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    if (nombreCampo === 'correo' && !this.validarFormatoCorreo(valor)) {
      showAlertDUOC(mensajeError);
      return false;
    }
    return true;
  }

  validarFormatoCorreo(correo: string): boolean {
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formatoCorreo.test(correo);
  }

  validarLongitudContrasena(contrasena: string): boolean {
    return contrasena.length >= 4; // Ajusta la longitud mínima según tus requisitos
  }

  Registro() {
    if (!this.mostrarMensaje('nombre', this.usuario.nombre, 'Debe ingresar un nombre válido.')) return;
    if (!this.mostrarMensaje('apellidos', this.usuario.apellido, 'Debe ingresar apellidos válidos.')) return;
    if (!this.mostrarMensaje('correo', this.usuario.correo, 'Debe ingresar un correo electrónico válido.')) return;
    if (!this.mostrarMensaje('pregunta secreta', this.usuario.preguntaSecreta, 'Debe ingresar una pregunta secreta válida.')) return;
    if (!this.mostrarMensaje('respuesta secreta', this.usuario.respuestaSecreta, 'Debe ingresar una respuesta secreta válida.')) return;
    if (!this.mostrarMensaje('contraseña', this.usuario.password, 'Debe ingresar una contraseña válida.')) return;
    if (!this.validarLongitudContrasena(this.usuario.password)) {
      showAlertDUOC('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC('Las contraseñas escritas deben ser iguales.');
      return;
    }
    this.bd.guardarUsuario(this.usuario);
    this.authService.setUsuarioAutenticado(this.usuario);
    showToast('Se ha registrado correctamente.');
    this.router.navigate(['inicio']);
  }

}


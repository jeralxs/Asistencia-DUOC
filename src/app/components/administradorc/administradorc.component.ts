import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showToast } from 'src/app/tools/message-routines';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-administradorc',
  templateUrl: './administradorc.component.html',
  styleUrls: ['./administradorc.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  standalone: true,
})
export class AdministradorcComponent  implements OnInit {

  usuario= new Usuario();
  usuarios:any = [];

  constructor(private bd: DataBaseService, private router: Router, private authService: AuthService, ) { }

  ngOnInit() {
    this.bd.listaUsuarios.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
    this.bd.leerUsuarios();
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
      }
    })
  }

  esAdmin() {
    // Lógica para determinar si el usuario actual es "admin"
    // Retorna true si es "admin", de lo contrario, retorna false
    if (this.usuario.role == 'admin' ) {
      return true
    } else {
      return false
    }
  }
  
  eliminar(correo: string) {
    this.bd.eliminarUsuarioUsandoCorreo(correo);
    showToast('Usuario eliminado correctamente');    
  }

}
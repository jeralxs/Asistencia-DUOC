import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router'; 
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  respuestaSecreta = ""; 
  usuario = new Usuario();
  
  constructor(private authService: AuthService) {
    
   }
 
  async ngOnInit() {
    this.authService.usuarioRecuperar.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
      }
    })
}

public recuperar(): void {  
  this.authService.respuesta(this.respuestaSecreta)
}


}

import { DataBaseService } from 'src/app/services/data-base.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router'; 
import { ToastController } from '@ionic/angular'; 
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {


  correo = ""; 
  constructor(private authService: AuthService) {
   }

  public ngOnInit(): void {

  }

  public siguiente(): void {  
    this.authService.pregunta(this.correo)
    this.authService.recuperar(this.correo)
  }

}
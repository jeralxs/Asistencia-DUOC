import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class CorrectoPage implements OnInit {
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

//   password = "";
//   usuario= new Usuario();

//   constructor(
//     private authService: AuthService,
//     ) { }


//     ngOnInit() {
//     this.authService.usuarioAutenticado.subscribe((usuario) => {
//       if (usuario !== null) {
//         this.usuario = usuario!;
//       }
//     })
// }

//   public usuario: Usuario;

//   constructor(
//     private activeroute: ActivatedRoute 
//   , private router: Router ) { 

//     this.usuario = new Usuario()

//     this.activeroute.queryParams.subscribe(params => { 

//       const nav = this.router.getCurrentNavigation();
//       if (nav) {
//         if (nav.extras.state) {
//           this.usuario = nav.extras.state['usuario'];
//           return;
//         }
//       }
//       this.router.navigate(['/pregunta']);

//     });
// }

  // ngOnInit() {
  // }

}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { showToast } from '../tools/message-routines';

export interface Publicacion {
  id: string,
  correo: string;
  nombre: string;
  apellido: string;
  titulo: string;
  contenido: string;
};

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    })
  };

  listaPublicaciones: BehaviorSubject<Publicacion[]> = new BehaviorSubject<Publicacion[]>([]);
  // apiUrl = 'https://jsonplaceholder.typicode.com';
  apiUrl = 'http://localhost:3000'; 
  
  
  constructor(private http: HttpClient) { }

  async cargarPublicaciones() {
    this.leerPublicaciones().subscribe({
      next: (posts) => {
        this.listaPublicaciones.next(posts as Publicacion[]);
      },
      error: (error: any) => {
        showToast('El servicio API Rest de Publicaciones no está disponible');
        this.listaPublicaciones.next([]);
      }
    });
  }

  getUsuario(userId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/profile/' + userId).pipe(
      retry(3)
    );
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl + '/profile/').pipe(
      retry(3)
    );
  }

  crearPublicacion(publicacion: any): Observable<any> {
    return this.http.post(this.apiUrl + '/posts/', publicacion, this.httpOptions).pipe(
      retry(3)
    );
  }

  leerPublicaciones(): Observable<any> {
    return this.http.get(this.apiUrl + '/posts/').pipe(
      retry(3)
    );
  }

  leerPublicacion(idPublicacion: number): Observable<any> {
    return this.http.get(this.apiUrl + '/posts/' + idPublicacion).pipe(
      retry(3)
    );
  }

  actualizarPublicacion(publicacion: any): Observable<any> {
    return this.http.put(this.apiUrl + '/posts/' + publicacion.id, publicacion, this.httpOptions)
      .pipe(retry(3)
    );
  }

  eliminarPublicacion(publicacionId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/posts/' + publicacionId, this.httpOptions).pipe(
      retry(3)
    );
  }

}

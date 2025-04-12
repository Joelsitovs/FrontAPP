import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UsuarioResponse,
  UploadImageResponse,
} from 'src/app/interface/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private url = 'https://backend-750705921113.europe-southwest1.run.app';
  // private url = 'http://localhost:8080';
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  registerSubAdmin(user: any) {
    return this.http.post(`${this.url}/admin/create-user`, user);
  }

  register(user: any) {
    return this.http.post(`${this.url}/subadmin/create-user`, user);
  }

  listUsers() {
    return this.http.get<{ usuarios: any[] }>(`${this.url}/list-users-by-uid`);
  }

  getUserById(dni: string): Observable<UsuarioResponse> {
    console.log('DNI que se envía:', dni);
    return this.http.get<UsuarioResponse>(`${this.url}/get-user-data`, {
      headers: {
        dni: dni,
      },
    });
  }
  editUser(dni: string, data: any) {
    return this.http.put(`${this.url}/edit-user`, data, {
      headers: {
        dni: dni,
      },
    });
  }

  uploadImagenPerfil(dni: string, file: File): Observable<UploadImageResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadImageResponse>(
      `${this.url}/subir-foto-perfil`,
      formData,
      {
        headers: {
          dni: dni,
        },
      }
    );
  }

  deleteUser(dni: string) {
    return this.http.delete(`${this.url}/delete-user`, {
      headers: {
        dni: dni,
      },
    });
  }
}

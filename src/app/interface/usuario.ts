export interface Usuario {
    nombre: string;
    dni: string;
    email: string;
    fecha_nacimiento: string;
    foto_perfil?: string | null;
  }
  
  export interface UsuarioResponse {
    message: string;
    data: Usuario;
  }
  
  export interface UploadImageResponse {
    message: string;
    url: string;
  }
  
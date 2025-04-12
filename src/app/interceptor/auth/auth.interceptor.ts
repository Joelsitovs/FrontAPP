import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const url = environment.apiUrl;
  // const url = 'http://localhost:8080';
  // const url = 'https://backend-750705921113.europe-southwest1.run.app';

  if (token && req.url.startsWith(url)) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};

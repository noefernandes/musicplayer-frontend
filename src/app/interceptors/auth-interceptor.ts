import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth-service.service";
import { inject } from "@angular/core";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);

  if(req.headers.has('skipAuth')) {
    const headers = req.headers.delete('skipAuth');
    const authReq = req.clone({ headers });
    return next(authReq);
  }

  const authReq = req.clone({ withCredentials: true });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401 && !req.url.includes('/refresh-token')) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const retryReq = req.clone({ withCredentials: true });
            return next(retryReq);
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
}
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if(req.headers.has('skipAuth')) {
    const headers = req.headers.delete('skipAuth');
    const authReq = req.clone({ headers });
    return next(authReq);
  }

  const authReq = req.clone({ withCredentials: true });
  return next(authReq);
}
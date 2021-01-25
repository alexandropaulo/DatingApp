import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /** throw new Error('Method not implemented.');  */
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return throwError(error.statusText);
                }
                if (error instanceof HttpErrorResponse) {
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(applicationError);
                    }
                    const serverError = error.error; /** error.error tem esse nome por causa da variável do 
                                                     catch error e da chave(nó) error da mensagem de erro. */
                    let modalStateErrors = ''; /** guarda o conteudo da mensagem de erro propriamente dita */
                    /** Varrendo as chaves do objeto error.error e procruando por valores dessas chaves */
                    if (serverError.errors && typeof serverError.errors === 'object') {
                        for (const key in serverError.errors) {
                            if (serverError.errors[key]) {
                                modalStateErrors += serverError.errors[key] + '\n' 
                            }

                        }
                    }   
                    return throwError(modalStateErrors || serverError || 'Server Error');
                }
            })
        );
    }

}

/** Definindo um novo provedor e suas respectivas chaves, tipo de provedor, 
 * classe usada, e se terão multiplos objetos */
export const ErrorInteceptorProvider = {
    provide: HTTP_INTERCEPTORS, 
    useClass: ErrorInterceptor,
    multi: true
}


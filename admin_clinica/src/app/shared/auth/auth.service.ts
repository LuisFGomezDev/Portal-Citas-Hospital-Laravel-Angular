import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router, 
    public http: HttpClient,
    )
    {}

  login(email: string, password: string)
  {
    // localStorage.setItem('authenticated', 'true');
    // this.router.navigate([routes.adminDashboard]);
    const URL = URL_SERVICIOS+"/auth/login";
    return this.http.post(URL,{email: email, password: password}).pipe(
      map((auth) => {
        console.log(auth);
        const result = this.saveLocalStorage(auth);
        return result;
      }),
      catchError((error) => {
        console.log(error);
        return of(undefined);

      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveLocalStorage(auth:any)
  {
    if(auth && auth.access_token)
    {
      localStorage.setItem("token", auth.access_token);
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  }


  //Funcion Logout
  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    this.router.navigate([routes.login]);
  }

}

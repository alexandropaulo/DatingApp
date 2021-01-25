import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {   
  }

  login() {
    /**console.log(this.model); comando de log retirado*/
    this.authService.login(this.model).subscribe(next => 
      { console.log("Logged in sucessfully");},
      error => {console.log(error);}) /** mensagem substituida "Failed to login" */

  }

  loggedIn() {
    const token = localStorage.getItem('token'); /**Pega o token armazenado */
    return !!token; /**Retorna true ou false de acordo com o valor do campo */
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }

}

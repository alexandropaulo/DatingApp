import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService,
    private route: Router) { }

  ngOnInit() {   
  }

  login() {
    /**console.log(this.model); comando de log retirado*/
    this.authService.login(this.model).subscribe(next => 
      { this.alertify.success("Logged in sucessfully");},
      error => {this.alertify.error(error);},
       () => {this.route.navigate(['/members'])}); /** mensagem substituida "Failed to login" */

  }

  loggedIn() {
    /** código retirado depois de criarmos o método no serviço auth
     * const token = localStorage.getItem('token'); Pega o token armazenado 
     * return !!token; Retorna true ou false de acordo com o valor do campo */
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.route.navigate(['/home'])
  }

}

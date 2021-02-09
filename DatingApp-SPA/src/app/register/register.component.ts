import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService : AuthService, private alertify : AlertifyService) { }

  ngOnInit() {
  }

  register() {
    /**console.log(this.model);*/
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration sucessful');
    },  error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false)
    this.alertify.message('Cancelled!')
  }

}

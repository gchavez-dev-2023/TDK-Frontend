import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formSubmmited = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    remember: [true],
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) {

  }

  login() {
    this.formSubmmited = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    //realizar login
    this.usuarioService.signin(this.loginForm.value)
      .subscribe(resp => {
        console.log('usuario logeado');
        console.log(resp);
        if (this.loginForm.get('remember')?.value) {
          //ver porque el valor queda como nulo
          const email = this.loginForm.get('email')?.value || '';
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });

    //this.router.navigateByUrl('/');
  }
}

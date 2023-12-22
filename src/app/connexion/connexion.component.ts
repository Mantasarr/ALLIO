import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { ConnexionServiceService } from './connexion-service.service';


interface connexion1 {
  image: string;
}

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  loginForm: FormGroup;
  //urlRegex!: RegExp;

  constructor(private fb:FormBuilder, private login:ConnexionServiceService, private _router: Router)  { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  connexion1: connexion1 [] = [
    {
      image: "assets/Sales.png"
    }
  ]

  onLogin() {
    if(this.loginForm.value) {
      console.log('Identifiants : ',this.loginForm.value);
      this.login.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert('Connexion reussie'),
          this._router.navigate(['/home']);
        },
        error:(err)=>{
          alert('Echec de la connexion')
        }
      })
    }

  }



}

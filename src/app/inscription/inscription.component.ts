import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InscriptionServiceService } from './inscription-service.service';

interface connexion2 {
  image: string;
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb:FormBuilder, private part:InscriptionServiceService, private _router: Router)  { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      groupe: ['', Validators.required],
      sousGroupe: ['', Validators.required],
      ninea: ['', Validators.required],
      password: ['', Validators.required],
      contactRef: ['', Validators.required]
    })
  }

  connexion2: connexion2 [] = [
    {
      image: "assets/Product.png"
    }
  ]

  onInscription() {
    if(this.loginForm.value) {
      console.log('Identifiants : ',this.loginForm.value);
      this.part.partenaire(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          console.log('L/api est', this.part.partenaire);
          alert('Inscription reussie'),
          this._router.navigate(['/home']);
        },
        error:(err)=>{
          alert('Erreur Inscription')
        }
      })
    }

  }

}

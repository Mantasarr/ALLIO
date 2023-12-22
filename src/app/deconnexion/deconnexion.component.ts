import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeconnexionServiceService } from './deconnexion-service.service';


@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrl: './deconnexion.component.scss'
})
export class DeconnexionComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb:FormBuilder, private logout:DeconnexionServiceService, private _router: Router)  { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  onDeconnect() {
    if(this.loginForm.value) {
      console.log('Déconnexion : ',this.loginForm.value);
      this.logout.logout(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert('Déconnexion reussie'),
          this._router.navigate(['/connexion']);
        },
        error:(err)=>{
          alert(err.error.message)
        }
      })
    }

  }



}

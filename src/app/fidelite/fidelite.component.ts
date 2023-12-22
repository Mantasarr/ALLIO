import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FideliteServiceService } from './fidelite-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-fidelite',
  templateUrl: './fidelite.component.html',
  styleUrl: './fidelite.component.scss'
})

export class FideliteComponent implements OnInit{

  public mespaliers: any;
  showDetails: boolean = false;
  loginform: FormGroup;

  constructor(private _router: Router, private fb:FormBuilder, private fid:FideliteServiceService, private modalService: NgbModal)  {}

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  ngOnInit():void {
    this.voirPalier();
    this.loginform=this.fb.group({
      montant: ['', Validators.required],
      equiPoints: ['', Validators.required]
    })
  }

  ajoutPalier(content: any) {
    this.modalService.open(content, {size: 'lg' });
  }

  voirPalier() {
    console.log('Clique sur le bouton Voir les paliers générés');
      this.fid.getPaliers().subscribe({
        next:(paliers)=>{
          this.mespaliers=paliers;
            console.log('Liste des paliers générés :', this.mespaliers.data);
        },
        error:(err)=>{
          alert(err.error.message)
        }
      })
  }

  SuppPalier(palierId: number) {
    if (confirm('Are you sure you want to delete this palier?')) {
      this.fid.supPaliers(palierId)
        .subscribe({
          next: (res) => {
            alert('Bon deleted successfully');
            this.mespaliers = this.mespaliers.filter((palier: { id: number; }) => palier.id !== palierId);
          },
          error: (err) => {
            alert(err.error.message);
          }
        });
    }
  }

  UpdatePalier(palierId: number) {
    const updatedPalier = {
      sexeCible: this.loginform.get('montant')?.value,
      image: this.loginform.get('equiPoints')?.value
    };
    /*this.prospec.updateArticles(palierId, updatedPalier).subscribe({
      next: (res) => {
        alert('Bon updated successfully');
        //this.mesbons = this.mesbons.filter((bon: { id: number; }) => bon.id !== bonId);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });*/
  }

  AjoutPalier() {
    const payload = Object.assign({}, this.loginform.value);
    const formData = new FormData();
    console.log('Paliers:', payload);
    formData.append('montant', payload?.montant)
    formData.append('equiPoints', payload?.equiPoints)
    if(this.loginform.value) {
      console.log('Identifiants  : ',this.loginform.value);
        this.fid.creerPalier(formData)
        .subscribe({
          next:(res)=>{
            console.log('On a:',res)
            alert('Connexion reussie'),
            this._router.navigate(['/fidelite']);
            this.modalService.dismissAll();
          },
          error:(err)=>{
            console.error(err);
            alert(err.err)
          }
        })
      }
  }

}

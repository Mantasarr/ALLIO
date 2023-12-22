import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { CampagneServiceService } from './campagne-service.service';

@Component({
  selector: 'app-nouvelle-campagne',
  templateUrl: './nouvelle-campagne.component.html',
  styleUrl: './nouvelle-campagne.component.scss'
})
export class NouvelleCampagneComponent implements OnInit{

  public mespromo:any;
  form: FormGroup;
  urlRegex: RegExp;
  showDetails: boolean = false;
  selectedItems: any;
  selectedImg : any;

  constructor(public dialog:MatDialog,private fb:FormBuilder, private prom:CampagneServiceService, private _router: Router, private modalService: NgbModal)  {}


  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

   creerpromotion(content:any){
    this.modalService.open(content, { size: 'lg' });
   }

   voirpromotiongenere(){
    console.log('Clique sur le bouton Voir les promo générés');
    this.prom.voirpromotion().subscribe({
      next:(promo)=>{
        this.mespromo=promo;
          console.log('Liste des promo générés :', this.mespromo.data);
      },
        error:(err)=>{
          alert(err.error.message)
        }
      })
    }


   supprimerpromo(promoId: number) {
    if (confirm('Are you sure you want to delete this promo?')) {
      this.prom.suppPromotion(promoId)
        .subscribe({
          next: (res) => {
            alert('Promo deleted successfully');
            this.mespromo = this.mespromo.filter((promo: { id: number; }) => promo.id !== promoId);
          },
          error: (err) => {
            alert(err.error.message);
          }
        });
    }
  }

  updatepromo(promoId: number){}

   ngOnInit(): void {
    this.voirpromotiongenere();
    this.form = this.fb.group({
       dateDebut: ['', Validators.required],
       dateFin: ['', Validators.required],
       nomCampagne: ['', Validators.required],
       description: ['', Validators.required],
       localisation: ['', Validators.required],
       ageCible: ['',Validators.required],
       sexeCilbe: ['', Validators.required],
       codePromo: ['', Validators.required],
       image: ['', Validators.required]
    })
  }

  uploadFile(files: FileList | null) {
    if (files != null){
      const file = files[0];
      this.selectedImg = file;
      console.log('image', this.selectedImg)
    }else console.log('null ')
   }

  promo(){
    const payload = Object.assign({}, this.form.value);
    const formData = new FormData();
    formData.append('dateDebut', payload?.dateDebut)
    formData.append('dateFin', payload?.dateFin)
    formData.append('nomCampagne', payload?.nomCampagne)
    formData.append('description', payload?.description)
    formData.append('ageCible', payload?.ageCible)
    formData.append('sexeCilbe', payload?.sexeCilbe)
    formData.append('codePromo', payload?.codePromo)
    formData.append('localisation', payload?.localisation)
    formData.append('image', this.selectedImg)
    if(this.form.value) {
      console.log('Identifiants  : ',this.form.value);
      this.prom.creerPromotion(formData)
      .subscribe({
        next:(res)=>{
          alert('Connexion reussie'),
          this._router.navigate(['/nouvelle-campagne']);
          this.modalService.dismissAll();
        },
        error:(err)=>{
          alert(err.error.message)
        }
      })
    }
  }

}

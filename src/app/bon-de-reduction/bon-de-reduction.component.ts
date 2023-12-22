import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { BonServiceService } from './bon-service.service';



@Component({
  selector: 'app-bon-de-reduction',
  templateUrl: './bon-de-reduction.component.html',
  styleUrl: './bon-de-reduction.component.scss'
})


export class BonDeReductionComponent implements OnInit{

  form: FormGroup;
  urlRegex: RegExp;
  public mesbons: any;
  selectedItems: any;
  selectedImg : any;
  showDetails: boolean = false;

  constructor(public dialog: MatDialog,private fb:FormBuilder, private bon:BonServiceService, private _router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.voirBons();
    this.form = this.fb.group({
       dateDebut: ['', Validators.required],
       dateFin: ['', Validators.required],
       typeDeReduction: ['', Validators.required],
       codeDeReduction: ['', Validators.required],
       montantDeReduction: ['', Validators.required],
       ageCible: ['',Validators.required],
       sexeCible: ['', Validators.required],
       quantityBon: ['', Validators.required],
       localisation: ['', Validators.required],
       image: ['' , Validators.required]
    })
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  uploadFile(files: FileList | null) {
    if (files != null){
      const file = files[0];
      this.selectedImg = file;
      console.log('image', this.selectedImg)
    }
    else console.log('null ')
  }

  SuppBon(bonId: number) {
    if (confirm('Are you sure you want to delete this bon?')) {
      this.bon.suppbondereduc(bonId)
        .subscribe({
          next: (res) => {
            alert('Bon deleted successfully');
            this.mesbons = this.mesbons.filter((bon: { id: number; }) => bon.id !== bonId);
          },
          error: (err) => {
            alert(err.error.message);
          }
        });
    }
  }

  UpdateBon(bonId: number) {
    const updatedBon = {
      dateDebut: this.form.get('dateDebut')?.value,
      dateFin: this.form.get('dateFin')?.value,
      typeDeReduction: this.form.get('typeDeReduction')?.value,
      codeDeReduction: this.form.get('codeDeReduction')?.value,
      montantDeReduction: this.form.get('montantDeReduction')?.value,
      quantityBon: this.form.get('quantityBon')?.value,
      ageCible: this.form.get('ageCible')?.value,
      sexeCible: this.form.get('sexeCible')?.value,
      localisation: this.form.get('localisation')?.value,
      image: this.form.get('image')?.value
    };
    this.bon.updateBon(bonId, updatedBon).subscribe({
      next: (res) => {
        alert('Bon updated successfully');
        this.mesbons = this.mesbons.filter((bon: { id: number; }) => bon.id !== bonId);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  voirBons(){
    console.log('Clique sur le bouton Voir les bons générés');
      this.bon.getbondereduc().subscribe({
        next:(bons)=>{
          this.mesbons=bons;
            console.log('Liste des bons générés :', this.mesbons.data);
        },
        error:(err)=>{
          alert(err.error.message)
        }
      })
  }

  creerbon(content: any) {
    this.modalService.open(content, { size: 'lg' }) ;
  }

  bonDeReduc() {
    const payload = Object.assign({}, this.form.value);
    const formData = new FormData();
    formData.append('dateDebut', payload?.dateDebut)
    formData.append('dateFin', payload?.dateFin)
    formData.append('typeDeReduction', payload?.typeDeReduction)
    formData.append('codeDeReduction', payload?.codeDeReduction)
    formData.append('montantDeReduction', payload?.montantDeReduction)
    formData.append('ageCible', payload?.ageCible)
    formData.append('sexeCible', payload?.sexeCible)
    formData.append('quantityBon', payload?.quantityBon)
    formData.append('localisation', payload?.localisation)
    formData.append('image', this.selectedImg)
    if(this.form.value) {
      console.log('Identifiants  : ',this.form.value);
      this.bon.creerbondereduc(formData)
      .subscribe({
        next:(res)=>{
          console.log('On a:',res)
          alert('Bon créé avec succès')
          this._router.navigate(['/bon-de-reduction']);
          // Ferme la fenêtre modale
          this.modalService.dismissAll();
        },
        error:(err)=>{
          console.error(err);
          alert(err.error.message)
        }
      })
    }
  }

}



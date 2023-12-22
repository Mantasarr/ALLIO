import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProspectusServiceService } from './prospectus-service.service';

@Component({
  selector: 'app-prospectus',
  templateUrl: './prospectus.component.html',
  styleUrl: './prospectus.component.scss'
})

export class ProspectusComponent implements OnInit {

  form: FormGroup;
  urlRegex: RegExp;
  public mesarticles: any;
  showDetails: boolean = false;
  icIcon: string = 'your-icon-name';
  icAdd: string = 'your-icon-name';
  isLoading1: boolean = false;
  isValidDateFin: boolean = false;
  selectedImg: any;
  isLoading: boolean = false;
  selectedItems: any;
  twoLatestArticles: any[] = [];



  constructor(private fb:FormBuilder, private prospec:ProspectusServiceService, private _router: Router, private modalService: NgbModal, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer)  {}

   toggleDetails() {
    this.showDetails = !this.showDetails;
  }

   uploadFile(files: FileList | null) {
    if (files != null){
      const file = files[0];
      this.selectedImg = file;
      console.log('image', this.selectedImg)
    }else console.log('null ')
   }

  ngOnInit(): void {
    this.voirArticle();
    this.form = this.fb.group({
      ageCible: ['',Validators.required],
      sexeCilbe: ['', Validators.required],
      image: ['',Validators.required],
    })
    /*this.prospec.getTwoLatestArticles().subscribe(articles => {
      this.twoLatestArticles = articles;
    });*/
  }

  ajoutArticle(content: any) {
    this.modalService.open(content, {size: 'lg' });
  }

  voirArticle() {
    console.log('Clique sur le bouton Voir les articles générés');
      this.prospec.getArticle().subscribe({
        next:(articles)=>{
          this.mesarticles=articles;
            console.log('Liste des articles générés :', this.mesarticles.data);
        },
        error:(err)=>{
          alert(err.error.message)
        }
      })
  }

  SuppArticle(articleId: number) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.prospec.suppArticles(articleId)
        .subscribe({
          next: (res) => {
            alert('Bon deleted successfully');
            this.mesarticles = this.mesarticles.filter((article: { id: number; }) => article.id !== articleId);
          },
          error: (err) => {
            alert(err.error.message);
          }
        });
    }
  }

  UpdateArticle(articleId: number) {
    const updatedArticle = {
      ageCible: this.form.get('ageCible')?.value,
      sexeCible: this.form.get('sexeCilbe')?.value,
      image: this.form.get('image')?.value
    };
    this.prospec.updateArticles(articleId, updatedArticle).subscribe({
      next: (res) => {
        alert('Bon updated successfully');
        //this.mesbons = this.mesbons.filter((bon: { id: number; }) => bon.id !== bonId);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  AjoutArticle() {
    const payload = Object.assign({}, this.form.value);
    const formData = new FormData();
    console.log('Identifiants:', payload);
    formData.append('ageCible', payload?.ageCible)
    formData.append('sexeCilbe', payload?.sexeCilbe)
    formData.append('image', this.selectedImg)
    if(this.form.value) {
      console.log('Identifiants  : ',this.form.value);
        this.prospec.article(formData)
        .subscribe({
          next:(res)=>{
            console.log('On a:',res)
            alert('Connexion reussie'),
            this._router.navigate(['/articles']);
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

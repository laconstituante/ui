import {Component, OnInit} from '@angular/core';
import { RestService } from '../services/rest.service';
import { Titre } from '../dto/titre';
import { Constitution } from '../dto/constitution';
import {MdDialog} from '@angular/material';
import {LoginFormComponent} from '../forms/login.component';
import {InsufficiantPrivilegesComponent} from '../forms/insufficiant.privileges.component';
import {NewArticleHandler} from '../services/new.article.handler';
import { Router } from "@angular/router";
@Component({
  selector: 'titres-main-component',
  templateUrl: './titres.main.component.html'
})
export class TitresMainComponent implements  OnInit{    
    titres:Titre[];
    display:string = 'loading';
    constitutions:Constitution[];
    applicableConstitutionId:string;
    constitution_name:string = 'Liste des titres de cette constitution';
    url:string;
    ngOnInit(){
        if(this.router && this.router.url !== '/'){
            this.url = this.router.url.replace('/titres/','');
            this.constitution_name = this.url.replace(/-/g,' ');     
        }
        this.getConstitution();
    }
    constructor(private rest: RestService,
                private router: Router){

    }
    getConstitution(){
        if(this.url){
            console.log(this.url);
            this.rest.getTitresFromConstitution(this.url, true).subscribe(
                titres =>{
                    this.setTitres(titres);
                },
                error =>{}
            );
        }else{
            this.rest.getConstitutions().subscribe(
                constitutions => {                
                    this.constitutions = constitutions;
                    constitutions.forEach(cons=>{
                    if(cons.is_appliquable){
                            this.applicableConstitutionId = cons.constitution_id;
                            this.getTitres(cons.constitution_id);
                        }
                    });
                },
                error =>{
                    console.log(error);
                }
            );
        } 
    }
    setTitres(titres){
        if(titres && titres.length){
            titres.forEach(titre=>{
                if(!titre.vote_count){
                    titre.vote_count = 0;
                }
                if (titre.articles){
                    if(titre.articles.length > 1){
                        titre.toolTip = 'Contient les articles ' + titre.articles[0].article_number + ' à ' + titre.articles[titre.articles.length -1].article_number ;
                    }else if(titre.articles.length === 1){
                        titre.toolTip = 'Contient ' + titre.articles[0].article_name;
                    }
                }else{
                    
                }
            });
        }
        this.titres = titres;
    }
    getTitres(constitutionId:string){
        this.rest.getTitresFromConstitution(constitutionId,false).subscribe(
            titres => {
                this.setTitres(titres)                
            },
            error =>{
                console.log(error);
            }
        );
    }
  
}
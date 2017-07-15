import {Component, OnInit,Input} from '@angular/core';
import { RestService } from '../services/rest.service';
import { Titre } from '../dto/titre';
import { Constitution } from '../dto/constitution';
import {MdDialog} from '@angular/material';
import {LoginFormComponent} from '../forms/login.component';
import {InsufficiantPrivilegesComponent} from '../forms/insufficiant.privileges.component';
import {NewArticleHandler} from '../services/new.article.handler';
import { Router } from "@angular/router";
@Component({
  selector: 'titres-component',
  templateUrl: './titres.component.html'
})
export class TitresComponent implements  OnInit{    
    @Input() titres:Titre[];
    @Input() maindisplaying:boolean;
    @Input() constitution_url:string;
    constitutions:Constitution[];
    applicableConstitutionId:string;
    url:string;
    ngOnInit(){
        if(!this.titres || this.titres.length === 0){
            if(this.router && this.router.url !== '/'){
                this.url = this.router.url.replace('/titres/','');            
            }
            this.getConstitution();
        } 
    }
    constructor(private rest: RestService,
                private dialog: MdDialog,
                private addArticleHandler:NewArticleHandler,
                private router: Router){

    }
    getTitreDisplayName(titre:Titre){
        let item:any;
        if(titre.titre_name.indexOf(':') === -1){
            item = [titre.titre_name,''];    
        }else{
            item = titre.titre_name.substring(0,titre.titre_name.indexOf('(')).split(' : ');
        }
        return item[0] + ' : ' + item[1];
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
        }
        this.rest.getConstitutions().subscribe(
            constitutions => {                
                this.constitutions = constitutions;
                constitutions.forEach(cons=>{
                if(cons.is_appliquable){
                        this.applicableConstitutionId = cons.constitution_id;
                        this.constitution_url = cons.constitution_url;
                        this.getTitres(cons.constitution_id);
                    }
                });
            },
            error =>{
                console.log(error);
            }
        );
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
    displayRelatedAlineas(titre_id){
        console.log(titre_id);
    }
    changeConstitution(event){
        console.log(event);
        this.getTitres(event.value);
    }
    addArticle(){
        if(this.rest.isLoggedIn()){
            this.rest.get6RepublicEligibility().subscribe(
                success =>{
                    if(success && success.entity){
                        let eligibility = success.entity;
                        this.rest.setEligibility(success.entity);
                        this.addArticleHandler.broadCastNewArticleClicked();                     
                    }
                },
                error => {

                }
            );
        }else{
            this.dialog.open(LoginFormComponent,{disableClose:true});
        }
    }
}
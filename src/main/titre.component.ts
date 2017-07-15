import {Component,Input, OnInit} from '@angular/core';
import { RestService } from '../services/rest.service';
import { ArticleSubject } from '../services/article.subject';
import { Titre } from '../dto/titre';
import { Ensemble } from '../dto/ensemble';
import { Article } from '../dto/article';
import { Alinea } from '../dto/alinea'

@Component({
  selector: 'titre-component',
  templateUrl: './titre.component.html'
})
export class TitreComponent implements OnInit {    
    @Input() titre:Titre;
    @Input() maindisplaying:boolean;
    @Input() constitution_url:string;
    item:any;    
    closeClass:string = 'lines-button arrow arrow-up';
    hideArticles:boolean = true;
    showArticles:boolean = false;
    constructor(private rest: RestService,private articleSelected:ArticleSubject){

    }
    ngOnInit(){
        if(this.titre.titre_name.indexOf(':') === -1){
            this.item = [this.titre.titre_name,''];    
        }else{
            this.item = this.titre.titre_name.substring(0,this.titre.titre_name.indexOf('(')).split(' : ');
        }
        
    }
    displayRelatedArticles(){
        if(this.closeClass === 'lines-button arrow arrow-up'){
            this.closeClass = 'lines-button arrow arrow-up close';
            this.hideArticles = false;
            this.showArticles = true;
        }else{
            this.closeClass = 'lines-button arrow arrow-up';
            this.hideArticles = true;
        }

    }
    onArticleSelected(event){        
        this.getAlineasFromArticleId(event)
    }
    getAlineasFromArticleId(event){
        this.rest.getAlineas(event.article_id).subscribe(
            alineas => {
                if(alineas && alineas.entity){
                    let singleTitreList:Titre[] = new Array<Titre>();
                    let partialTitre = new Titre();
                    partialTitre.titre_id = this.titre.titre_id;
                    partialTitre.titre_name = this.titre.titre_name;
                    partialTitre.titre_number = this.titre.titre_number;
                    partialTitre.titre_status = this.titre.titre_status;
                    partialTitre.articles = [];
                    let article = event;
                    article.alineas = alineas.entity;
                    partialTitre.articles.push(article);
                    singleTitreList.push(partialTitre);
                    this.articleSelected.broadCastArticleSelected(singleTitreList);
                }
                
                
            },
            error =>{
                console.log(error);
            }
        );
    }
}
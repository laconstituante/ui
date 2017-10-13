import {Component,Input,OnInit} from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router,ActivatedRoute } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';
import { Alinea } from "../dto/alinea";
// import { CeiboShare } from 'ng2-social-share';
@Component({
  selector: 'alineas-component',
  templateUrl: './alineas.component.html',
})
export class AlineasComponent{
    alineas: Alinea[];
    subscription;
    article_url:string;
    constitution_url:string;
    article_name:string;
    constitutionId;
    constitutionName:string;
    repoUrl:string;
    shortUrl:string;
    imageUrl:string;
    ngOnInit(){
        this.route.params.subscribe(
            parameters =>{
                this.constitutionName = parameters.constitution;
                this.repoUrl = `https://www.laconstituante.fr/alineas/${parameters.article}/${parameters.constitution}`;
                this.imageUrl = 'https://www.laconstituante.fr/img/laconstituante_square.png';
                this.article_url = parameters.article;
                this.constitution_url = parameters.constitution;
                this.article_name = this.article_url.replace('-',' ');
                this.getAlineas();
            }
        );
        
    }
    constructor(private rest:RestService,
                private router: Router,
                private route: ActivatedRoute,
                private _meta: Meta,
                private titleService:Title){}
    getAlineas(){
        this.rest.getAlineasByArticleUrl(this.article_url,this.constitution_url).subscribe(
            alineas =>{
                this.alineas = alineas.entity;
                this.shortUrl = alineas.metadata;
                if(!this.shortUrl){
                    this.getShortUrl();
                }
                let article = this.article_url.replace(/-/g,' ');
                let alineasTitles = '';
                this.alineas.forEach(element =>{
                    alineasTitles += `Alinea ${element.alinea_number}, `;
                });
                this._meta.updateTag({ name: 'alineas', content: alineasTitles });
                this._meta.updateTag({ name: 'constitution', content: this.constitutionName });
                this._meta.updateTag({ name: 'country', content: 'France' });
                this._meta.updateTag({ name: 'language', content: 'fr-FR' });
                this.titleService.setTitle(article);
            },
            error=>{

            }
        );
    }
    getShortUrl(){
        this.rest.getShortUrlForArticle(this.article_url,this.constitution_url).subscribe(
            result =>{
                this.shortUrl = result.entity;                
            },
            error=>{
                console.log('Could not get the short url');
            }
        );
    }
}
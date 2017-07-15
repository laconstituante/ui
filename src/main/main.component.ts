import {Component, ViewEncapsulation,OnInit} from '@angular/core';
import {Titre} from '../dto/titre';
import {Article} from '../dto/article';
import {Alinea} from '../dto/alinea';
import { ArticleSubject } from '../services/article.subject';
import {PageManagerService} from '../services/page.manager.service';
import {RestService} from '../services/rest.service';
import {MdDialog} from '@angular/material';
import {NewArticleHandler} from '../services/new.article.handler';
import {InsufficiantPrivilegesComponent} from '../forms/insufficiant.privileges.component';
import { Router } from "@angular/router";
// import {MenuItem} from 'primeng/components/common/api';
@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',  
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {  
  settingPage: string;
  closeClass: string = 'lines-button arrow arrow-left';
  classline:string = 'lines';
  display:string = 'homepage';
  titres:Titre[] = null;
  settings;
  // private items: MenuItem[];
  constructor(private notifier:PageManagerService,
    private rest:RestService,private newArticleHandler:NewArticleHandler,private dialog: MdDialog,private _router:Router){
    
  }
  //
  ngOnInit(){
    if(this.notifier){
      this.notifier.getPageManagerService().subscribe( (event) => {
          if(this.rest && this.rest.isLoggedIn()){
            this._router.navigateByUrl('tableau-de-bord');
          }
        } 
      );
    }
    if(this.newArticleHandler){
      this.newArticleHandler.getArticleSubject().subscribe(event => {
            if(this.rest.getEligibility().totalAlinea > this.rest.getEligibility().totalvotes){
                let dialogRef = this.dialog.open(InsufficiantPrivilegesComponent,
                    {
                        disableClose:true,
                        height: '600px',
                        width: '600px'
                    });
                dialogRef.afterClosed().subscribe(result => {
                    this._router.navigateByUrl('poursuivre-mes-votes');
                });
            }else{
                
            }
      });
    }
    this.rest.getlogInOutSubject().subscribe(event =>{
      if(event){
        this.addLoggedInSettings();
      }else{
        this.addLoggetOutSettings();
      }
    });
    if(this.rest && this.rest.isLoggedIn()){
      this.addLoggedInSettings();
    }else{
      this.addLoggetOutSettings();
    }
  }
  sideNavOpened(obj:any){
    console.log('sideNavOpened');
    this.closeClass = 'lines-button arrow arrow-left close';
    
  }
  sideNavClosed(obj:any){
    console.log('sideNavClosed');
    this.closeClass = 'lines-button arrow arrow-left';
  }
  toggleButton(){
    if(this.closeClass === 'lines-button arrow arrow-left'){
      this.classline = '';
      this.closeClass = 'lines-button arrow arrow-left close'
    }else{
      this.closeClass = 'lines-button arrow arrow-left';
      this.classline = '';
    }
  }
  goToHomePage(){
    if(this.rest.isLoggedIn()){
      this._router.navigateByUrl('tableau-de-bord');
    }else{
      this._router.navigateByUrl('accueil');
    }
  }
  settingActionClick(action){
    switch(action){
      case 'HOW':
        this.settingPage = 'help-component';
      break;
      case 'VOTES':
        this.settingPage = 'user-votes';
      break;
      case 'PROP':
        this.settingPage = 'user-propositions';
      break;
      case 'CONTACT':
        this.settingPage = 'contact-component';
      break;
      case 'SUPPORT':
        this.settingPage = 'support-component';
      break;
      case 'LOGOUT':
        this.rest.logOut();
        this._router.navigateByUrl('accueil');
      break;      
      case 'LOGIN':
        this.settingPage = 'login-component';
      break;
      case 'SIGNUP':
        this.settingPage = 'create-profile';
      break;      
    }
  }
  addLoggetOutSettings(){
    this.settings = [];
    this.settings.push({icon:'perm_identity',label:'Se connecter',action:'sidentifier'});
    this.settings.push({icon:'person_add',label:'Créer un profil',action:'creer-un-compte'});
    this.settings.push({icon:'help_outline',label:'Comment ça marche?',action:'comment-ca-marche'});
    this.settings.push({icon:'mail_outline',label:'Nous contacter',action:'contactez-nous'});
    this.settings.push({icon:'thumb_up',label:'Nous soutenir',action:'participez-avec-nous'});
  }
  addLoggedInSettings(){
    this.settings = [];
    this.settings.push({icon:'help_outline',label:'Comment ça marche?',action:'comment-ca-marche'});
    // this.settings.push({icon:'assignment_turned_in',label:'Mes vots',action:'VOTES'});
    // this.settings.push({icon:'toc',label:'Mes propositions',action:'PROP'});
    this.settings.push({icon:'mail_outline',label:'Nous contacter',action:'contactez-nous'});
    this.settings.push({icon:'thumb_up',label:'Nous soutenir',action:'participez-avec-nous'});
    this.settings.push({icon:'clear',label:'Déconnexion',action:'deconnexion'});
  }
}
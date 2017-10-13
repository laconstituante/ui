import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

// import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { AppComponent } from './app.component';
import { MainComponent } from '../main/main.component';
import { ArticlesComponent } from '../main/articles.component';
import { SingleAlineaComponent } from '../main/single.alinea.component';
import { ArticleComponent } from '../main/article.component';
import { TitreComponent } from '../main/titre.component';
import { TitresComponent } from '../main/titres.component';
import { HomePage } from '../main/home.page.component';
import { CreateProfile } from '../forms/create.profile';
import { LoginFormComponent } from '../forms/login.component';
import {ConfirmEmail} from '../forms/confirm.email';
import {VoteSnack} from '../snackbar/vote.snack.component';
import {DashBoardComponent} from '../main/dash.board.component';
import {EnsembleComponent} from '../main/ensemble.component';
import {InsufficiantPrivilegesComponent} from '../forms/insufficiant.privileges.component';
import { PropositionsComponent } from "../forms/propositions.component";
import { PropositionComponent } from "../forms/proposition.component";
//dtos
import {Titre} from '../dto/titre';
import {Article} from '../dto/article';
import {Alinea} from '../dto/alinea';
import {Proposition} from '../dto/proposition';
//Services
import { RestService } from '../services/rest.service';
import { ArticleSubject } from '../services/article.subject';
import { WindowService } from '../services/window.service';
import { PageManagerService } from '../services/page.manager.service';
import {NewArticleHandler} from '../services/new.article.handler';
//external libs
// import { RecaptchaNoFormsModule } from 'ng2-recaptcha/ng2-recaptcha.noforms';
// import {RecaptchaLoaderService} from 'ng2-recaptcha';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {MessagesModule} from 'primeng/components/messages/messages';
import {ChartModule} from 'primeng/components/chart/chart';
import {AccordionModule} from 'primeng/components/accordion/accordion';
import { UserStatComponent } from './user-stat/user-stat.component';
import { GeneralStatComponent } from './general-stat/general-stat.component';
import { ResumeVotesComponent } from "../main/resume.vote.component";
import { ViewProfile } from "../forms/view.profile";
import { SettingsComponent } from "../main/settings.component";
import { HelpComponent } from "../forms/help.component";
import { UserPropositionsComponent } from "../forms/user.propositions.component";
import { ContactComponent } from "../forms/contact.component";
import { SupportComponent } from "../forms/support.component";
import { SimpleConfirm } from "../forms/simple.confirm";
import { routes } from "./app.router";
import { provideRoutes, RouterModule } from '@angular/router';
import { ConstitutionComponent } from "../main/constitution.component";
import { ConstitutionsComponent } from "../main/constitutions.component";
import { AlineaComponent } from "../main/alinea.component";
import { AlineasComponent } from "../main/alineas.component";
import { TitresMainComponent } from "../main/titres.main.component";

// import {MenubarModule} from 'primeng/components/menubar/menubar';
// import { CeiboShare } from 'ng2-social-share';
// import {ShareButtonsModule} from "ng2-sharebuttons";
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { ShareService } from "../services/share.service";
import { SharableDirective } from "../directives/sharable.directive";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ArticlesComponent,
    SingleAlineaComponent,
    PropositionComponent,
    ArticleComponent,
    TitresComponent,
    TitreComponent,
    HomePage,
    CreateProfile,
    EnsembleComponent,
    DashBoardComponent,
    LoginFormComponent,
    ConfirmEmail,
    InsufficiantPrivilegesComponent,
    VoteSnack,
    UserStatComponent,
    GeneralStatComponent,
    ResumeVotesComponent,
    PropositionsComponent,
    PropositionComponent,
    ViewProfile,
    SettingsComponent,
    HelpComponent,
    UserPropositionsComponent,
    ContactComponent,
    SupportComponent,
    SimpleConfirm,
    ConstitutionComponent,
    ConstitutionsComponent,
    AlineasComponent,
    AlineaComponent,
    TitresMainComponent,
    // ShareButtonsModule
    SharableDirective 
  ],
  imports: [
    BrowserModule,//.withServerTransition({appId: 'laconstituante'}),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    Ng2PageScrollModule.forRoot(),
    MessagesModule,
    ChartModule,
    AccordionModule,
    routes,
    RouterModule,
    Angular2FontawesomeModule
  ],
  providers: [
    RestService,
    ArticleSubject,
    WindowService,
    PageManagerService,
    NewArticleHandler,
    ShareService
    ],
  entryComponents: [ ConfirmEmail,VoteSnack,InsufficiantPrivilegesComponent,PropositionsComponent,SimpleConfirm ],
  bootstrap: [AppComponent]
})
export class AppModule { }

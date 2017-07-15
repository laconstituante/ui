import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import 'hammerjs';
// import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {MessagesModule} from 'primeng/components/messages/messages';
import {ChartModule} from 'primeng/components/chart/chart';
import {AccordionModule} from 'primeng/components/accordion/accordion';
import { routes } from "./app.router";
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
export { AppComponent };
//Custom Component/Service/Directives
import { ShareService } from "../services/share.service";
import { SharableDirective } from "../directives/sharable.directive";
import { ConstitutionComponent } from "../main/constitution.component";
import { ConstitutionsComponent } from "../main/constitutions.component";
import { AlineaComponent } from "../main/alinea.component";
import { AlineasComponent } from "../main/alineas.component";
import { TitresMainComponent } from "../main/titres.main.component";
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
//Services
import { RestService } from '../services/rest.service';
import { ArticleSubject } from '../services/article.subject';
import { WindowService } from '../services/window.service';
import { PageManagerService } from '../services/page.manager.service';
import {NewArticleHandler} from '../services/new.article.handler';
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
    SharableDirective 
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'laconstituante' }),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    NoopAnimationsModule,
    // Ng2PageScrollModule.forRoot(),
    MessagesModule,
    ChartModule,
    AccordionModule,
    routes,
    RouterModule,
    Angular2FontawesomeModule
  ],
  exports: [AppComponent],
  providers: [
    RestService,
    ArticleSubject,
    WindowService,
    PageManagerService,
    NewArticleHandler,
    ShareService],
  entryComponents: [ ConfirmEmail,VoteSnack,InsufficiantPrivilegesComponent,PropositionsComponent,SimpleConfirm ],
  bootstrap: [AppComponent]
})
export class AppModule { }

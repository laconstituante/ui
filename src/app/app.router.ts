import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import {ResumeVotesComponent} from '../main/resume.vote.component';
import {HomePage} from '../main/home.page.component';
import { LoginFormComponent } from '../forms/login.component';
import { ConstitutionsComponent } from '../main/constitutions.component';
import { ConstitutionComponent } from '../main/constitution.component';
import { TitresComponent } from "../main/titres.component";
import { ArticlesComponent } from "../main/articles.component";
import { PropositionsComponent } from "../forms/propositions.component";
import { TitreComponent } from "../main/titre.component";
import { ArticleComponent } from "../main/article.component";
import { CreateProfile } from "../forms/create.profile";
import { ContactComponent } from "../forms/contact.component";
import { AlineaComponent } from '../main/alinea.component';
import { AlineasComponent } from '../main/alineas.component';
import { SupportComponent } from "../forms/support.component";
import { HelpComponent } from "../forms/help.component";
import { SettingsComponent } from "../main/settings.component";
import { TitresMainComponent } from "../main/titres.main.component";
import { DashBoardComponent } from "../main/dash.board.component";

export const router:Routes = [
    {path : '' , redirectTo:'accueil', pathMatch:'full' },
    {path : 'accueil' , component: HomePage},
    {path:'constitutions', component : ConstitutionsComponent},
    {path:'constitution/:id', component : ConstitutionComponent},
    {path:'titres/:id', component : TitresMainComponent},
    {path:'titre/:id', component : TitreComponent}, 
    {path:'articles', component : ArticlesComponent},
    {path:'article/:id', component : ResumeVotesComponent},
    {path:'poursuivre-mes-votes', component : ResumeVotesComponent},
    {path:'alineas/:article/:constitution', component : AlineasComponent},
    {path:'alinea/:id', component : AlineaComponent},
    {path:'sidentifier', component : SettingsComponent},
    {path:'creer-un-compte', component : SettingsComponent},
    {path:'contactez-nous', component : SettingsComponent},
    {path:'participez-avec-nous', component : SettingsComponent},
    {path:'comment-ca-marche', component:SettingsComponent},
    {path:"deconnexion", component:SettingsComponent},
    {path:'tableau-de-bord', component:DashBoardComponent}
]

export const routes : ModuleWithProviders = RouterModule.forRoot(router);
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { AddCommandeComponent } from './add-commande/add-commande.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { AddChaineComponent } from './add-chaine/add-chaine.component';
import { ChaineProdComponent } from './chaine-prod/chaine-prod.component';
import { GammeComponent } from './gamme/gamme.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { PhasesComponent } from './phases/phases.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DetailsEmployeeComponent } from './details-employee/details-employee.component';
import { TaillesComponent } from './tailles/tailles.component';
import { OrdreOfComponent } from './ordre-of/ordre-of.component';
import { ListeOfComponent } from './liste-of/liste-of.component';
import { OrdreDetailsComponent } from './ordre-details/ordre-details.component';
import { RendementOuvrierComponent } from './rendement-ouvrier/rendement-ouvrier.component';
import { EditCommandeComponent } from './edit-commande/edit-commande.component';
import { ListRendementComponent } from './list-rendement/list-rendement.component';
import { UserListeComponent } from './user-liste/user-liste.component';
import { AuthorizationGuardService } from './service/authorization-guard.service';
import { AuthGuardService } from './service/auth-guard.service';
import { SuivieOfComponent } from './suivie-of/suivie-of.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditUserComponent } from './edit-user/edit-user.component';





const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'alerts', component: AlertsComponent },
  { path: 'edit-operation/:id', component: AccordionComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'nouvel-article', component: BreadcrumbsComponent,canActivate: [AuthorizationGuardService]},
  { path: 'buttons', component: ButtonsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'carousel/:id', component: CarouselComponent,canActivate: [AuthorizationGuardService]},
  { path: 'charts-apexcharts', component: ChartsApexchartsComponent },
  { path: 'charts-chartjs/:id', component: ChartsChartjsComponent },
  { path: 'form-editors/:id', component: FormsEditorsComponent,canActivate: [AuthorizationGuardService]},
  { path: 'nouveau-client', component: FormsElementsComponent,canActivate: [AuthorizationGuardService]},
  { path: 'add-user', component: FormsLayoutsComponent,canActivate: [AuthGuardService]},
  { path: 'icons-bootstrap', component: IconsBootstrapComponent },
  { path: 'icons-boxicons', component: IconsBoxiconsComponent },
  { path: 'icons-remix', component: IconsRemixComponent },
  { path: 'list-group/:id', component: ListGroupComponent,canActivate: [AuthorizationGuardService]},
  { path: 'modal/:id', component: ModalComponent},
  { path: 'pagination', component: PaginationComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'nouveau-modele', component: SpinnersComponent,canActivate: [AuthorizationGuardService]},
  { path: 'tables-data', component: TablesDataComponent },
  { path: 'tables-general', component: TablesGeneralComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'pages-blank/:id', component: PagesBlankComponent},
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'edit-user/:id', component: PagesFaqComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register/:id', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
  { path: 'add-commande',component:AddCommandeComponent,canActivate: [AuthorizationGuardService]},
  { path:'commande-liste',component:CommandeListComponent},
  {path:'chaines',component:AddChaineComponent},
  {path:'operation-catalogue',component:ChaineProdComponent},
  {path:'gamme',component:GammeComponent},
  {path:'add-employe',component:AddEmployeeComponent,canActivate: [AuthGuardService]},
  {path:'list-employees',component:ListEmployeesComponent,canActivate: [AuthGuardService]},
  {path:'phases',component:PhasesComponent},
  {path:'edit-employee/:id',component:EditEmployeeComponent,canActivate: [AuthGuardService]},
  {path:'details-employee/:id',component:DetailsEmployeeComponent,canActivate: [AuthGuardService]},
  {path:'tailles',component:TaillesComponent},
  {path:'add-ordre-fabrication',component:OrdreOfComponent,canActivate: [AuthorizationGuardService]},
  {path:'list-of',component:ListeOfComponent},
  {path:'ordre-details/:id',component:OrdreDetailsComponent},
  {path:'rendement-ouvrier',component:RendementOuvrierComponent,canActivate: [AuthGuardService]},
  {path:'edit-commande/:id',component:EditCommandeComponent,canActivate: [AuthorizationGuardService]},
  {path:'list-rendement',component:ListRendementComponent,canActivate: [AuthGuardService]},
  {path:'users-liste',component:UserListeComponent,canActivate: [AuthGuardService]},
  {path:'suivie-of',component:SuivieOfComponent,canActivate: [AuthorizationGuardService]},
  {path:'user-edit/:id',component:EditUserComponent,canActivate: [AuthGuardService]},
  {path:'reset-password',component:ResetPasswordComponent},

  { path: '', redirectTo: 'dashbord', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

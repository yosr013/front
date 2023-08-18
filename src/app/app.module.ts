import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { AddCommandeComponent } from './add-commande/add-commande.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { AddChaineComponent } from './add-chaine/add-chaine.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ChaineProdComponent } from './chaine-prod/chaine-prod.component';
import { GammeComponent } from './gamme/gamme.component';
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
import { SuivieOfComponent } from './suivie-of/suivie-of.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    AddCommandeComponent,
    CommandeListComponent,
    AddChaineComponent,
    AddEmployeeComponent,
    ChaineProdComponent,
    GammeComponent,
    ListEmployeesComponent,
    PhasesComponent,
    EditEmployeeComponent,
    DetailsEmployeeComponent,
    TaillesComponent,
    OrdreOfComponent,
    ListeOfComponent,
    OrdreDetailsComponent,
    RendementOuvrierComponent,
    EditCommandeComponent,
    ListRendementComponent,
    UserListeComponent,
    SuivieOfComponent,
    ResetPasswordComponent,
    EditUserComponent,

    
   
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
    
    
    
    
    
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

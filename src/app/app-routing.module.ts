import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { EducationComponent } from './component/categories/education/education.component';
import { EntertainmentComponent } from './component/categories/entertainment/entertainment.component';
import { NationComponent } from './component/categories/nation/nation.component';
import { OdishaComponent } from './component/categories/odisha/odisha.component';
import { SportsComponent } from './component/categories/sports/sports.component';
import { TopStoriesComponent } from './component/categories/top-stories/top-stories.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    children: [
      { path: 'top-stories', component: TopStoriesComponent },
      { path: 'odisha', component: OdishaComponent },
      { path: 'sports', component: SportsComponent },
      { path: 'education', component: EducationComponent },
      { path: 'entertainment', component: EntertainmentComponent },
      { path: 'nation', component: NationComponent },
    ],
  },
  {
    path: 'article',
    component: ArticleComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

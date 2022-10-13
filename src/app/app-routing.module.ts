import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { CategoriesComponent } from './component/categories/categories.component';
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

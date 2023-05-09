import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { TopStoriesComponent } from './component/categories/top-stories/top-stories.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { HomeComponent } from './component/home/home.component';
import { SidenavComponent } from './component/layout/sidenav/sidenav.component';
import { PasswordComponent } from './password/password.component';
import { OdishaComponent } from './component/categories/odisha/odisha.component';
import { NationComponent } from './component/categories/nation/nation.component';
import { SportsComponent } from './component/categories/sports/sports.component';
import { EntertainmentComponent } from './component/categories/entertainment/entertainment.component';
import { BusinessComponent } from './component/categories/business/business.component';
import { HealthComponent } from './component/categories/health/health.component';
import { PoliticsComponent } from './component/categories/politics/politics.component';
import { CrimeComponent } from './component/categories/crime/crime.component';
import { EducationComponent } from './component/categories/education/education.component';
import { TechnologyComponent } from './component/categories/technology/technology.component';
import { BlogCategoryComponent } from './component/categories/blog-category/blog-category.component';
import { HeaderCategoryComponent } from './component/header-category/header-category.component';
import { SearchPostComponent } from './component/search-post/search-post.component';
import { AuthGuard } from './Guards/auth.guard';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { SingleHomepageComponent } from './component/single-homepage/single-homepage.component';
import { SinglesearchComponent } from './component/singlesearch/singlesearch.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'home',
    component:SingleHomepageComponent
  },{
    path: 'newsearch/:value',
    component: SinglesearchComponent,
  },
  // {
  //   path: 'search/:value',
  //   component: SearchPostComponent,
  // },
  {
    path: 'category/:slug',
    component: HeaderCategoryComponent,
  },
  {
    path: 'post/:Id',
    component: ArticleComponent,
  },

  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'test',
  //   component: ManageHeaderComponent,
  // },
  {
    path: 'PrivacyPolicy',
    component: PrivacyPolicyComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

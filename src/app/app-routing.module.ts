import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { BiographyComponent } from './component/categories/biography/biography.component';
import { BusinessComponent } from './component/categories/business/business.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { CoronaComponent } from './component/categories/corona/corona.component';
import { CrimeComponent } from './component/categories/crime/crime.component';
import { DharmaComponent } from './component/categories/dharma/dharma.component';
import { EducationComponent } from './component/categories/education/education.component';
import { EntertainmentComponent } from './component/categories/entertainment/entertainment.component';
import { NationComponent } from './component/categories/nation/nation.component';
import { OdishaComponent } from './component/categories/odisha/odisha.component';
import { OlympicsComponent } from './component/categories/olympics/olympics.component';
import { PoliticsComponent } from './component/categories/politics/politics.component';
import { ProfileComponent } from './component/categories/profile/profile.component';
import { SpecialReportComponent } from './component/categories/special-report/special-report.component';
import { SportsComponent } from './component/categories/sports/sports.component';
import { TopStoriesComponent } from './component/categories/top-stories/top-stories.component';
import { VideoCategoryComponent } from './component/categories/video-category/video-category.component';
import { WeatherComponent } from './component/categories/weather/weather.component';
import { ZodiacComponent } from './component/categories/zodiac/zodiac.component';
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
      { path: 'politics', component: PoliticsComponent },
      { path: 'business', component: BusinessComponent },
      { path: 'crime', component: CrimeComponent },
      { path: 'dharma', component: DharmaComponent },
      { path: 'special-report', component: SpecialReportComponent },
      { path: 'video-category', component: VideoCategoryComponent },
      { path: 'weather', component: WeatherComponent },
      { path: 'zodiac', component: ZodiacComponent },
      { path: 'biography', component: BiographyComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'corona', component: CoronaComponent },
      { path: 'olympics', component: OlympicsComponent },
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

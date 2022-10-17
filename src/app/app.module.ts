import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { LatestNewsHeaderComponent } from './component/latest-news-header/latest-news-header.component';
import { HomeComponent } from './component/home/home.component';
import { MainNewsComponent } from './component/main-news/main-news.component';
import { LatestNewsComponent } from './component/latest-news/latest-news.component';
import { OdishaNewsComponent } from './component/odisha-news/odisha-news.component';
import { FooterComponent } from './component/footer/footer.component';
import { ScienceNewsComponent } from './component/science-news/science-news.component';
import { NationNewsComponent } from './component/nation-news/nation-news.component';
import { PoliticsNewsComponent } from './component/politics-news/politics-news.component';
import { SportsNewsComponent } from './component/sports-news/sports-news.component';
import { BusinessNewsComponent } from './component/business-news/business-news.component';
import { BlogComponent } from './component/blog/blog.component';
import { TwinCityNewsComponent } from './component/twin-city-news/twin-city-news.component';
import { CrimeNewsComponent } from './component/crime-news/crime-news.component';
import { EntertainmentNewsComponent } from './component/entertainment-news/entertainment-news.component';
import { WomenNewsComponent } from './component/women-news/women-news.component';
import { EducationNewsComponent } from './component/education-news/education-news.component';
import { CultureNewsComponent } from './component/culture-news/culture-news.component';
import { HealthNewsComponent } from './component/health-news/health-news.component';
import { EnvironmentNewsComponent } from './component/environment-news/environment-news.component';
import { CampusMuseNewsComponent } from './component/campus-muse-news/campus-muse-news.component';
import { EconomyNewsComponent } from './component/biz/economy-news/economy-news.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { TopStoriesComponent } from './component/categories/top-stories/top-stories.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { OpinionsComponent } from './component/opinions/opinions.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ArticleComponent } from './component/article/article.component';
import { ReplyComponent } from './component/article/reply/reply.component';
import { MightAlsoLikeComponent } from './component/article/might-also-like/might-also-like.component';
import { SocialShareComponent } from './component/social-share/social-share.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './component/comment/comment.component';
import { HoroscopeNewsComponent } from './component/horoscope-news/horoscope-news.component';
import { VideoComponent } from './component/video/video.component';
import { BroadcastLiveComponent } from './component/broadcast-live/broadcast-live.component';
import { InterviewNewsComponent } from './component/interview-news/interview-news.component';
import { TechnologyNewsComponent } from './component/technology-news/technology-news.component';
import { AutomobileNewsComponent } from './component/automobile-news/automobile-news.component';
import { OdishaComponent } from './component/categories/odisha/odisha.component';
import { NationComponent } from './component/categories/nation/nation.component';
import { EducationComponent } from './component/categories/education/education.component';
import { EntertainmentComponent } from './component/categories/entertainment/entertainment.component';
import { SportsComponent } from './component/categories/sports/sports.component';
import { PoliticsComponent } from './component/categories/politics/politics.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LatestNewsHeaderComponent,
    HomeComponent,
    MainNewsComponent,
    LatestNewsComponent,
    OdishaNewsComponent,
    FooterComponent,
    ScienceNewsComponent,
    NationNewsComponent,
    PoliticsNewsComponent,
    SportsNewsComponent,
    BlogComponent,
    BusinessNewsComponent,
    TwinCityNewsComponent,
    CrimeNewsComponent,
    EntertainmentNewsComponent,
    CultureNewsComponent,
    HealthNewsComponent,
    EnvironmentNewsComponent,
    CampusMuseNewsComponent,
    EconomyNewsComponent,
    WomenNewsComponent,
    EducationNewsComponent,
    CategoriesComponent,
    TopStoriesComponent,
    ContactUsComponent,
    LoginComponent,
    OpinionsComponent,
    ArticleComponent,
    ReplyComponent,
    MightAlsoLikeComponent,
    SocialShareComponent,
    CommentComponent,
    HoroscopeNewsComponent,
    VideoComponent,
    BroadcastLiveComponent,
    InterviewNewsComponent,
    TechnologyNewsComponent,
    AutomobileNewsComponent,
    OdishaComponent,
    NationComponent,
    EducationComponent,
    EntertainmentComponent,
    SportsComponent,
    PoliticsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

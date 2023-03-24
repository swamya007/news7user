import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleComponent } from './component/article/article.component';
import { SocialShareComponent } from './component/social-share/social-share.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidenavComponent } from './component/layout/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import { CKEditorModule } from 'ckeditor4-angular';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { PasswordComponent } from './password/password.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ViewUsersComponent } from './component/admin/user/view-users/view-users.component';
import { EditUserComponent } from './component/admin/user/edit-user/edit-user.component';
import { AddUserComponent } from './component/admin/user/add-user/add-user.component';
import { AddcategoryComponent } from './component/admin/category/addcategory/addcategory.component';
import { ViewcategoryComponent } from './component/admin/category/viewcategory/viewcategory.component';
import { TechnologyNewsComponent } from './component/technology-news/technology-news.component';
import { AutomobileNewsComponent } from './component/automobile-news/automobile-news.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditcategoryComponent } from './component/admin/category/editcategory/editcategory.component';
import { AddPostComponent } from './component/admin/admin-Post/add-post/add-post.component';
import { ViewPostComponent } from './component/admin/admin-Post/view-post/view-post.component';
import { AddTagComponent } from './component/admin/admin-tag/add-tag/add-tag.component';
import { ViewTagComponent } from './component/admin/admin-tag/view-tag/view-tag.component';
import { EditTagComponent } from './component/admin/admin-tag/edit-tag/edit-tag.component';

import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdminAdComponent } from './component/admin/admin-ad/admin-ad.component';

import { AddmediaComponent } from './component/admin/media/addmedia/addmedia.component';
import { ViewmediaComponent } from './component/admin/media/viewmedia/viewmedia.component';
import { FileDragNDropDirectiveDirective } from './directives/file-drag-ndrop-directive.directive';
import { EditmediaComponent } from './component/admin/media/editmedia/editmedia.component';

import { AdminAdViewComponent } from './component/admin/admin-ad/admin-ad-view/admin-ad-view.component';
import { ImageCropperModule } from './modules/image-cropper/image-cropper.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
import { MatTabsModule } from '@angular/material/tabs';
import { EditAdDailogComponent } from './component/admin/admin-ad/edit-ad-dailog/edit-ad-dailog.component';
import { CommentModalComponent } from './component/admin/comments-mangement/commentModal/comment-modal/comment-modal.component';
import { CommentsMangementComponent } from './component/admin/comments-mangement/comments-mangement.component';
import { ChoosemediaComponent } from './component/admin/admin-Post/choosemedia/choosemedia.component';
import { ManageHeaderComponent } from './component/admin/manage-header/manage-header.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ChangePasswordComponent } from './component/user-profile/change-password/change-password.component';
import { EditProfileComponent } from './component/user-profile/edit-profile/edit-profile.component';
import { EditPostComponent } from './component/admin/admin-Post/edit-post/edit-post.component';
import { HeaderCategoryComponent } from './component/header-category/header-category.component';
import { CategoryComponent } from './component/header-category/category/category.component';
import { AdminPostDraftComponent } from './component/admin/admin-Post/admin-post-draft/admin-post-draft.component';
import { DashboardComponent } from './component/layout/dashboard/dashboard/dashboard.component';
import { AdminDraftViewComponent } from './component/admin/drafts/admin-draft-view/admin-draft-view.component';
import { AdminDraftEditComponent } from './component/admin/drafts/admin-draft-edit/admin-draft-edit.component';

import { SearchPostComponent } from './component/search-post/search-post.component';
import { SearchNewsComponent } from './component/search-post/search-news/search-news.component';
import { AdminEditPostDraftComponent } from './component/admin/admin-Post/admin-edit-post-draft/admin-edit-post-draft.component';
import { SearchStickyComponent } from './component/search-sticky/search-sticky.component';
import { ForgotpassdialogComponent } from './component/login/forgotpassdialog/forgotpassdialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminChangePasswordComponent } from './component/admin/user/view-users/admin-change-password/admin-change-password.component';
import { EntryPopupComponent } from './component/entry-popup/entry-popup.component';
import { TrendingnewsComponent } from './component/admin/trendingnews/trendingnews.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { FeaturedStoriesComponent } from './component/featured-stories/featured-stories.component';
import { BnNgTreeModule } from 'bn-ng-tree-lib';
import { DEFAULT_LIBRARY_BUTTONS, NgxWigModule } from 'ngx-wig';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';

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
    SocialShareComponent,
    SidenavComponent,
    AddUserComponent,
    PasswordComponent,
    ViewUsersComponent,
    EditUserComponent,
    ForgetpasswordComponent,
    AddcategoryComponent,
    ViewcategoryComponent,
    TechnologyNewsComponent,
    AutomobileNewsComponent,
    EditcategoryComponent,
    AddPostComponent,
    ViewPostComponent,
    AddTagComponent,
    ViewTagComponent,
    EditTagComponent,
    AdminAdComponent,
    AddmediaComponent,
    ViewmediaComponent,
    FileDragNDropDirectiveDirective,
    EditmediaComponent,
    AdminAdViewComponent,
    OdishaComponent,
    NationComponent,
    SportsComponent,
    EntertainmentComponent,
    BusinessComponent,
    HealthComponent,
    PoliticsComponent,
    CrimeComponent,
    EducationComponent,
    TechnologyComponent,
    BlogCategoryComponent,
    EditAdDailogComponent,
    CommentModalComponent,
    CommentsMangementComponent,
    ChoosemediaComponent,
    ChoosemediaComponent,
    ManageHeaderComponent,
    EditProfileComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    EditPostComponent,
    HeaderCategoryComponent,
    CategoryComponent,
    AdminPostDraftComponent,
    DashboardComponent,
    AdminDraftViewComponent,
    AdminDraftEditComponent,
    SearchPostComponent,
    SearchNewsComponent,
    AdminEditPostDraftComponent,
    SearchStickyComponent,
    ForgotpassdialogComponent,
    AdminChangePasswordComponent,
    EntryPopupComponent,
    TrendingnewsComponent,
    PrivacyPolicyComponent,
    FeaturedStoriesComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatRadioModule,
    CKEditorModule,
    ImageCropperModule,
    MatTabsModule,
    ImageCropperModule,
    MatSlideToggleModule,
    IvyCarouselModule,
    DragDropModule,
    NgxSpinnerModule,
    BnNgTreeModule,
    NgxWigModule.forRoot({ buttonsConfig: DEFAULT_LIBRARY_BUTTONS }),
    AngularEditorModule,
    QuillModule,
  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

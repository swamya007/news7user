import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './component/article/article.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { TopStoriesComponent } from './component/categories/top-stories/top-stories.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { HomeComponent } from './component/home/home.component';
import { SidenavComponent } from './component/layout/sidenav/sidenav.component';
import { LoginComponent } from './component/login/login.component';
import { PasswordComponent } from './password/password.component';
import { AddcategoryComponent } from './component/admin/category/addcategory/addcategory.component';
import { ViewcategoryComponent } from './component/admin/category/viewcategory/viewcategory.component';
import { AddUserComponent } from './component/admin/user/add-user/add-user.component';
import { EditUserComponent } from './component/admin/user/edit-user/edit-user.component';
import { ViewUsersComponent } from './component/admin/user/view-users/view-users.component';
import { EditcategoryComponent } from './component/admin/category/editcategory/editcategory.component';
import { AddPostComponent } from './component/admin/admin-Post/add-post/add-post.component';
import { ViewPostComponent } from './component/admin/admin-Post/view-post/view-post.component';
import { AddTagComponent } from './component/admin/admin-tag/add-tag/add-tag.component';
import { ViewTagComponent } from './component/admin/admin-tag/view-tag/view-tag.component';
import { EditTagComponent } from './component/admin/admin-tag/edit-tag/edit-tag.component';
import { AddmediaComponent } from './component/admin/media/addmedia/addmedia.component';
import { ViewmediaComponent } from './component/admin/media/viewmedia/viewmedia.component';
import { EditmediaComponent } from './component/admin/media/editmedia/editmedia.component';
import { AdminAdComponent } from './component/admin/admin-ad/admin-ad.component';
import { AdminAdViewComponent } from './component/admin/admin-ad/admin-ad-view/admin-ad-view.component';
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
import { CommentsMangementComponent } from './component/admin/comments-mangement/comments-mangement.component';
import { ManageHeaderComponent } from './component/admin/manage-header/manage-header.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { EditProfileComponent } from './component/user-profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './component/user-profile/change-password/change-password.component';
import { EditPostComponent } from './component/admin/admin-Post/edit-post/edit-post.component';
import { HeaderCategoryComponent } from './component/header-category/header-category.component';
import { DashboardComponent } from './component/layout/dashboard/dashboard/dashboard.component';
import { AdminDraftViewComponent } from './component/admin/drafts/admin-draft-view/admin-draft-view.component';
import { AdminDraftEditComponent } from './component/admin/drafts/admin-draft-edit/admin-draft-edit.component';
import { AdminPostDraftComponent } from './component/admin/admin-Post/admin-post-draft/admin-post-draft.component';
import { SearchPostComponent } from './component/search-post/search-post.component';
import { AdminEditPostDraftComponent } from './component/admin/admin-Post/admin-edit-post-draft/admin-edit-post-draft.component';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:value',
    component: SearchPostComponent
  },
  {
    path: 'category/:slug',
    component: HeaderCategoryComponent
  },
  {
    path: 'post/:Id',
    component: ArticleComponent
  },
  {
    path: 'admin', component: SidenavComponent,canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: UserProfileComponent,  data: {
        title: 'dxcfcf',
        description:''
      }  },
      { path: '', component: DashboardComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'profile/edit/:id', component: EditProfileComponent },
      { path: 'profile/change-password', component: ChangePasswordComponent },
      { path: 'user/add', component: AddUserComponent },
      { path: 'user/view', component: ViewUsersComponent },
      { path: 'user/edit/:id', component: EditUserComponent },
      { path: 'password', component: PasswordComponent },
      { path: 'category/add', component: AddcategoryComponent },
      { path: 'category/view', component: ViewcategoryComponent },
      { path: 'category/edit/:id', component: EditcategoryComponent },
      { path: 'post/add', component: AddPostComponent },
      { path: 'post/view', component: ViewPostComponent },
      { path: 'post/edit/:id', component: EditPostComponent },
      { path: 'tag/add', component: AddTagComponent },
      { path: 'tag/view', component: ViewTagComponent },
      { path: 'tag/edit/:id', component: EditTagComponent },
      { path: 'media/add', component: AddmediaComponent },
      { path: 'media/view', component: ViewmediaComponent },
      { path: 'media/edit/:id', component: EditmediaComponent },
      { path: 'ads/add', component: AdminAdComponent },
      { path: 'ads/view', component: AdminAdViewComponent },
      { path: 'comment/manage', component: CommentsMangementComponent },
      { path: 'header/manage', component: ManageHeaderComponent },
      { path: 'drafts/view', component: AdminDraftViewComponent },
      { path: 'drafts/edit/:id', component: AdminDraftEditComponent },
      { path: 'post/drafts/edit/:id', component: AdminPostDraftComponent },
      { path: 'post/drafts/bypost/edit/:id/:draft_id', component: AdminEditPostDraftComponent },
      
    ],
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'test',
    component: ManageHeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

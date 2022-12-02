import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const MasterAPI: string = environment.BASE_URL + '/user';

const Masterapi: string = environment.BASE_URL + '/post';
@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  constructor(private HTTP: HttpClient) { }

  addpost(post: any) {
    return this.HTTP.post<any>(Masterapi + `/add-post`, { ...post });
  }

  draftpost(post: any) {
    return this.HTTP.post<any>(Masterapi + `/draft-post`, { ...post });
  }

  getDraftedPostByAuthor(author: any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-drafted-post-by-author?author=${author}&customer_id=${customer_id}`);
  }

  getpostall(post_id: any,post_name:any,cust_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-post-details?post_id=${post_id}&post_name=${post_name}&customer_id=${cust_id}`);
  }

  getPostBySearchVal(type: any,searchval:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-post-details-by-searchval?type=${type}&searchval=${searchval}&customer_id=${customer_id}`);
  }

  getSearchedPost(searchval:any,cust_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-searched-post?searchval=${searchval}&customer_id=${cust_id}`);
  }

  getLatestNews(page_no: any,cust_id:any,category_name:any) {
    return this.HTTP.get<any>(Masterapi + `/get-post-list-page-wise?page_no=${page_no}&customer_id=${cust_id}&category_name=${category_name}`);
  }

  getTrendingNews(customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-trending-news?customer_id=${customer_id}`);
  }

  getPostByAuthor(author_id: any,post_id:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-post-by-author?author_id=${author_id}&post_id=${post_id}&customer_id=${customer_id}`);
  }

  getPostByCategoryID(page_no: any,category_id:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-post-by-category?page_no=${page_no}&category_id=${category_id}&customer_id=${customer_id}`);
  }

  getPostBySlug(slug: any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-post-by-slug?slug=${slug}&customer_id=${customer_id}`);
  }

  getPostByCategorySlug(page_no:any,category_slug: any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-post-by-category-slug?page_no=${page_no}&category_slug=${category_slug}&customer_id=${customer_id}`);
  }

  savePostComment(comment: any) {
    return this.HTTP.post<any>(Masterapi + `/save-post-comment`, { ...comment });
  }

  getCommentByPost(page_no: any,post_id:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-comment-by-post?page_no=${page_no}&post_id=${post_id}&customer_id=${customer_id}`);
  }

  getPostForManageComments(searchval:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-post-for-manage-comments?searchval=${searchval}&customer_id=${customer_id}`);
  }

  getDraftDetails(user_id:any,draft_id: any,cust_id:any,searchval:any) {
    return this.HTTP.get<any>(Masterapi + `/get-draft-details?user_id=${user_id}&draft_id=${draft_id}&customer_id=${cust_id}&searchval=${searchval}`);
  }
  getdraftdetailsbypost(post_id:any,draft_id: any,cust_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-draft-details-by-post?post_id=${post_id}&draft_id=${draft_id}&customer_id=${cust_id}`);
  }
  

}

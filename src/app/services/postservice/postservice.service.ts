import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { withCache } from '@ngneat/cashew';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const MasterAPI: string = environment.BASE_URL + '/user';

const Masterapi: string = environment.BASE_URL + '/post';
@Injectable({
  providedIn: 'root',
})
export class PostserviceService {
  constructor(private HTTP: HttpClient) {}

  addpost(post: any) {
    return this.HTTP.post<any>(Masterapi + `/add-post`, { ...post });
  }

  addpostodia(post: any) {
    return this.HTTP.post<any>(Masterapi + `/add-post-odia`, { ...post });
  }

  addTicker(post: any) {
    return this.HTTP.post<any>(Masterapi + `/add-ticker`, { ...post });
  }

  getTicker(ticker_id: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-ticker-details?ticker_id=${ticker_id}&customer_id=${customer_id}`
    );
  }

  addnewtag(tag: any) {
    return this.HTTP.post<any>(Masterapi + `/add-tag`, { ...tag });
  }

  draftpost(post: any) {
    return this.HTTP.post<any>(Masterapi + `/draft-post`, { ...post });
  }

  getDraftedPostByAuthor(author: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-drafted-post-by-author?author=${author}&customer_id=${customer_id}`
    );
  }

  // getpostall(post_id: any, post_name: any, cust_id: any) {
  //   return this.HTTP.get<any>(
  //     Masterapi +
  //       `/get-post-details?post_id=${post_id}&post_name=${post_name}&customer_id=${cust_id}`,
  //     {
  //       context: withCache(),
  //     }
  //   );
  // }

  getpostallodia(post_id: any, post_name: any, cust_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-details-odia?post_id=${post_id}&post_name=${post_name}&customer_id=${cust_id}`
     
    );
  }

  // postPagination(page_no: any,cust_id:any,post_val:any,cat_id:any,year:any,mnth:any,athr:any,date:any) {
  //   return this.HTTP.get<any>(Masterapi + `/get-post-pagination?page_no=${page_no}&customer_id=${cust_id}&post_val=${post_val}&category_id=${parseInt(cat_id)}
  //   &year=${year}&month=${mnth}&author=${athr}&date_val=${date}`);
  // }

  postPagination(obj: any) {
    return this.HTTP.post<any>(Masterapi + `/get-post-pagination-odia`, { ...obj });
  }
  postPagination15(obj: any) {
    return this.HTTP.post<any>(Masterapi + `/get-post-pagination-15days`, {
      ...obj,
    });
  }

  getPostBySearchVal(type: any, searchval: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-details-by-searchval?type=${type}&searchval=${searchval}&customer_id=${customer_id}`
    );
  }

  getSearchedPost(searchval: any, cust_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-searched-post?searchval=${searchval}&customer_id=${cust_id}`
    );
  }

  getSearchedPostodia(searchval: any, cust_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-searched-post-odia?searchval=${searchval}&customer_id=${cust_id}`
    );
  }

  getLatestNews(page_no: any, cust_id: any, category_name: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-list-page-wise?page_no=${page_no}&customer_id=${cust_id}&category_name=${category_name}`,
      
    );
  }

  getLatestNewsodia(page_no: any, cust_id: any, category_name: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-list-page-wise-odia?page_no=${page_no}&customer_id=${cust_id}&category_name=${category_name}`
    );
  }

  getNewsForHome(limit: any, cust_id: any, category_name: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-list-for-home?limit=${limit}&customer_id=${cust_id}&category_name=${category_name}`
     
    );
  }

  getTrendingNews(customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi + `/get-trending-news?customer_id=${customer_id}`
     
    );
  }

  gettodaysnews(customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi + `/get-todays-news?customer_id=${customer_id}`
    
    );
  }

  // gettodaysnews(customer_id:any) {
  //   return this.HTTP.get<any>(Masterapi + `/get-todays-news?customer_id=${customer_id}`);
  // }

  getPostByAuthor(author_id: any, post_id: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-by-author?author_id=${author_id}&post_id=${post_id}&customer_id=${customer_id}`
    
    );
  }

  getPostByCategoryID(page_no: any, category_id: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-by-category?page_no=${page_no}&category_id=${category_id}&customer_id=${customer_id}`
     
    );
  }

  getPostByCategoryIDodia(page_no: any, category_id: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-by-category-odia?page_no=${page_no}&category_id=${category_id}&customer_id=${customer_id}`
     
    );
  }

  getPostBySlug(slug: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi + `/get-post-by-slug?slug=${slug}&customer_id=${customer_id}`
    
    );
  }
  getPostBySlugodia(slug: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi + `/get-post-by-slug-odia?slug=${slug}&customer_id=${customer_id}`
     
    );
  }
  getPostByCategorySlug(page_no: any, category_slug: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-by-category-slug?page_no=${page_no}&category_slug=${category_slug}&customer_id=${customer_id}`
   
    );
  }
  getPostByCategorySlugodia(page_no: any, category_slug: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-by-category-slug-odia?page_no=${page_no}&category_slug=${category_slug}&customer_id=${customer_id}`
    
    );
  }


  savePostComment(comment: any) {
    return this.HTTP.post<any>(Masterapi + `/save-post-comment`, {
      ...comment,
    });
  }

  getCommentByPost(page_no: any, post_id: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-comment-by-post?page_no=${page_no}&post_id=${post_id}&customer_id=${customer_id}`
    );
  }

  getPostForManageComments(searchval: any, customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-post-for-manage-comments?searchval=${searchval}&customer_id=${customer_id}`
    );
  }

  getDraftDetails(user_id: any, draft_id: any, cust_id: any, searchval: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-draft-details?user_id=${user_id}&draft_id=${draft_id}&customer_id=${cust_id}&searchval=${searchval}`
    );
  }
  
  getdraftdetailsbypost(post_id: any, draft_id: any, cust_id: any) {
    return this.HTTP.get<any>(
      Masterapi +
        `/get-draft-details-by-post?post_id=${post_id}&draft_id=${draft_id}&customer_id=${cust_id}`
    );
  }

  getsilder(customer_id: any) {
    return this.HTTP.get<any>(
      Masterapi + `/get-silde?customer_id=${customer_id}`
      
    );
  }
  getallnews(){
    return this.HTTP.get<any>(Masterapi + `/get-allodia-posts`);
  }
  getallairticle(){
    return this.HTTP.get<any>(Masterapi + `/get-allodia-posts-airticle`);

  }
}

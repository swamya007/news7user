import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
 
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Params {
	[ key: string ]: any;
}
  
export interface GetOptions {
	url: string;
	params?: Params;
}
 
export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}
 
@Injectable({
	providedIn: "root"
})
export class ApiClient {
 
	private axiosClient: AxiosInstance;
	private errorHandler: ErrorHandler;
 
	// I initialize the ApiClient.
	constructor( errorHandler: ErrorHandler ) {
 
		this.errorHandler = errorHandler;
		// The ApiClient wraps calls to the underlying Axios client.
		this.axiosClient = axios.create({
			timeout: 3000,
            baseURL: environment.BASE_URL,
			headers: {
				"X-Initialized-At": Date.now().toString(),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
			}
		});
	}

    getClient(){
        return this.axiosClient;
    }
 
	// ---
	// PUBLIC METHODS.
	// ---
 
	// I perform a GET request with the given options.
	public async get<T>( options: GetOptions ) : Promise<T> {
 
		try {
 
			var axiosResponse = await this.axiosClient.request<T>({
				method: "get",
				url: options.url,
				params: options.params
			});
 
			return( axiosResponse.data );
 
		} catch ( error ) {
 
			return( Promise.reject( this.normalizeError( error ) ) );
 
		}
 
	}

    // I perform a GET request with the given options.
	public async post<T>( options: GetOptions, data:any ) : Promise<T> {
 
		try {
 
			var axiosResponse = await this.axiosClient.request<T>({
				method: "get",
				url: options.url,
				data: data
			});
 
			return( axiosResponse.data );
 
		} catch ( error ) {
 
			return( Promise.reject( this.normalizeError( error ) ) );
 
		}
 
	}
 
	// ---
	// PRIVATE METHODS.
	// ---
 
	// Errors can occur for a variety of reasons. I normalize the error response so that
	// the calling context can assume a standard error structure.
	private normalizeError( error: any ) : ErrorResponse {
 
		this.errorHandler.handleError( error );
 
		// NOTE: Since I'm not really dealing with a production API, this doesn't really
		// normalize anything (ie, this is not the focus of this demo).
		return({
			id: "-1",
			code: "UnknownError",
			message: "An unexpected error occurred."
		});
 
	}
 
}
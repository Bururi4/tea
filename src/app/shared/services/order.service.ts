import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  product: string = '';

  constructor(private http: HttpClient) {

  }

  sendForm(body: any): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>('https://testologia.ru/order-tea', body);
  }
}

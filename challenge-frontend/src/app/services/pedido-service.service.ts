import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { Vendedor, VendedorResponse } from '../models/vendedor.model';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'https://localhost:7198/api/challenge-backend/Pedido';
  private apiVendedorUrl = "https://run.mocky.io/v3/99f2da38-70fe-415c-9ed8-16a50f94c7d7";

  constructor(private http: HttpClient) {}

  guardarPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardarPedido`, pedido);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/getProductos`);
  }

  getVendedores(): Observable<any[]> {
    return this.http.get(this.apiVendedorUrl, { responseType: 'text' }).pipe(
      map(response => {
        const cleanedResponse = this.cleanJSON(response);
        const jsonResponse = JSON.parse(cleanedResponse);
       
        if (jsonResponse && jsonResponse.vendedores) {
          return jsonResponse.vendedores;
        }
      })
    );
  }

  private cleanJSON(jsonString: string): string {
    return jsonString.replace(/,\s*([}\]])/g, '$1');
  }

}


import { PedidoService } from './../../services/pedido-service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../models/pedido.model';
import { Vendedor, VendedorResponse } from '../../models/vendedor.model';
import { Producto } from '../../models/producto.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  providers:[PedidoService],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit{

  public constructor(private PedidoService: PedidoService){}

  pedido: Pedido = {productos:[], vendedorId: null};
  vendedores: Vendedor[] = [];
  productos: Producto[] = [];

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.cargarVendedores();
    this.cargarProductos();
  }

  cargarProductos(){
    this.PedidoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data.filter(producto => producto.deposito === 1);
      },
      (error:any) => {
        console.error('Error al cargar los productos:', error);
      }
    );  
  }

  cargarVendedores(): void {
    this.PedidoService.getVendedores().subscribe(
      (data:Vendedor[]) => {
        this.vendedores = data;
      },
      (error:any) => {
        console.error('Error al cargar los vendedores:', error);
      }
    );
  }

  onChangeProductos(producto:Producto){
    if (!this.pedido.productos.some(pedido => pedido.codigo === producto.codigo)) {
      this.pedido.productos.push(producto);
    } else {
      this.pedido.productos = this.pedido.productos.filter(pedido => pedido.codigo !== producto.codigo);
    }
    console.log(this.pedido);
  }

  guardarPedido(){
    if(this.pedido.productos.length == 0){
      window.alert('Elija algun producto');
      return;
    }
    if(this.pedido.vendedorId == null){
      window.alert('Elija algun vendedor')
      return;
    }

    this.PedidoService.guardarPedido(this.pedido).subscribe(
      (response: boolean) =>{
        if(response){
          window.alert('Pedido guardado correctamente');
        }
        else{
          window.alert('No se pudo guardar el pedido');
        }
      },
      (err:any) => {
        window.alert('Hubo un error inesperado al intentar guardar el pedido');
      }
    )
    this.resetForm();
  }


  resetForm(){
    this.pedido = {productos:[], vendedorId: null};
    this.vendedores = [];
    this.productos = [];
    this.init();
  }

}

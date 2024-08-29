import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PedidoComponent } from './components/pedido/pedido.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PedidoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'challenge-frontend';
}

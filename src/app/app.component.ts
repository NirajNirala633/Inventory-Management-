import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from "./components/home/home.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent, HomeComponent]
})
export class AppComponent {
  title = 'Inventory-Management';
}

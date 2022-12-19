import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../menu/interface/Menu';
import { MenuService } from '../menu/services/menu.service';
import { UserService } from '../sistema/login/users/user.service';
import { Restaurant } from './interface/Restaurant';
import { RestaurantService } from './services/restaurant.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  allRestaurant: Restaurant[] =[];
  restaurant: Restaurant[] =[];
  allMenu: Menu[] =[];
  menu: Menu[] =[];
  searchTerm: string = '';
  searchForm!: FormGroup;

  constructor(
    private userService: UserService,
    private  restaurantService: RestaurantService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurant().subscribe((items) => {
      const data = items
      this.restaurant = data.sort((a, b) => a.name!.localeCompare(b.name!));
      this.allRestaurant = data.sort((a, b) => a.name!.localeCompare(b.name!));
    });

    this.menuService.getMenu().subscribe((items) => {
      const data = items;
      this.menu = data.sort((a, b) => a.description!.localeCompare(b.description!));
      this.allMenu = data.sort((a, b) => a.description!.localeCompare(b.description!));
    });

    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }
  get search() {return this.searchForm.get('search')!;}

  logoff(): void {
    this.userService.logoff();
  }

  filter(){
    this.restaurant = this.allRestaurant.map((iten) => ({...iten}));
    this.menu = this.allMenu.map((iten) => ({...iten}));
    let searchItens: [number] = [0]

    if(this.searchForm.invalid) { return }

    if(this.searchForm.value.search){
      let resta = this.restaurant.filter(rest => {
        return rest.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.searchForm.value.search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      });

      let men = this.menu.filter(rest => {
        return rest.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.searchForm.value.search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || rest.description?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.searchForm.value.search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      });

      if(men || resta){
        if(men) {men.forEach((item) => {searchItens.push(item.restaurant.id!)});}
        if(resta) {resta.forEach((item) => {searchItens.push(item.id!)});}
        this.restaurant = this.restaurant.filter(rest => {
          return searchItens.includes(rest.id!)});
      }
    }
  }
}

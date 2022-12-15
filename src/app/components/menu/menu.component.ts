import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Restaurant } from '../restaurant/interface/Restaurant';
import { RestaurantService } from '../restaurant/services/restaurant.service';
import { UserService } from '../sistema/login/users/user.service';
import { Menu } from './interface/Menu';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  id!: any;
  allMenu: Menu[] = [];
  menu: Menu[] = [];
  restaurant!: Restaurant;

  constructor(
    private params: ActivatedRoute,
    private userService: UserService,
    private menuService: MenuService,
    private  restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.params.paramMap.subscribe((paramsArr: ParamMap) => {
      this.id = paramsArr.get('id');
    });

    this.restaurantService.getRestaurantById(this.id).subscribe((items) => {
      const data = items
      this.restaurant = data
    });

    this.menuService.getMenuByRestaurantId(this.id).subscribe((items) => {
      const data = items;
      this.menu = data.sort((a, b) => a.description!.localeCompare(b.description!));
    });
  }

  logoff(): void {
    this.userService.logoff();
  }
}

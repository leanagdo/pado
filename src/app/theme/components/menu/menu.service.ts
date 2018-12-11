import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Menu } from './menu.model';
import { verticalMenuItems, horizontalMenuItems, horizontalMenuItemsGuest, horizontalMenuItemsDpak, verticalMenuItemsGuest, verticalMenuItemsDpak } from './menu';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';


@Injectable()
export class MenuService {

  public settings:Settings;
  constructor(private location:Location,
              private router:Router, public appSettings:AppSettings){ 
                this.settings = this.appSettings.settings;
              } 
    
  public getVerticalMenuItems():Array<Menu> {
    if (this.settings.logged && this.settings.loggedLogin === "guest") {
      return verticalMenuItemsGuest;
    }
    else if (this.settings.logged && this.settings.loggedLogin === "dpak") {
      return verticalMenuItemsDpak;
    }
    else {
      return verticalMenuItemsGuest;
    }
  }

  public getHorizontalMenuItems():Array<Menu> {
    if (this.settings.logged && this.settings.loggedLogin === "guest") {
      return horizontalMenuItemsGuest;
    }
    else if (this.settings.logged && this.settings.loggedLogin === "dpak") {
      return horizontalMenuItemsDpak;
    }
    else {
      return horizontalMenuItemsGuest;
    }
  }

  public expandActiveSubMenu(menu:Array<Menu>){
      let url = this.location.path();
      let routerLink = url; // url.substring(1, url.length);
      let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
      if(activeMenuItem[0]){
        let menuItem = activeMenuItem[0];
        while (menuItem.parentId != 0){  
          let parentMenuItem = menu.filter(item => item.id == menuItem.parentId)[0];
          menuItem = parentMenuItem;
          this.toggleMenuItem(menuItem.id);
        }
      }
  }

  public toggleMenuItem(menuId){
    let menuItem = document.getElementById('menu-item-'+menuId);
    let subMenu = document.getElementById('sub-menu-'+menuId);  
    if(subMenu){
      if(subMenu.classList.contains('show')){
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
      }
      else{
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
      }      
    }
  }

  public closeOtherSubMenus(menu:Array<Menu>, menuId){
    let currentMenuItem = menu.filter(item => item.id == menuId)[0]; 
    if(currentMenuItem.parentId == 0 && !currentMenuItem.target){
      menu.forEach(item => {
        if(item.id != menuId){
          let subMenu = document.getElementById('sub-menu-'+item.id);
          let menuItem = document.getElementById('menu-item-'+item.id);
          if(subMenu){
            if(subMenu.classList.contains('show')){
              subMenu.classList.remove('show');
              menuItem.classList.remove('expanded');
            }              
          } 
        }
      });
    }
  }
  

}

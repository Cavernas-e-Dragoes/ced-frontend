import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  
  logged!: boolean;
  

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {  
    this.islogged();  
  }
  
  islogged():void{     
    if(sessionStorage.getItem("logged") == "on"){
      this.logged=true;
    } else {
      this.logged=false;
    }
  }

  logOut() {
    this.auth.logOut();
  }
  get getName(): any {
    var subName = sessionStorage.getItem('name');
    if (subName) {
      subName = subName.slice(0, 12);
    } else {
      this.route.navigateByUrl('/characters');
    }
    return subName;
  }

}

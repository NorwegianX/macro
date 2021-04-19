import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@/services';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.component.html',
  styleUrls: ['./e404.component.scss'],
})
export class E404Component implements OnInit {
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.title = 'Error: 404';
  }
}

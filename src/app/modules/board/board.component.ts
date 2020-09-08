import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {
  @Input() boardValues: string[][];

  constructor() {}

  ngOnInit(): void {
  }
}

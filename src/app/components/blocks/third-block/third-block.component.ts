import { Component } from '@angular/core';

@Component({
  selector: 'app-third-block',
  templateUrl: './third-block.component.html',
  styleUrls: ['./third-block.component.scss']
})
export class ThirdBlockComponent  {
  titleThree = 'Angular 6';
  contentThree = 'Angular is a framework for building client applications in HTML and TypeScript that compiles to JavaScript.';

  titleFour = 'Material 2';
  contentFour = 'Material Design is a unified system that combines theory, resources, and tools for crafting digital experiences.';

  titleFive = 'Go';
  contentFive = 'Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.';
}

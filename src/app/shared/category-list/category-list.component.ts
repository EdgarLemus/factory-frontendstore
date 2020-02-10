import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  @Input() categories;
  @Input() categoryParentId;
  @Output() change: EventEmitter<any> = new EventEmitter();
  mainCategories;

  constructor(public categoryServices:CategoryService) { }

  public ngDoCheck() {
    this.categories = this.categoryServices.categories;
    if(this.categories && !this.mainCategories) {
      this.mainCategories = this.categories.filter(category => category.parentId == this.categoryParentId); 
    }
  }

  public stopClickPropagate(event: any){
    if(window.innerWidth < 960){
      event.stopPropagation();
      event.preventDefault();
    }    
  }

  public changeCategory(event){
    this.change.emit(event);
  }

}
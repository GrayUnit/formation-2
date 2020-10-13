import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListItem'
})
export class FilterListItemPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.firstname.toLowerCase().includes(searchText) || it.lastname.toLowerCase().includes(searchText);
    });
   }

}

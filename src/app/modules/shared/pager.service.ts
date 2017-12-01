import { Injectable } from '@angular/core';

@Injectable()
export class PagerService {

  constructor() { }
  

getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);
  let startPage:number=1;
  let endPage:number=Math.ceil(totalItems / pageSize);
  
  if(currentPage > 3){
     startPage=currentPage - 2;
  }

  if(endPage - currentPage > 2){
     endPage = currentPage + 2;
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = []
  for(let i=startPage; i<=endPage;i++){
     pages.push(i);
  }

  // return object with all pager properties required by the view
  return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
  };
}

}



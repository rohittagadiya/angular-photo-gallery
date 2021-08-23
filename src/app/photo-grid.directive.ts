import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

import $ from "jquery";

@Directive({
  selector: '[appPhotoGrid]'
})
export class PhotoGridDirective {

  @Input()
  gutter: any;

  @Input()
  columns: any;

  @Input()
  minColWidth: any;

  @Input()
  maxColWidth: any;

  @Input()
  doubleColumnWidth: any;

  @Input()
  itemClass: any;

  @Input() public data: any;

  @Output() onLayoutComplete: EventEmitter<any> = new EventEmitter();

  container: any;
  containerWidth: any;
  containeHeight: any;
  columnWidth: any;
  items: any;

  // columns of grid
  columnHeightArray: any;

  // timer for detect changes
  controlSkipper: any;
  resizeControlSkipper: any;

  // host listener for resize window
  // resizeListener: any;

  isSearchFirstTime: any = true;

  constructor(public el: ElementRef, public renderer: Renderer2) { }

  ngOnDestroy() {
    // unsubscribe event listener
    this.resizeListener();
  }

  resizeListener = this.renderer.listen('window', 'resize', () => {
    if (this.resizeControlSkipper)
      clearTimeout(this.controlSkipper)
    this.resizeControlSkipper = setTimeout(() => {
      // console.log('relayout call');
      this.reLayout();
    }, 400);
  });

  ngOnChanges(changes: any) {
    if (this.isSearchFirstTime) {
      this.isSearchFirstTime = false;
      // this is for skip first changes detect for initialieze all directive (scroll unnecessary api of second page from here so this solution is apply)
    } else {
      // console.log('change detected in data', changes.data);
      if (changes.data) {
        if (this.controlSkipper)
          clearTimeout(this.controlSkipper)

        this.controlSkipper = setTimeout(async () => {
          // console.log('relayout call');
          this.reLayout();
        }, 500);
      }
    }
  }

  reLayout() {
    // console.log('relayout');
    this.container = this.el.nativeElement;
    this.items = this.el.nativeElement.childNodes;
    this.items.forEach((element: any) => {
      $(element).css('opacity', '0');
    });
    this.layoutItem();
  }

  async layoutItem() {
    // console.log('layout');
    this.getColumnWidth();
    this.initColumnHeightarray();
    for (var i = 0; i < this.items.length; i++) {
      this.placeItem(this.items[i]);
    }
    this.items.forEach((element: any) => {
      $(element).css('opacity', '1');
    });
    // console.log('layout complete in function');
    await $(this.container).height(Math.max.apply({}, this.columnHeightArray));
    // console.log('set wrapper height', Math.max.apply({}, this.columnHeightArray));
    await this.onLayoutComplete.emit('LayoutComplete');
    // console.log('onlayout complete event emit');
  }

  initColumnHeightarray() {
    this.resetColumnHeight();
    for (var i = 0; i < this.columns; i++) {
      this.columnHeightArray.push(0);
    }
  }

  resetColumnHeight() {
    this.columnHeightArray = [];
  }

  getColumnWidth() {
    this.containerWidth = this.el.nativeElement.offsetWidth;
    this.columnWidth = Math.floor((this.containerWidth / this.columns) - this.gutter);
    if (this.columnWidth <= Number(this.minColWidth) && this.columns >= 2) {
      this.columns--;
      this.getColumnWidth();
    }
    // in below condition I check double column width
    // because column minus if card width < 200 and suppose column = 1 then it's width is increase 
    // now maximum card width is 300 and container is about 465(200 column width + 2 number of column + 2 * gutter size) something, so that, below condition is become true and add one column i.e. 2.
    // now two column card width is again < 200 thus it will gose to infonite.
    // so I check that if container have enough space to display two column then I add column othersize it will display only one column
    if (this.columnWidth >= Number(this.maxColWidth) && this.containerWidth > this.doubleColumnWidth) {
      this.columns++;
      this.getColumnWidth();
    }
  }

  calculateImageSize() {
  }

  placeItem(item: any) {
    if (item.nodeType != Node.ELEMENT_NODE) {
      // if any other element found like comment ir angular conditioned green comment then return.
      return;
    }
    var minimumColHeight = Math.min.apply({}, this.columnHeightArray),   // return column who's height is minimum
      minColIndex = $.inArray(minimumColHeight, this.columnHeightArray),
      targetIndex, position, fixMarginLeft;

    targetIndex = minColIndex;
    fixMarginLeft = (this.containerWidth - this.columnWidth * this.columns - this.gutter * (this.columns - 1)) / 2;
    if (item.getElementsByClassName(this.itemClass).length > 0) {
      var img = item.getElementsByClassName(this.itemClass);
      $(img).css('position', 'initial')
      $(img).css('height', Math.floor(($(img).height() * this.columnWidth) / $(img).width()));
      $(img).css('width', this.columnWidth);
    }
    position = {
      left: (this.columnWidth + this.gutter) * targetIndex + fixMarginLeft,
      top: this.columnHeightArray[targetIndex]
    };
    $(item).css('position', 'absolute');
    $(item).css('top', position.top);
    $(item).css('left', position.left);
    this.columnHeightArray[targetIndex] += $(item).outerHeight() + this.gutter;
    // console.log("$(item).outerHeight() : ", $(item).outerHeight());
  }

}

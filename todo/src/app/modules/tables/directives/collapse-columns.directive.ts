import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCollapseColumns]',
})
export class CollapseColumnsDirective {
  @Input() appCollapseColumns = '';
  @Input() columnsList!: { [key: string]: boolean };

  private resizeBp = 576;

  @HostListener('click')
  changeColumns(): void {
    if (window.innerWidth < this.resizeBp) {
      this.columnsList[this.appCollapseColumns] = false;
      this.collapseColumn(this.appCollapseColumns);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < this.resizeBp) {
      if (!Object.values(this.columnsList).includes(true)) {
        this.columnsList['assets'] = true;
        this.columnsList['flags'] = true;
      }
    } else {
      this.columnsList['sales'] = false;
      this.columnsList['profit'] = false;
      this.columnsList['assets'] = false;
      this.columnsList['flags'] = false;
    }
  }

  private collapseColumn(currentKey: string): void {
    const numOfColumnsCurrentlyShown = Object.values(this.columnsList).filter(
      val => val === false
    ).length;

    if (numOfColumnsCurrentlyShown > 2) {
      const keysArr = Object.keys(this.columnsList);
      const expandedColumnIndex = keysArr.findIndex(val => val === currentKey);
      const columnToCollapse =
        expandedColumnIndex + 1 > Math.floor(keysArr.length / 2)
          ? keysArr
              .slice(0, Math.floor(keysArr.length / 2))
              .find(val => this.columnsList[val] === false)
          : keysArr
              .slice(Math.floor(keysArr.length / 2))
              .find(val => this.columnsList[val] === false);

      this.columnsList[columnToCollapse || ''] = true;
    }
  }
}

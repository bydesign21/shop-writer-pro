import { Component, Input } from '@angular/core';

export interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'swp-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
}

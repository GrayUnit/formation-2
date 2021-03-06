import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAddOrderComponent } from './pages/page-add-order/page-add-order.component';
import { PageEditOrderComponent } from './pages/page-edit-order/page-edit-order.component';
import { PageListOrderComponent } from './pages/page-list-order/page-list-order.component';
import { PageRecapOrderComponent } from './pages/page-recap-order/page-recap-order.component';
import { PageTestComponent } from './pages/page-test/page-test.component';

const routes: Routes = [
  { path: "", component: PageListOrderComponent },
  {
    path: "add",
    component: PageAddOrderComponent,
    data: {title: "Commandes", subtitle: "Ajout d'un commande"}
  },
  { path: "edit/:id", component: PageEditOrderComponent },
  { path: "recap/:id", component: PageRecapOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'starter',
  loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
},
{
  path: 'serach-results',
},
  { path: 'gallery', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule) },
  { path: 'invoice', loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) },]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule { }

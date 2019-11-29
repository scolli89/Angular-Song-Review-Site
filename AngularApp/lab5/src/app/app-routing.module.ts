import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//first import the components
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { TopSongsComponent } from './top-songs/top-songs.component';
import { SearchsongComponent } from './searchsong/searchsong.component';
import { SPDMCAComponent } from './spdmca/spdmca.component';


//then add them to the routes array. so they can be accessed
const routes: Routes = [ // routes array 
  { path: '', component: HomeComponent }, // accesesd by default
  { path: 'list', component: ListComponent },//accessed at /list
  { path: 'top-songs',component: TopSongsComponent },
  { path: 'searchsong',component: SearchsongComponent },
  { path: 'spdmca',component: SPDMCAComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

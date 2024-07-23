import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { ThreadComponent } from './components/thread/thread.component';
import { RepliesListComponent } from './components/replies-list/replies-list.component';
import { ReplyComponent } from './components/reply/reply.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ScoresComponent } from './components/scores/scores.component';
import { ReviewSchemaComponent } from './components/review-schema/review-schema.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsListComponent,
    ThreadComponent,
    RepliesListComponent,
    ReplyComponent,
    CalculatorComponent,
    ScoresComponent,
    ReviewSchemaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

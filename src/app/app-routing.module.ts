import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashBoardComponent } from './pages/admin/admin-dash-board/admin-dash-board.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashBoardComponent } from './pages/user/user-dash-board/user-dash-board.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [

  {
    path : '',
    component : HomeComponent,
    pathMatch: 'full',
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full',
  },

  {
    path : 'login',
    component : LoginComponent,
    pathMatch:'full',
  },
  {
    path : 'admin',
    component : AdminDashBoardComponent,
   // pathMatch:'full',
    canActivate : [AdminGuard],
   children : [
     {
       path : '',
       component : WelcomeComponent,
     },
     {
       path :'profile',
       component : ProfileComponent,
     },
     {
      path :'categories',
      component : ViewCategoriesComponent,
     },
     {
      path :'add-category',
      component : AddCategoryComponent,
     },
     {
       path : 'quizzes',
       component : ViewQuizzesComponent,
     },
     {
      path :'add-quiz',
      component : AddQuizComponent,
     },
     {
      path :'quiz/:qid',
      component : UpdateQuizComponent,
     },
     {
      path :'view-questions/:qid/:title',
      component : ViewQuizQuestionsComponent,
     },
     {
      path :'add-question/:qid/:title',
      component : AddQuestionComponent,
     },
   ]
  },
  {
    path : 'user-dashboard',
    component : UserDashBoardComponent,
    //pathMatch:'full',
    //canActivate : [NormalGuard],
    children :[
      {
        path : ':catId',
        component : LoadQuizComponent,
      },
      {
        path : 'instructions/:qid',
        component : InstructionsComponent,
      },
    ]
  },
  {
    path : 'start/:qid',
    component : StartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

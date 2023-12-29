import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import dataBase from '../../../assets/data/dataBase.json'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  tittle:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []

  questionIndex:number = 0
  questionMaxIndex:number = 0

  result:string = ""
  finished:boolean = false

  ngOnInit():void{
    if(dataBase){
      this.tittle = dataBase.title
      this.questions = dataBase.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length      
    }
  }

  async checkResults(){
    const result = this.answers.reduce((prev, curr, i, arr) => {

      if(
        arr.filter(item=>item===prev).length >
        arr.filter(item=>item===curr).length
      )return prev
      else return curr

    })

    return result
  }

  async nextQuestion(){
    if(this.questionIndex+1 < this.questionMaxIndex){
      this.questionIndex++ 
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      this.finished = true;
      const finalResult:string = await this.checkResults() 
      this.result = dataBase.results[finalResult as keyof typeof dataBase.results]
    }
    
  }

  playerChoice(op:string){
    this.answers.push(op)
    this.nextQuestion()
  }
}

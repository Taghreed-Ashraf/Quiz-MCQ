///<reference path="../typings/globals/jquery/index.d.ts" />

import { Quiz } from './quiz.js';

export class Settings {
  constructor() {
    this.categoryElement = document.getElementById("category");
    this.difficultyElement = document.getElementsByName('difficulty');
    this.numberOfQuestions = document.getElementById('numberOfQuestions');

    this.startBtn = document.getElementById('startBtn');
    this.startBtn.addEventListener('click' , this.startQuiz.bind(this))

  }

  async startQuiz()
  {
    let category = this.categoryElement.value
    let numOfQuestion = this.numberOfQuestions.value 
    let difficulty = [...this.difficultyElement].filter( element => element.checked)[0].value;

    let Api = `https://opentdb.com/api.php?amount=${numOfQuestion}&category=${category}&difficulty=${difficulty}`
    let response = await this.fetchApi(Api)
    if(response.length > 0)
    {
      $('#setting').fadeOut(500 ,  () => {
        $('#quiz').fadeIn(500);
      })
      let quiz = new Quiz(response)
    }

  }

  async fetchApi(Api)
  {
    let response =await fetch(Api)
    let result = await response.json()
    return result.results;
  }
}

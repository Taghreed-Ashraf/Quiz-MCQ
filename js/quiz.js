export class Quiz {
  constructor (response)
  {
    this.response = response;
    this.numofQues = response.length

    this.nextBtn = document.getElementById('nextBtn')
    this.nextBtn.addEventListener('click' , this.nextQuestion.bind(this))

    this.currenQuetion = 0
    this.showQuestion();

    this.score = 0;
  }


  showQuestion ()
  {
    let question = document.getElementById('question')
    question.innerHTML = this.response[this.currenQuetion].question;
    document.getElementById('currentQuestion').innerHTML = this.currenQuetion +1
    document.getElementById('totalNumberOfQuestions').innerHTML = this.numofQues;
    let answers = [this.response[this.currenQuetion].correct_answer , ...this.response[this.currenQuetion].incorrect_answers]

    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      while (currentIndex != 0) {
    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }
    shuffle(answers)
    
    let cartona = '';
    for (let i=0 ; i< answers.length ;i++)
    {
      cartona +=
      `
      <div class="pb-2">
      <label class="form-check-label">
      <input type="radio" class="form-check-label" name="answer" value="${answers[i]}">
      ${answers[i]}</label>
      </div>
      `
    }
    document.getElementById('rowAnswer').innerHTML = cartona;
  }

  nextQuestion ()
  {
    let userAnswerElement = document.getElementsByName('answer')
    if([...userAnswerElement].filter(element => element.checked).length == 1)
    {
      $('#alert').fadeOut(200)
      this.checkUserAnswer()
      this.currenQuetion++;
      if(this.currenQuetion < this.numofQues)
      {
      this.showQuestion()
      }
      else
      {
        $('#quiz').fadeOut(500 , () => {
          $('#finish').fadeIn(500)
          document.getElementById('score').innerHTML = this.score;
          document.getElementById('tryBtn').addEventListener('click' , ()=>{
            $('#finish').fadeOut(300 , ()=> {
              $('#setting').fadeIn(300 , ()=> {
                location.reload();
              })
              })
            })
          })
      }
    }
    else
    {
      $('#alert').fadeIn(300)
    }
  }

  checkUserAnswer()
  {
    let userAnswerElement = document.getElementsByName('answer')
    let userAnswer = [...userAnswerElement].filter(element => element.checked)[0].value
    if(userAnswer == this.response[this.currenQuetion].correct_answer)
    {
      this.score++;
      $('#correct').fadeIn(300 , () => {
        $('#correct').fadeOut(500)
      })
    }
    else 
    {
      $('#inCorrect').fadeIn(300 , () => {
        $('#inCorrect').fadeOut(500)
      })
    }
  }
}
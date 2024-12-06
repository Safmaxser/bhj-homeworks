const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const urlPollPost = 'https://students.netoservices.ru/nestjs-backend/poll';
const xhrPost = new XMLHttpRequest;
xhrPost.responseType = 'json';
const urlPollGet = 'https://students.netoservices.ru/nestjs-backend/poll';
let xhrGet = new XMLHttpRequest();
xhrGet.responseType = 'json';
xhrGet.open('GET', urlPollGet);
xhrGet.send();

xhrGet.addEventListener('load', () => {
  if (xhrGet.readyState === xhrGet.DONE) {
    if (xhrGet.status === 200) {     
      const responsePoll = xhrGet.response;
      if (responsePoll instanceof Object) {
        const btnAnswerList = pollAnswers.querySelectorAll('.poll__answer');
        btnAnswerList.forEach((element) => {
          element.remove();
        });
        pollTitle.innerText = responsePoll.data.title;        
        responsePoll.data.answers.forEach((answer, index) => {          
          const btnAnswer = document.createElement('button');
          btnAnswer.classList.add('poll__answer');
          btnAnswer.innerText = answer;
          pollAnswers.appendChild(btnAnswer);
          btnAnswer.addEventListener('click', () => {    
            xhrPost.open('POST', urlPollPost);
            xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');        
            xhrPost.send(`vote=${responsePoll.id}&answer=${index}`);
            alert('Спасибо, ваш голос засчитан!');
          });
        });        
      }
    } else {
      xhrGet.open('GET', urlPollGet);
      xhrGet.send();
    }
  }
});

xhrPost.addEventListener('load', () => {
  if (xhrPost.readyState === xhrPost.DONE) {
    if (xhrPost.status === 201) { 
      const responsePoll = xhrPost.response;
      if (responsePoll instanceof Object) { 
        const btnAnswerList = pollAnswers.querySelectorAll('.poll__answer');
        btnAnswerList.forEach((element) => {
          element.remove();
        });
        responsePoll.stat.forEach(answer => {
          pollAnswers.insertAdjacentHTML('beforeEnd', `
            <div class="poll__answer">
              ${answer.answer}: <sapn class="amount">${answer.votes}</sapn>
            </div>
            `);          
        });        
      }
    }
    setTimeout(() => {
      xhrGet.open('GET', urlPollGet);
      xhrGet.send();
    }, 1500);
  }
});
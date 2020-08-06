class FillInBlank extends Question{
  constructor(type,id,content,answers){
    super(type,id,content,answers);

  }

  render(index){

    return `
    <div>
      <p> Câu ${index}: ${this.content}</p>
      <input id="question-${this.id}" type = "text" class="form-control">
    </div>
    `;
  }

  checkExact(){
    //Dom tới input, thông qua id lấy value, 
    const value = document.getElementById(`question-${this.id}`).value; 

    //so sánh nếu value === content => true, còn ko thì false
    if(value === this.answers[0].content) {
      return true;
    }
    return false;

  }
  
}


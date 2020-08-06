class FillInBlank extends Question{
  constructor(type,id,content,answers){
    super(type,id,content,answers);

  }

  render(){

    return `
    <div>
      <p> Câu 1: ${this.content}</p>
      <input type = "text" class="form-control">
    </div>
    `;
  }
  
}


// module độc lập, do đó phải export ra để file khác dùng
// export class Question{
  class Question{
  constructor(type,id,content,answers){
    this.questionType = type;
    this.id = id;
    this.content = content;
    this.answers = answers;

  }
  render(){}
  checkExact(){}
}

export default Question;

// const newQuestion = new Question(1,10,"abcefdfasdfsdfsd",'ok kết quả')
// console.log(newQuestion)
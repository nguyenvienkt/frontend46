class MultipleChoice extends Question {
	constructor(type, id, content, answers) {
		super(type,id,content,answers)
	}
	render(index) {
    var answersHTMLContent = "";
    // duyệt mảng đáp án là mảng và in ra giao diện
    // phải có id câu hỏi vào name input 
    for(var i=0;i<this.answers.length;i++){
      answersHTMLContent += `
      <div>
      <input value=${this.answers[i]._id} type="radio" name="question-${this.id}">
      <label>${this.answers[i].content}</label> 
      </div>
      `
    }
    return `
    <div>
    <p>Câu ${index}:${this.content}</p>
    ${answersHTMLContent}
    </div>
    `
  }
	checkExact() {
    /*1. người dùng chọn ô nào thì lấy id của đáp án value=${this.answers[i]._id} đầu tiên dom tới 4 input đáp án. kiểm tra ô nào có thuộc tính checked === true ra được id của đáp án */
    const inputList = document.querySelectorAll(`input[name="question-${this.id}"]`);

    // => inputList = [input, input, input, input] 
    let anwsId;
    for(let input of inputList){
      if(input.checked === true){
        anwsId = input.value;
      }
    }

    /*
    2. Tìm trong danh sách đáp án, câu nào có id === id lấy được từ input sau đó check exact true thì đúng, false thì sai
    */
    for(let answer of this.answers){
      //answer là đối tượng đáp án
      if(answer._id === anwsId){
        return answer.exact
      }
    }



    
  }
}




// const newMultipleChoice = new MultipleChoice(
// 	1,
// 	10,
// 	'Hôm nay là thứ mấy?',
//   '[{content:"Thứ 3"},{content:"Thứ 4"},{content:"Thứ 5"},{content:"Thứ 6"} ]'
// )
// // console.log(newMultipleChoice);
// console.log(newMultipleChoice.render())

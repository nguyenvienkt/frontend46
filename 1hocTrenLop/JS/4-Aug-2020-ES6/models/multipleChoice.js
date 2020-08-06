class MultipleChoice extends Question {
	constructor(type, id, content, answers) {
		super(type,id,content,answers)
	}
	render() {
    var answersHTMLContent = "";
    // duyệt mảng đáp án là mảng và in ra giao diện 
    for(var i=0;i<this.answers.length;i++){
      answersHTMLContent += `
      <div>
      <input type="radio">
      <label>${this.answers[i].content}</label> 
      </div>
      `
    }
    return `
    <div>
    <p>Câu 1:${this.content}</p>
    ${answersHTMLContent}
    </div>
    `
  }
	checkExact() {}
}

// const newMultipleChoice = new MultipleChoice(
// 	1,
// 	10,
// 	'Hôm nay là thứ mấy?',
//   '[{content:"Thứ 3"},{content:"Thứ 4"},{content:"Thứ 5"},{content:"Thứ 6"} ]'
// )
// // console.log(newMultipleChoice);
// console.log(newMultipleChoice.render())

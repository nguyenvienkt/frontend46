/**
 * Người tạo: DEV
 * Chức năng:
 *    1. Lấy và hiển thị danh sách câu hỏi cho người dùng
 *    2. Cho người dùng làm, tính điểm, alert kết quả
 */
// tạo biến mảng để lưu data lấy từ backend về (và thiếu method - phương thức)
var questionList = [];

 // Function 1: Lấy danh sách câu hỏi. Sau khi lấy xong thì gọi hàm chạy luôn
 const fetchQuestions = function(){
   axios({
     url:'../DeThiTracNghiem.json',
     method:'GET'
   }).then(function(res){
    // lấy data thành công
    // console.log(res.data)
    // Sau khi lấy data từ backend thì phải map ds câu hỏi ra danh sách câu hỏi của mình bằng cách gọi hàm mapData
    mapData(res)

    // chờ lấy dữ liệu thành công thì chạy hàm render in ra màn hình
    renderQuestions();

   }).catch(function(err){
    console.log(err)
   })
 }

 

 // function 2: chuyển data của backend thành data của mình để dùng thêm method
 const mapData = function(res){
  for (let currentQuestion of res.data) {
		// tiến hành kiểm tra res.data[i].questionType = 1 => res.data[i] => new MultipleChoice
		// tiến hành kiểm tra res.data[i].questionType = 2 => res.data[i] => new FillInBlank

		var newQuestion
		if (currentQuestion.questionType === 1) {
			newQuestion = new MultipleChoice(
				currentQuestion.questionType,
				currentQuestion._id,
				currentQuestion.content,
				currentQuestion.answers
			)
		} else {
			newQuestion = new FillInBlank(
				currentQuestion.questionType,
				currentQuestion._id,
				currentQuestion.content,
				currentQuestion.answers
			)
		}

    questionList.push(newQuestion)
    
		// console.log(res.data)
		// console.log(questionList)
	}
 }


//  const mapData = function(res){
//   for (var i = 0; i < res.data.length; i++) {
// 		// tiến hành kiểm tra res.data[i].questionType = 1 => res.data[i] => new MultipleChoice
// 		// tiến hành kiểm tra res.data[i].questionType = 2 => res.data[i] => new FillInBlank

// 		const currentQuestion = res.data[i]
// 		var newQuestion
// 		if (currentQuestion.questionType === 1) {
// 			newQuestion = new MultipleChoice(
// 				currentQuestion.questionType,
// 				currentQuestion._id,
// 				currentQuestion.content,
// 				currentQuestion.answers
// 			)
// 		} else {
// 			newQuestion = new FillInBlank(
// 				currentQuestion.questionType,
// 				currentQuestion._id,
// 				currentQuestion.content,
// 				currentQuestion.answers
// 			)
// 		}

//     questionList.push(newQuestion)
    
// 		// console.log(res.data)
// 		// console.log(questionList)
// 	}
//  }



// function 3: Hiện danh sách câu hỏi ra màn hình
const renderQuestions = function(){
  var htmlContent = '';
  for(let i in questionList){//i sẽ ra dạng chuỗi
    const currentQuestion = questionList[i];
    htmlContent += currentQuestion.render(+i+1);//index từ 1 mà i thì từ 0. và chuyển từ i chuỗi sang số nên thêm +i
  }

  document.getElementById('questionList').innerHTML = htmlContent

}

// function 4: chấm điểm 
const submit = () => {
  let result = 0;

  /**
   * 1. duyệt mảng câu hỏi, lấy ra từng câu hỏi, gọi checkExact(), câu nào return true thì result + 1
   * 2. số lượng câu đúng là result/questionList.length
   */
  for(let question of questionList){ // duyệt mảng
    if(question.checkExact() ) result++;
  }

  // console.log('Kết quả: ', `${result}/${questionList.length}`);
  console.log('Kết quả: ', result + '/' + questionList.length);

};

// gắn sự kiện vào nút button và gọi là callback function. 
// truyền 1 hàm vào trong 1 hàm khác gọi dưới dạng tham số là callback function
// hàm addEventListener chạy có tham số là 1 hàm submit, hàm submit gọi là callback
document.getElementById('btnSubmit').addEventListener('click',submit)

// ngay khi load page thì chạy hàm fetchQuestion() để lấy dữ liệu 
fetchQuestions()

// const renderQuestions = function(){
//   var htmlContent = '';
//   for(var i = 0;i < questionList.length;i++){
//     const currentQuestion = questionList[i];
//     htmlContent += currentQuestion.render(i+1);//index từ 1 mà i thì từ 0
//   }

//   document.getElementById('questionList').innerHTML = htmlContent

// }






//  // 4. destructuring ví dụ
//  const student = {name:"Phước", age: 20};

//  const {name, age} = student // không phải viết student.name, student.age
//  // const name = student.name
//  // const age = student.age

//  console.log(name,age)

// // 5. for of and for in 
// var arr = ['a', 'b', 'c'];

// // for of
// // duyệt từ đầu tới cuối mảng, mỗi lần duyệt lấy ra 1 item
// for (let item of arr){
//   console.log(item)
// }

// // for in
// // duyệt lấy ra số index, vị trí của của các phần tử trong object
// for(let i in arr){
//   console.log(i)
// }

// // 6. default parameter 
// const calcSum (a=1,b=1) => {console.log(a+b);}
// calcSum(1) // chỉ truyền a và b không truyền là undefinded => NaN
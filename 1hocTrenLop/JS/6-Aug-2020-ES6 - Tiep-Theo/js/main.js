/**
 * Người tạo: DEV
 * Chức năng:
 *    1. Lấy và hiển thị danh sách câu hỏi cho người dùng
 *    2. Cho người dùng làm, tính điểm, alert kết quả
 */
// import file js khác và gọi nhiều 
import {FillInBlank,showMessage} from '../models/fillInBlank.js'
import {MultipleChoice} from '../models/multipleChoice.js'

showMessage()

// tạo biến mảng để lưu data lấy từ backend về (và thiếu method - phương thức)
var questionList = []

// Function 1: Lấy danh sách câu hỏi. Sau khi lấy xong thì gọi hàm chạy luôn
const fetchQuestions = function () {
	axios({
		url: '../DeThiTracNghiem.json',
		method: 'GET',
	})
		.then(function (res) {
			// lấy data thành công
			// console.log(res.data)
			// Sau khi lấy data từ backend thì phải map ds câu hỏi ra danh sách câu hỏi của mình bằng cách gọi hàm mapData
			mapData(res)

			// chờ lấy dữ liệu thành công thì chạy hàm render in ra màn hình
			renderQuestions()
		})
		.catch(function (err) {
			console.log(err)
		})
}

// function 2: chuyển data của backend thành data của mình để dùng thêm method
const mapData = function (res) {
  // gán mảng questionList bằng hàm map
  questionList = res.data.map((currentQuestion) =>{
    const {questionType,_id,content,answers} = currentQuestion;
    // toán tử 3 ngôi, tương tự cấu trúc if, else nếu thì
    return questionType === 1
			? new MultipleChoice(questionType, _id, content, answers)
			: new FillInBlank(questionType, _id, content, answers)
    // if(questionType === 1){
    //   return new MultipleChoice(questionType,_id,content,answers)
    // } else {
    //   return new FillInBlank(questionType,_id,content,answers)
    // }
  });

  // console.log(questionList)

  /*
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
  */
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
const renderQuestions = function () {
	var htmlContent = ''
	for (let i in questionList) {
		//i sẽ ra dạng chuỗi
		const currentQuestion = questionList[i]
		htmlContent += currentQuestion.render(+i + 1) //index từ 1 mà i thì từ 0. và chuyển từ i chuỗi sang số nên thêm +i
	}

	document.getElementById('questionList').innerHTML = htmlContent
}

// function 4: chấm điểm
const submit = () => {
	let result = 0

	/**
	 * 1. duyệt mảng câu hỏi, lấy ra từng câu hỏi, gọi checkExact(), câu nào return true thì result + 1
	 * 2. số lượng câu đúng là result/questionList.length
	 */
	for (let question of questionList) {
		// duyệt mảng
		if (question.checkExact()) result++
	}

	// console.log('Kết quả: ', `${result}/${questionList.length}`);
	console.log('Kết quả: ', result + '/' + questionList.length)
}

// gắn sự kiện vào nút button và gọi là callback function.
// truyền 1 hàm vào trong 1 hàm khác gọi dưới dạng tham số là callback function
// hàm addEventListener chạy có tham số là 1 hàm submit, hàm submit gọi là callback
document.getElementById('btnSubmit').addEventListener('click', submit)

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

// 7. Spread operator
// Ví dụ
let student1 = {name:"Hiếu"}
let student2 = student1;

student2.name = 'Dũng';
// khi console ra thì student1 & student2 cùng tên là dung do đang tham chiếu cùng nhau
console.log(student1,student2)

// sửa như sau trong ES5
let student3 = { name: 'Hùng' }
let student4 = Object.assign({},student3); // copy toàn bộ student3 bỏ vào student4

student4.name = 'Mạnh';
console.log(student3,student4)

// Copy Object: sửa như sau ES6 theo object
let student5 = { name: 'Nam' }
let student6 = {...student5}; // copy toàn bộ 

student6.name = 'An';
console.log(student5,student6)

// Copy array: như sau ES6 khi có mảng
let arr1 = [1,2,3,4];
// let arr2 = arr1;
let arr2 = [...arr1]; // copy toàn bộ arr2 từ arr1 nhưng tách biệt hoàn toàn

arr2.push('5 mới nha');
console.log(arr1,arr2)

// Nối Mảng, hoặc object
let mang1 = [1,2,3];
let mang2 = [4,5,6];

let mang3 = [...mang1, ...mang2];

console.log(mang3)

// Nối Object
let SV1 = {name: "Một"}
let SV2 = {age: 20}

let SV = {...SV1,...SV2};
console.log(SV)


// 8.----------------------Rest Parameters---------------------------
/** */
const calcSum = (...nums) => {
  // gom tất cả tham số người dùng truyền vào 1 mảng
console.log(nums)
let sum = 0;
for (let num of nums){
  sum += num;
}
console.log(sum)
}

calcSum(1)
calcSum(1,2)
calcSum(1,2,3)

//9. ---------------------Map----------------------------
/** Hàm chuyển từ mảng A ra mảng B gọi là hàm map và số lượng phần tử bảo toàn */
// cho mang đầu như sau
let so = [1,2,3,4]
// làm sao trả ra mảng là  = [2,3,4,5]
// Cách cũ là
// let soNew = [];
// for(let num of so) {
//   soNew.push(num+1)
// }
// console.log(soNew)

// Làm theo ES6
let newSo = so.map((so)=>{
  return so + 1
  
})
console.log(newSo)

// 10. --------------------Hàm filter - lọc -----------------------

let manga = [1,2,3,4,5,6,7];
// truyền thống là duyệt mảng, số nào chia hết cho 2 có dư thì push vào mảng mới
// ES6 thì dùng hàm filter là loại hàm callback
let soLe = manga.filter((item)=>{
  // điều kiện lọc là chia lấy dư cho 2 bằng 1 (số lẻ)
  return item % 2 === 1;
})

//mảng mới là lọc số lẻ thôi=> [1,3,5,7]
console.log(soLe)

// 11. ------------------Hàm find và findIndex --------------------------
const students = [
	{ id: 1, name: 'Quang' },
	{ id: 2, name: 'Minh' },
	{ id: 3, name: 'Chính' },
]

// => tìm student có id là 1
// ES6 dùng hàm find trả về đối tượng. duyệt mảng và mỗi lần duyệt sẽ chạy 1 hàm
const findSV = students.find((student) => student.id === 2); // arrow function viết gọn khi return 1 kết quả
const findSVIndex = students.findIndex((student) => student.id === 2); 
//   return student.id === 1;
// });

console.log(findSV,findSVIndex)

// hàm findIndex thì chỉ trả về vị trí của đối tượng thỏa điều kiện
// Tạo một lớp employee
// Chức năng
/**
 * 1. Thêm nhân viên mới vào danh sách
 * 2. Hiển thị bảng danh sách nhân viên
 * 3. Xóa nhân viên mới trong danh sách
 * 4. Cập nhật thông tin nhân viên trong danh sách
 * 5. Tìm kiếm nhân viên theo tên hoặc theo mã
 * 6. Validate thông tin
 */


// XÂY DỰNG LỚP ĐỐI TƯỢNG BẰNG PROTOTYPE
function Employee(lastName, firstName, id, birthday, position) {
	// vì lớp đối tượng prototype
	this.lastName = lastName
	this.firstName = firstName
	this.id = id
	this.birthday = birthday
	this.position = position
	this.calcSalary = function () { //Expression function
		// hàm tính lương theo sếp, trưởng phòng, nhân viên
		// nhân viên 1000*1
		// trưởng phòng 1000*3
		// sếp 1000*5
		if (this.position === 'Sếp') return 5000 // return ko cần else if
		if (this.position === 'Trưởng phòng') return 3000
		return 1000
	}
}
// khai báo mảng chứa toàn bộ object mã nhân viên
var employeeList = [] // vì sau này sẽ gán lại giá trị nên mình để var




// * 1. Thêm nhân viên mới vào danh sách
// khai báo hàm Expression function vì tránh cơ chế hoisting

const addEmployee = function () {
	
	// 1. Lấy thông tin nhân viên mà user nhập vào Form, dom
	const lastName = document.getElementById('ho').value.trim();
	const firstName = document.getElementById('ten').value.trim();
	const id = document.getElementById('msnv').value
	const birthday = document.getElementById('datepicker').value
	const position = document.getElementById('chucvu').value

	var isValid = true;
// kiểm tra dữ liệu
	// || --> check đúng khi một vế đúng
	// && --> check đúng khi tất cả đều đúng
	// &= nghĩa là đúng thêm với cộng dồn điều kiện
	// a &= b nghĩa là a = a & c

	isValid &= 
	checkRequired(lastName, 'lastNameError', '*Vui lòng nhập họ') &&
	checkLength(lastName,'lastNameError',"*Vui lòng nhập độ dài họ đúng",1,10);
	
	isValid &= 
	checkRequired(firstName,'firstNameError',"*Vui lòng nhập tên") &&
	// check tiếng việt
	checkString(firstName, 'firstNameError',"*Tên không đúng định dạng");

	if(isValid) {
	// 2. Khởi tạo object và lưu thông tin lấy được từ form vào object đó
	// 2.1 Kiểm tra tồn tại của nhân viên thêm vào
	for (var i = 0; i < employeeList.length; i++) {
		if (id === employeeList[i].id) {
			alert('Mã nhân viên đã tồn tại')
			return
		}
	}
	// Sau khi kiểm tra tồn tại xong thì cho vào trong list
	const newEmployee = new Employee(lastName, firstname, id, birthday, position)

	console.log(newEmployee)
	// 3. Bỏ object nhân viên vào danh sách mảng
	employeeList.push(newEmployee)
	
	// Lưu danh sách nhân viên xuống local storage của browser
	saveData();

	// 4. Render giao diện mỗi lần add 1 nhân viên mới
	renderEmployees();
		
	}




}

	



// 2. Hiển thị danh sách nhân viên ra ngoài màn hinh
// Phải tạo HTML bằng JavaScript
// function 2: tạo giao diện bảng nhân viên
const renderEmployees = function(arr){
	var htmlContent = '';
	arr = arr || employeeList; // nếu có truyền arr thì lấy arr còn không truyền thì là employeeList để khi gọi renderEmployees không cần truyền arr là renderEmployees();
	// cách viết truyền thống
	// if(!arr) {
	// 	arr = employeeList;
	// }
	for(var i = 0; i < arr.length; i++) {
		const currentEmp = arr[i];
		htmlContent +=
			// '<tr><td>1</td><td>Vien</td><td>123</td><td>1/1/2000</td><td>Sếp</td><td>1000</td></tr>'
			` 
			<tr>
			<td>${i + 1}</td>
			<td>${currentEmp.lastName + ' ' + currentEmp.firstName}</td>
			<td>${currentEmp.id}</td>
			<td>${currentEmp.birthday}</td>
			<td>${currentEmp.position}</td>
			<td>${currentEmp.calcSalary()}</td>
			<td>
			<button class="btn btn-danger" onclick ="deleteEmpl('${
				currentEmp.id
			}')">Xóa</button>
			<button class="btn btn-info" onclick = "getUpdateEmpl('${currentEmp.id}')">Cập Nhật</button>
			</td>
			</tr>`

	}
	console.log(htmlContent);
	document.getElementById('tbodyEmployees').innerHTML = htmlContent;

}

// function 3: Xóa nhân viên khỏi danh sách
const deleteEmpl = function(id){
	//input: mã nhân viên
	// process: 1. Tìm vị trí => xóa => render giao diện
	const index = findById(id); 
	console.log(id, index);

	// kiểm tra nếu tìm được thì xóa
	if(index !== -1){
		employeeList.splice(index,1);
		renderEmployees();
		// saveData(); --> xóa local 
	}
	
};

// function 4: cập nhật thông tin nhân viên

const getUpdateEmpl = function(id){
	const index = findById(id);
	if(index !== -1) {
		const updateUser = employeeList[index];

		//lấy toàn bộ thông tin của nhân viên cần update lên form
		document.getElementById('ho').value = updateUser.lastName;
		document.getElementById('ten').value = updateUser.firstName;
		document.getElementById('msnv').value = updateUser.id;
		document.getElementById('datepicker').value = updateUser.birthday;
		document.getElementById('chucvu').value = updateUser.position;

		//disable ô msnv để user không sửa được
		document.getElementById('msnv').setAttribute("disabled",true);

		// ẩn nút thêm và hiện nút update
		document.getElementById('btnAdd').style.display = "none"
		document.getElementById('btnUpdate').style.display = "block"
	}
}

const updateUser = function(){
	const lastName = document.getElementById('ho').value
	const firstname = document.getElementById('ten').value
	const id = document.getElementById('msnv').value
	const birthday = document.getElementById('datepicker').value
	const position = document.getElementById('chucvu').value

	//tạo đối tượng mới
	const updatedEmployee = new Employee(lastName, firstname, id, birthday, position);

	// dựa vào id không đổi, tìm nhân viên cũ nằm ở đâu trong mảng,
	// đè nhân viên mới vào
	const index = findById(id);
	if(index !== -1) {
		employeeList[index] = updatedEmployee;
		renderEmployees();
		
	//xóa disable ô msnv để user có thể edit cho lần tiếp theo
		document.getElementById('msnv').removeAttribute("disabled");

	// hiện nút add và ân nút cập nhật
	document.getElementById('btnAdd').style.display = "block"
	document.getElementById('btnUpdate').style.display = "none"

	// clear form
		document.getElementById('btnReset').click();// tức là sẽ gắn click nút này cho user để reset
	}



}

// hàm tìm nhân viên theo ID hoặc tên
const findEmpl = function(){
	const results = [];
//1. Lấy keyword user nhập vào
const keyword = document.getElementById('txtSearch').value;

for(var i=0;i<employeeList.length; i++) {
	const currentEmpl = employeeList[i];
	const fullName = currentEmpl.lastName + " " + currentEmpl.firstName;
	// đổi tiếng việt sang tiếng anh
	const convertedFullName = nonAccentVietnamese(fullName.toLowerCase())
	const convertedKeyword = nonAccentVietnamese(keyword.toLowerCase().trim())

	if(keyword === currentEmpl.id){
		results.push(currentEmpl);
		break;
	} else if (convertedFullName.indexOf(convertedKeyword) !== -1){
		results.push(currentEmpl);
		// hàm trim() loại bỏ khoảng trắng hai đầu
		// hàm toLowerCase giúp so sánh loại bỏ chữ hoa thường
	}
}
// hiển thị danh sách nhân viên tìm được
renderEmployees(results);

//output: 
}





// function: tìm vị trí theo id
const findById = function(id){
	for(var i = 0;i<employeeList.length;i++){
		
		if(employeeList[i].id === id){
			return i;
		}
	}
	return -1; // thường thì không tìm ra thì trả về -1 là không tìm thấy, có thể bất cứ return gì ở đây
}

// function: save data to local storage tối đa 5MB
const saveData = function(){
	// chuyển sang chuổi JSON
	const employeeListJSON = JSON.stringify(employeeList);
	console.log(employeeListJSON);
	localStorage.setItem('employees',employeeListJSON);
}

const getData = function (){

		/**
	 * 1. Mô hình
	 * 2. API là Application Programing Interface là cách mà 2 hệ thống nói chuyện với nhau
	 * Là tập hợp cách hướng dẫn sử dụng trong trường hợp frontend giao tiếp với backend thì API chính
	 * là đường dẫn
	 * 3. HTTP method là phương thức GET, POST, PUT, DELETE, PATCH
	 * 4. axios là thư viện giúp chúng ta call API
	 * 5. Asynchronous (bất đồng bộ)
	 * 6. Thực hành
	 * 7. Promise ()
	 */


	

	 // -----------------------demo asynchronous (Bất đồng bộ) -----------------------------------
	//  Thứ tự xử lý javascript là trên dưới, trái phải
// 	const showMessage = function (){
// 		console.log ("This is message");
// 	}
// 	console.log('a');
// 	setTimeout(showMessage,550); // là hàm bất đồng bộ
// 	console.log('c');
// // Thứ tự hàm setTimeout sẽ chạy sau hàm khác. Do đó thứ tự ra là a, c rồi This is message 

// Link api https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee

// Dùng axios để call lên api của backend lấy danh sách nhân viên có sẵn
// hàm axios config truyền vào object và axios là hàm bất đồng bộ. Sau khi chạy xong thì
// sẽ trả về đối tượng object promise (pending, result, reject)
const fetchEmplPromise = axios({
	url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee',
	method:'GET',

});

// resolver
const resolver = function (res) {
	// console.log(res.data);
	// luôn luôn code trong resolver để lấy dữ liệu từ backend về rồi xử lý
	for (i = 0; i < res.data.length; i++) {
		const currentEmp = res.data[i]
		const newEmployee = new Employee(
			currentEmp.lastName,
			currentEmp.firstName,
			currentEmp.id,
			currentEmp.birthday,
			currentEmp.position
		)
		employeeList.push(newEmployee)
	}
	renderEmployees() // lấy dữ liệu cũ hiện lên html cho họ thấy

};

// rejecter
const rejecter = function(err){
	console.log(err);
}

console.log('1');
// promise có 2 phương thức thành công thì then(), thất bại thì chạy vào catch()
fetchEmplPromise.then(resolver).catch(rejecter);
console.log('2');



// JavaScript chạy ở đâu? chạy ở browser. 
// 1. Tại sao browser xử lý được javascript
// --> Mỗi browser có bộ JS engine riêng như google chrome có V8 (viết bằng C++), monkey  
// trong JS engine có 3 bộ con (Parser, Transfer, execute)
// - Đầu tiên bộ parser đọc code nếu có lỗi thì báo lỗi thì báo lỗi và dừng
// - Sau đó nếu không có lỗi thì chuyển qua bộ Transfer chuyển đổi từ code sang mã máy 101010
// - Sau đó thì bộ Execute thì xử lý mã máy đó 
// * Cái mình quan tâm là parser bao gồm bộ khung xử lý code: callstack (xử lý code javascript, nếu có bất đồng bộ thì chuyển qua bên webAPI serser ), webAPI Server, callback queue, event loop (quan sát call stack, nếu trống thì sẽ đưa từ callback queue đưa lên chạy)














// 	// lúc vào trang
// 	/**
// 	 * 1. Xuống local lấy danh sách lên
// 	 * 2. Chuyển từ chuổi ra mảng (lúc lưu là lưu chuỗi do đó lấy là chuỗi, mình phải chuyển qua mảng)
// 	 * 3. Gán employeeList = mảng data cũ thay vì mảng rỗng
// 	 */
// 	var employeeListJSON = localStorage.getItem('employees');
// 	// check nếu data cũ có tồn tại thì lấy lên gán vào employeeList
// if (employeeListJSON){ //employeeListJSON !== null --> viết theo truthy, faslsy
// 	const employeeListFromLocal = JSON.parse(employeeListJSON); // parse ra mảng vì nó là chuổi
// 	/**
// 	 * 1. Viết hàm map: [EMP1, EMP2] => [new Employee(EMP1), new Employee(EMP2)] --> từ mảng cũ mất method
// 	 * do đó phải tạo object mới có thêm thuộc tính và method
// 	 * hàm này gọi là hàm map
// 	 */
// 	for (i = 0;i<employeeListFromLocal.length;i++){
// 		const currentEmp = employeeListFromLocal[i];
// 		const newEmployee = new Employee(
// 			currentEmp.lastName, 
// 			currentEmp.firstName, 
// 			currentEmp.id, 
// 			currentEmp.birthday,
// 			currentEmp.position
// 			);
// 			employeeList.push(newEmployee)
// 	}
// 	renderEmployees(); // lấy dữ liệu cũ hiện lên html cho họ thấy 
// 	// saveData(); // nếu muốn save data vào trong localstorage
// }


};

// chuyển từ tiếng việt có dấu về tiếng anh
function nonAccentVietnamese(str) {
	str = str.toLowerCase()
	//     We can also use this instead of from line 11 to line 17
	//     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
	//     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
	//     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
	//     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
	//     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
	//     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
	//     str = str.replace(/\u0111/g, "d");
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
	str = str.replace(/đ/g, 'd')
	// Some system encode vietnamese combining accent as individual utf-8 characters
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
	str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
	return str
}

getData();




// --------------------------- VALIDATION DATA --------------------------
// 1. required
// 2. max length, min length
// 3. pattern (ví dụ email có @, số điện thoại số, tên không có ký tự)
// 4. date 

const checkRequired = function(value,idMessage,message) {
	//check user nhập họ lastName
	// 1. Lấy giá trị ô lastName
	//const lastName = getElementById('ho').value.trim();

	if(!value.length) {
		document.getElementById(idMessage).innerHTML = message;
		return false;
	} 
		document.getElementById(idMessage).innerHTML = "";
		return true;
}

// check min length, max length

const checkLength = function(value, idMessage, message, min, max){
	if(value.length < min || value.length > max) {
		document.getElementById(idMessage).innerHTML = message;
		return false;
	} 
		document.getElementById(idMessage).innerHTML = "";
		return true;
}

// regular expression --> Biểu thức chính quy RegExp: [A - Z a - z]
// nếu user nhập giá trị nằm trong biểu thức chính quy thì đúng, không đúng trong biểu thức mẫu là sai
// ví dụ: 
// user nhập vào chuỗi từ a -z hoa, thường viết cách, dấu + nghĩa là 1 nhiều hơn
// var mau = new RegExp(/^[A-Za-z ]+$/)
// console.log(mau);


const checkString = function(value,idMessage, message){
	const stringPattern = new RegExp(
		"^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
			"ẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
			"ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
	);
	if(stringPattern.test(value)){
		document.getElementById(idMessage).innerHTML = '';
		return true
	}
	document.getElementById(idMessage).innerHTML = message;
	return false

}




































// Declaration fuction cho phép sử dụng cơ chế hoisting. Không khai báo cũng được dùng
/**
 * Vì sao có 2 loại function vì trong Javascript có cơ chế hoisting
 */
// demo hoisting cho phép sử dụng biến a trước khi khai báo biến a
// 	// trước khi hàm khởi động thì trình duyệt đã lấy toàn bộ biến rồi nhưng không lấy giá trị
// 	console.log(a);
// 	var a = 5;

//  // Expression function không hỗ trợ cơ chế hoisting. Khai báo xong mới được dùng

//  // DO ĐÓ TỪ BÂY GIỜ VÀ TRỞ VỀ SAU THÌ CHỈ DÙNG HÀM EXPRESSION FUNCTION
//   calcSum();
//   const calcSum = function(){

// 		console.log(3+5);
// 	}

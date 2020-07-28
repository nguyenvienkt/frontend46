/**
 * Xây dựng form quản lý nhân viên lấy dữ liệu từ backend bao gồm
 * 1. Chức năng hiển thị bảng danh sách nhân viên
 * 2. Chức năng thêm nhân viên
 * 3. Chức năng sửa thông tin nhân viên
 * 4. Chức năng xóa nhân viên
 * 5. Chức năng tìm kiếm nhân viên theo tên hoặc mã
 * 6. Xác thực thông tin khi thao tác với form
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


// 1. Hiển thị danh sách nhân viên ra ngoài màn hình thì phải lấy dữ liệu từ api backend (hoặc truy cập vào local storage) và sau đó với dữ liệu đó thì viết hàm tạo ra html. Làm việc với api thì dùng axios

const renderEmployees = function (arr) {
	var htmlContent = ''
	arr = arr || employeeList // nếu có truyền arr thì lấy arr còn không truyền thì là employeeList để khi gọi renderEmployees không cần truyền arr là renderEmployees();
	// cách viết truyền thống
	// if(!arr) {
	// 	arr = employeeList;
	// }
	for (var i = 0; i < arr.length; i++) {
		const currentEmp = arr[i]
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
			<button class="btn btn-info" onclick = "getUpdateEmpl('${
				currentEmp.id
			}')">Cập Nhật</button>
			</td>
			</tr>`
	}
	
	document.getElementById('tbodyEmployees').innerHTML = htmlContent
}




// hàm getData để tự động lấy data mỗi khi reload, truy cập vào web
const getData = function () {
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
		method: 'GET',
	})

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
	}

	// rejecter
	const rejecter = function (err) {
		console.log(err)
	}


	// promise có 2 phương thức thành công thì then(), thất bại thì chạy vào catch()
	fetchEmplPromise.then(resolver).catch(rejecter)
	

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
}


getData();

// THÊM MỚI NHÂN VIÊN
// VALIDATION TRƯỚC KHI THÊM NHÂN VIÊN MỚI
const checkRequired = fucntion(value,idMessage, message){

}
const addEmployee = function (){
  // 1. lấy thông tin mà user nhập vào form
  const lastName = document.getElementById('ho').value.trim();
  const firstName = document.getElementById('ten').value.trim();
  const id = document.getElementById('manv').value
  const birthday = document.getElementById('birthday').value
  const position = document.getElementById('vitri').value

}
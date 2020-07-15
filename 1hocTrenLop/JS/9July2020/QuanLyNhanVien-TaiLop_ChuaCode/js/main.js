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
	const lastName = document.getElementById('ho').value
	const firstname = document.getElementById('ten').value
	const id = document.getElementById('msnv').value
	const birthday = document.getElementById('datepicker').value
	const position = document.getElementById('chucvu').value

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

	



// 2. Hiển thị danh sách nhân viên ra ngoài màn hinh
// Phải tạo HTML bằng JavaScript
// function 2: tạo giao diện bảng nhân viên
const renderEmployees = function(){
	var htmlContent = '';
	for(var i = 0; i < employeeList.length; i++) {
		const currentEmp = employeeList[i];
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

	const updatedEmployee = new Employee(lastName, firstname, id, birthday, position);

	// dựa vào id không đổi, tìm nhân viên cũ nằm ở đâu trong mảng,
	// đè nhân viên mới vào
	const index = findById(id);
	if(index !== -1) {
		employeeList[index] = updatedEmployee;
		renderEmployees();
	}



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
	// lúc vào trang
	/**
	 * 1. Xuống local lấy danh sách lên
	 * 2. Chuyển từ chuổi ra mảng (lúc lưu là lưu chuỗi do đó lấy là chuỗi, mình phải chuyển qua mảng)
	 * 3. Gán employeeList = mảng data cũ thay vì mảng rỗng
	 */
	var employeeListJSON = localStorage.getItem('employees');
	// check nếu data cũ có tồn tại thì lấy lên gán vào employeeList
if (employeeListJSON){ //employeeListJSON !== null --> viết theo truthy, faslsy
	const employeeListFromLocal = JSON.parse(employeeListJSON); // parse ra mảng vì nó là chuổi
	/**
	 * 1. Viết hàm map: [EMP1, EMP2] => [new Employee(EMP1), new Employee(EMP2)] --> từ mảng cũ mất method
	 * do đó phải tạo object mới có thêm thuộc tính và method
	 * hàm này gọi là hàm map
	 */
	for (i = 0;i<employeeListFromLocal.length;i++){
		const currentEmp = employeeListFromLocal[i];
		const newEmployee = new Employee(
			currentEmp.lastName, 
			currentEmp.firstName, 
			currentEmp.id, 
			currentEmp.birthday,
			currentEmp.position
			);
			employeeList.push(newEmployee)
	}
	renderEmployees(); // lấy dữ liệu cũ hiện lên html cho họ thấy 
}
};

getData();









































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

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

// 1. Xây dựng lớp đối tượng prototype nhân viên
function Staff(ho, ten, ma,ns,vitri){
	this.ho = ho
	this.ten = ten
	this.ma = ma
	this.ns = ns
	this.vitri = vitri
	this.tinhLuong = function () {
		if(this.vitri === 'Sếp') return 5000
		if(this.vitri === 'Trưởng phòng') return 3000
		return 1000
	}
}

// Khai báo mảng chứa toàn bộ object nhân viên
var staffList = []; // vì sau này sẽ gán lại giá trị trong hàm search


// Thêm nhân viên
const addStaff = function(){
	
	//1. Lấy thông tin nhân viên user nhập vào form
	const ho = document.getElementById('ho').value.trim();
	const ten = document.getElementById('ten').value.trim();
	const ma = document.getElementById('msnv').value;
	const ns = document.getElementById('datepicker').value;
	const vitri = document.getElementById('chucvu').value;

	// Validation
	var isValid = true;
	isValid &=
	checkRequired(ho, 'lastNameError', 'Vui lòng nhập họ') &&
	checkString(ho, 'lastNameError', 'Vui lòng nhập ký tự chữ') &&
	checkLength(ho,'lastNameError','Vui lòng nhập độ dài họ từ 1 - 10 ký tự',1,10) 
	isValid &=
	checkRequired(ten, 'firstNameError', 'Vui lòng nhập tên') &&
	checkString(ten, 'firstNameError', 'Vui lòng nhập ký tự chữ') &&
	checkLength(ten,'firstNameError','Vui lòng nhập độ dài tên từ 1 - 10 ký tự',1,10)
	isValid &= 
	checkRequired(ma, 'idError', 'Vui lòng nhập mã nhân viên') &&
	checkLength(ma,'idError','Vui lòng nhập độ dài mã nhân viên từ 1 - 10 ký tự',1,10)

	if(isValid){
	//2. Khởi tạo object và lưu thông tin lấy được từ form vào object đó
	// 2.1 Kiểm tra tồn tại của nhân viên đó
	for (var i=0;i<staffList.length;i++){
		if(ma ===staffList[i].ma){
			alert('Mã nhân viên đã tồn tại')
			return
		}
	}

	// 2.2 Sau khi kiểm tra tồn tại của nhân viên thì lưu vào object
	const newStaff = new Staff(ho, ten, ma, ns, vitri)
	// 3. Đưa object nhân viên vào mảng 
	staffList.push(newStaff);

	// 4. Lưu danh sách nhân viên xuống local Storage
	saveData();

	// 5. Hiển thị giao diện mỗi lần thêm 1 nhân viên mới
	renderStaff();

	// reset lại form
	document.getElementById('btnReset').click()
}
}

//. Hiển thị danh sách nhân viên ra ngoài màn hình
const renderStaff = function (list) {
	var renderHtml = '';
	list = list || staffList

	for (var i = 0; i<list.length;i++){

		var currentStaff = list[i]
		renderHtml += `
		<tr>
		<td>${i + 1}</td>
		<td>${currentStaff.ho + ' ' + currentStaff.ten}</td>
		<td>${currentStaff.ma}</td>
		<td>${currentStaff.ns}</td>
		<td>${currentStaff.vitri}</td>
		<td>${currentStaff.tinhLuong()}</td>
		<td>
			<button class="btn btn-danger" onclick ="deleteStaff('${currentStaff.ma}')">Xóa</button>
			<button class="btn btn-primary" onclick ="editStaff('${currentStaff.ma}')">Edit</button>
		</td>
		
		</tr>

		`
	}

	document.getElementById('tbodyEmployees').innerHTML = renderHtml;

}

// ------------- SỬA THÔNG TIN NHÂN VIÊN --------------------
const editStaff = function(id){
	const index = findById(id);
	if(index !== -1){
		const editInfo = staffList[index];
		// Lấy toàn bộ thông tin của nhân viên cần update lên form
		document.getElementById('ho').value = editInfo.ho;
		document.getElementById('ten').value = editInfo.ten;
		document.getElementById('msnv').value = editInfo.ma;
		document.getElementById('datepicker').value = editInfo.ns;
		document.getElementById('chucvu').value = editInfo.vitri;
		
		// disable ô mã số nhân viên để user không sửa đc
		document.getElementById('msnv').setAttribute("disabled",true);

		// Ẩn nút thêm và hiện nút update
		document.getElementById('btnAdd').style.display = 'none';
		document.getElementById('btnUpdate').style.display = 'block';

	}
}

const btnEditStaff = function(){
	const ho = document.getElementById('ho').value.trim()
	const ten = document.getElementById('ten').value.trim()
	const ma = document.getElementById('msnv').value
	const ns = document.getElementById('datepicker').value
	const vitri = document.getElementById('chucvu').value

	// tạo đối tượng update mới
	const updateStaff = new Staff(ho, ten, ma, ns, vitri);
	
	// dựa vào id không đổi, tìm nhân viên cũ nằm ở trong trong mảng viên viên rồi thay thế (đè) bằng nhân viên mới
	const index = findById(ma);
	if(index !== -1){
		staffList[index] = updateStaff;
		renderStaff()
		saveData() // dùng lưu data vào local Storage

		// unable mã nhân viên trở lại
		document.getElementById('msnv').removeAttribute('disabled');

		// hiện nút add nhân viên và ẩn nút cập nhật
		document.getElementById('btnAdd').style.display = "block";
		document.getElementById('btnUpdate').style.display = "none"

		// clear form để user có thể thao tác cho lần tiếp theo
		// gắn click vào nút reset
		document.getElementById('btnReset').click();

	}

}





// ----------- XÓA NHÂN VIÊN KHỎI DANH SÁCH ------------------
// function 3: Xóa nhân viên khỏi danh sách
const deleteStaff = function(id){
	//input: mã nhân viên
	// process: 1. Tìm vị trí => xóa => render giao diện
	const index = findById(id); 
	// console.log(id, index);

	// kiểm tra nếu tìm được thì xóa
	if(index !== -1){
		staffList.splice(index,1);
		renderStaff();
		// saveData(); //--> xóa local 
	}
	
};


// ------------------ TÌM KIẾM NHÂN VIÊN ---------------------------

const findStaff = function(){
	const results = [];
	// 1.Lấy keyword mà user nhập vào
	const keyword = document.getElementById('txtSearch').value;
	// console.log(keyword);

	for (var i = 0; i<staffList.length;i++){
		const currentStaff = staffList[i];
		const hoTen = currentStaff.ho + ' '+ currentStaff.ten;

		// đổi từ tiếng việt sang tiếng anh cho hoTen và chuyển thành chữ thường
		const convertedHoTen = nonAccentVietnamese(hoTen.toLowerCase())
		
		// đổi từ tiếng việt sang tiếng anh cho keyword user nhập vào và chuyển thành chữ thường, bỏ khoảng trắng hai đầu với hàm trim()
		const convertedKeyWord = nonAccentVietnamese(keyword.toLowerCase().trim())

		if(keyword === currentStaff.ma){
			results.push(currentStaff);
			break;
		} else if(convertedHoTen.indexOf(convertedKeyWord) !== -1) {
			results.push(currentStaff);
		}


	}

	// hiển thị danh sách nhân viên tìm đc
	renderStaff(results)

}




// save Data xuống local Storage tối đa 5MB JSON
const saveData = function (){
	// chuyển object sang chuỗi
	const staffListJSON = JSON.stringify(staffList);
	localStorage.setItem('staff',staffListJSON)
}

// getData từ local storage khi page reload
const getData = function(){
	var staffListJSON = localStorage.getItem('staff');
	if(staffListJSON) {
		//parse ra mảng vì dưới local storage là chuỗi string
		const staffListFromLocal = JSON.parse(staffListJSON);
		// hàm map
		for (var i = 0; i<staffListFromLocal.length;i++){
			const currentStaff = staffListFromLocal[i]
			const newStaff = new Staff(
				currentStaff.ho,
				currentStaff.ten,
				currentStaff.ma,
				currentStaff.ns,
				currentStaff.vitri,

			)
			staffList.push(newStaff)
		}

		renderStaff();
	}

}


getData()

// function: tìm vị trí theo id
const findById = function(id){
	for(var i = 0;i<staffList.length;i++){
		
		if(staffList[i].ma === id){
			return i;
		}
	}
	return -1; // thường thì không tìm ra thì trả về -1 là không tìm thấy, có thể bất cứ return gì ở đây
}

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

// ------------------------Validation
// check các trường không được để trống
const checkRequired = function(value,idMessage,message){
	if(!value.length) {
		document.getElementById(idMessage).innerHTML = message;
		return false;
	} else {
		document.getElementById(idMessage).innerHTML = '';
		return true;
	}
}
// check độ dài ký tự các trường
const checkLength = function(value,idMessage,message,min,max){
	if(value.length < min || value.length > max){
		document.getElementById(idMessage).innerHTML = message;
		return false;
	} else {
		document.getElementById(idMessage).innerHTML = '';
		return true;
	}
}

// check ký tự nhập vào dạng chữ, không phải số
const checkString = function (value,idMessage,message){
	const stringPattern = new RegExp(
		'^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
			'ẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
			'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
	)

	if(stringPattern.test(value)){
		document.getElementById(idMessage).innerHTML = '';
		return true
	} else {
		document.getElementById(idMessage).innerHTML = message;
		return false
	}

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

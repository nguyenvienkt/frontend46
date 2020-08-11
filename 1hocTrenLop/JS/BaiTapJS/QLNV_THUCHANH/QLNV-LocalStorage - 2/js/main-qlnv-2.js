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

// 1. Tạo lớp đối tượng nhân viên

function Staff(ho, ten, ma, ns, vitri){
	this.ho = ho
	this.ten = ten
	this.ma = ma
	this.ns = ns
	this.vitri = vitri
	this.tinhLuong = function(){
		if(this.vitri === 'Sếp') return 5000
		if(this.vitri ==='Trưởng phòng') return 3000
		return 1000
	}
}

// 2. Tạo mảng chứa toàn bộ object nhân viên
var staffList = [];

// Thêm nhân viên
const addStaff = function(){
	// Lấy thông tin user nhập vào form 
	const ho = document.getElementById('ho').value;
	const ten = document.getElementById('ten').value;
	const ma = document.getElementById('msnv').value;
	const ns = document.getElementById('datepicker').value;
	const vitri = document.getElementById('chucvu').value;

	// Validation
	var isValid = true;

	isValid &=
	checkRequired(ho, 'lastNameError','Vui lòng nhập họ')

	if(isValid){
		// Kiểm tra tồn tại của nhân viên
		for(var i=0; i<staffList.length;i++){
			if(ma === staffList[i].ma){
				alert('Nhân viên đã tồn tại')
				return;// không cho thực hiện tiếp
			}
		}

		// lưu thông tin lấy được từ form vào object dựa trên lớp đối tượng Staff
		const newStaff = new Staff(ho, ten, ma, ns, vitri);

		// Đưa object nhân viên vào mảng staffList bằng hàm push

		staffList.push(newStaff);

		// Lưu danh sách nhân viên vào local Storage của trình duyệt
		saveData()

		// Hiển thị lại danh sách nhân viên sau khi đã thêm 1 nhân viên mới vào
		renderStaff()

		// reset lại form
		document.getElementById('btnReset').click()


	}

}





// Hiển thị danh sách nhân viên
const renderStaff = function(list){
	list = list || staffList

	var staffHtml = '';

	for (var i = 0; i <list.length; i++){
		var staff = list[i]

		staffHtml += `
		<tr>
		<td>${i + 1}</td>
		<td>${staff.ho}</td>
		<td>${staff.ten}</td>
		<td>${staff.ma}</td>
		<td>${staff.ns}</td>
		<td>${staff.vitri}</td>
		<td>${staff.tinhLuong()}</td>
		<td>
		<button class="btn btn-primary" onclick="editStaff('${staff.ma}')">Edit</button>
		<button class="btn btn-danger" onclick="deleteStaff('${staff.ma}')">Xóa</button>
		
		</td>
		
		</tr>
		
		`
	}

	document.getElementById('tbodyEmployees').innerHTML = staffHtml;

}


// Xóa nhân viên
const deleteStaff = function(id){
	// Khi bấm nút xóa thì tìm vị trí nhân viên trong mảng dựa vào vị trí
	const index = findById(id)

	// kiểm tra nếu tìm được thì xóa
	if(index !== -1){
		staffList.splice(index,1);
		renderStaff();
		// saveData(); // save xuống localstorage
		
	}
}

// Sửa thông tin nhân viên bao gồm 2 hàm
// 1. hàm đưa toàn bộ thông tin nhân viên mà user muốn sửa lên lại form
const editStaff = function(id){
	const index = findById(id);
	if(index !== -1){
		const info = staffList[index];
		// Lấy toàn bộ thông tin nhân viên vị trí index lên form
		document.getElementById('ho').value = info.ho;
		document.getElementById('ten').value = info.ten;
		document.getElementById('msnv').value = info.ma;
		document.getElementById('datepicker').value = info.ns;
		document.getElementById('chucvu').value = info.vitri;

		// disable ô mã số nhân viên để user không sửa được
		document.getElementById('msnv').setAttribute("disabled",true);

		// ẩn nút thêm nhân viên, hiện nút cập nhật
		document.getElementById('btnAdd').style.display = "none";
		document.getElementById('btnUpdate').style.display = "block"

	}
}
// 2. Hàm tạo mới nhân viên dựa trên form và thay thế lại nhân viên cũ dựa vào mã nhân viên
// Sau khi đưa toàn bộ thông tin của nhân viên lên form thì cho user chỉnh sửa (loại trừ mã số nhân viên). Sau đó thì phải viết hàm gắn vào nút cập nhật để
// khi user sửa xong và bấm nút cập nhật thì toàn bộ thông tin sẽ lưu vào mảng
const btnEditStaff = function(){
	// lấy lại toàn bộ thông tin mà user đã thay đổi
	const ho = document.getElementById('ho').value.trim();
	const ten = document.getElementById('ten').value.trim();
	const ma = document.getElementById('msnv').value
	const ns = document.getElementById('datepicker').value
	const vitri = document.getElementById('chucvu').value

	// tạo đối tượng mới từ thông tin trên form
	const updateStaff = new Staff(ho, ten, ma, ns, vitri);

	// dựa vào id của nhân viên không thay đổi, tìm nhân viên cũ trong mảng và đè bằng object mới
	const index = findById(ma);
	if(index !== -1){
		staffList[index] = updateStaff;
		renderStaff()
		saveData()

		// remove disabled mã nhân viên đi
		document.getElementById('msnv').removeAttribute('disabled')

		// hiện nút add nhân viên, ẩn nút cập nhật
		document.getElementById('btnAdd').style.display = "block";
		document.getElementById('btnUpdate').style.display = "none";

		// clear form
		document.getElementById('btnReset').click();
	}
	
}

// Tìm kiếm nhân viên dựa vào mã nhân viên hoặc tên
const findStaff = function(){
	const results = []
	//1. Lấy keyword mà user nhập vào input
	const keyword = document.getElementById('txtSearch').value;

	for(var i = 0; i<staffList.length;i++){
		const staff = staffList[i]
		// đổi từ tiếng việt sang tiếng anh cho họ
		const convertedHo = nonAccentVietnamese(staff.ho.toLowerCase())
		// đổi từ tiếng việt sang tiếng anh cho tên
		const convertedTen = nonAccentVietnamese(staff.ten.toLowerCase())
		// đổi từ tiếng việt sang tiếng anh cho keyword user nhập vào
		const convertedKeyword = nonAccentVietnamese(keyword.toLowerCase().trim())

		if(keyword === staff.ma){
			results.push(staff)
			break;
		} else if(convertedHo.indexOf(convertedKeyword) !== -1){
			results.push(staff)
		} else if (convertedTen.indexOf(convertedKeyword) !== -1){
			results.push(staff)
		}

		// hiển thị danh sách nhân viên tìm đc
		renderStaff(results);

	}

}


// hàm saveData lưu trữ mảng xuống local storage của trình duyệt tối đa 5MB
const saveData = function(){
	// chuyển object sang JSON
	const staffListJSON = JSON.stringify(staffList);
	localStorage.setItem('staffs',staffListJSON);
}

// hàm getData từ local storage khi page reload
const getData = function(){
	var staffListJSON = localStorage.getItem('staffs');
	if(staffListJSON){
		// parse ra mảng vì dưới local storage là json
		const staffListFromLocal = JSON.parse(staffListJSON);
		// map mảng thành object
		for (var i=0;i<staffListFromLocal.length;i++){
			const staff = staffListFromLocal[i]
			const newStaff = new Staff(
				staff.ho,
				staff.ten,
				staff.ma,
				staff.ns,
				staff.vitri
			)
			staffList.push(newStaff)
		}

		renderStaff()
	}
}

getData()










// tìm kiếm vị trí objec trong mảng bằng id
const findById = function(id){
	for(var i =0;i<staffList.length;i++){
		if(staffList[i].ma === id){
			return i;
		}
	}

	return -1; // không tìm ra thì trả về -1
}






// Không để trống các trường trong form

const checkRequired = function(value,idMessage,message){
	if(!value.length){
		document.getElementById(idMessage).innerHTML = message;
		return false
	} else{
		document.getElementById(idMessage).innerHTML = '';
		return true
	}
}


// hàm regulation express chuyển từ tiếng việt sang tiếng anh
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
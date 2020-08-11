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

  var staffService = new StaffService();

 // xây dựng lớp đối tượng bằng prototype
 function Staff (lastName, firstName, id, birthday, position){
   this.lastName  = lastName
   this.firstName = firstName
   this.id = id
   this.birthday = birthday
   this.position = position
   this.getSalary = function (){
     if(this.position === 'Sếp') return 5000
     if(this.position === 'Trưởng phòng') return 3000
     return 1000
   }

 }

 // Khai báo mảng chứa toàn bộ object nhân viên
 var staffList = [];


 // getData khi vừa vào trang web
 const getData = function(){
   const fetchDataPromise = axios({
			url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee',
			method: 'GET',
    })
    // resolver
    const resolver = function(res){
      // vì data lấy từ backend là chuỗi do đó phải tạo đối tượng
      for(var i = 0; i<res.data.length; i++){
        const bestaff = res.data[i]
        const fetchStaff = new Staff(
          bestaff.lastName,
          bestaff.firstName,
          bestaff.id,
          bestaff.birthday,
          bestaff.position
        )

        staffList.push(fetchStaff)
      }

      // hiển thị danh sách nhân viên
      renderStaff()
    }

    // rejecter
    const rejecter = function(err){
      console.log(err)
    }

    fetchDataPromise.then(resolver).catch(rejecter)

 }

 // chạy hàm getData ngay khi load page
 getData()


 // Thêm nhân viên
 const addStaff = function(){
   // 1. Lấy thông tin user nhập vào form
   const lastName = document.getElementById('ho').value.trim();
   const firstName = document.getElementById('ten').value.trim();
   const id = document.getElementById('msnv').value
   const birthday = document.getElementById('datepicker').value;
   const position = document.getElementById('chucvu').value;

   // Validate dữ liệu
   var isValid = true;

   isValid &= 
   checkRequired(lastName,'lastNameError','Vui Lòng nhập họ');
   if(isValid){
    // kiểm tra nhân viên đã tồn tại chưa
    for(var i=0;i<staffList.length;i++){
      if(staffList[i].id === id){
        alert('Nhân viên đã có mã rồi')
        return
      }
    }

    // sau khi kiểm tra xong thì cho vào trong list
    const newStaff = new Staff(lastName,firstName,id,birthday,position)

    // thêm dữ liệu vào backend qua call api
    const promise = staffService.add(newStaff);

    promise.then(function(res){
      getData()
    }).catch(function(err){
      console.log(err)
    })

    // render lại list staff
    renderStaff()

    // clear form
    document.getElementById('btnReset').click();

   }
 }

 // Xóa nhân viên
 const deleteStaff = function(ma){
  const index = findById(ma);
  console.log(ma,index)
  if(index !== -1){
    staffList.splice(index,1);
    renderStaff()
  }

  // // xóa nhân viên tại backend
  // staffService.delete(ma).then(function(res){
  //   getData()
  // }).catch(function(err){
  //   console.log(err)
  // })

 }

 // Sửa thông tin nhân viên chia làm 2 bước
 // 1. lấy lại toàn bộ thông tin nhân viên muốn sửa lên form
 // 2. Dựa vào thông tin trên form tạo mới nhân viên và dựa vào mã nhân viên sẽ thay thế (đè) thông tin nhân viên trên form vào nhân viên cũ
 const editFormStaff = function(id){
   const index = findById(id)
   if(index !== -1){
     const editStaff = staffList[index]
     // lấy toàn bộ thông tin từ nhân viên lên form
     document.getElementById('ho').value = editStaff.lastName;
     document.getElementById('ten').value = editStaff.firstName;
     document.getElementById('msnv').value = editStaff.id;
     document.getElementById('datepicker').value = editStaff.birthday;
     document.getElementById('chucvu').value = editStaff.position;

     // disable ô mã số nhân viên để user không sửa được
     document.getElementById('msnv').setAttribute("disabled",true);
     
     // ẩn nút thêm nhân viên, hiện nút cập nhật thông tin
     document.getElementById('btnAdd').style.display = "none";
     document.getElementById('btnUpdate').style.display = "block"
   }
 }

 const editBtnStaff = function(){
   const lastName = document.getElementById('ho').value
   const firstName = document.getElementById('ten').value;
   const id = document.getElementById('msnv').value;
   const birthday = document.getElementById('datepicker').value;
   const position = document.getElementById('chucvu').value;

  // tạo đối tượng mới dựa trên giá trị lấy từ form
  const updatedStaff = new Staff(lastName,firstName,id,birthday,position);

  // dựa vào mã nhân viên không đổi tìm vị trí nhân viên cũ và thay thế bằng nhân viên mới
  const index = findById(id);

  if(index !== -1){
    staffList[index] = updatedStaff;
    renderStaff()
    //bỏ disabled trên input mã nhân viên
    document.getElementById('msnv').removeAttribute('disabled');

    // hiện lại nút thêm nhân viên và ẩn đi nút cập nhật
    document.getElementById('btnAdd').style.display = "block";
    document.getElementById('btnUpdate').style.display = "none";

    //clear form
    document.getElementById('btnReset').click()

  }
  // lưu dữ liệu vào backend qua api
 var promise = staffService.update(updatedStaff.id, updatedStaff)
 promise
		.then(function (res) {
			getData()
		})
		.catch(function (error) {
			console.log('error', error)
		})
 }


 // tìm kiếm nhân viên theo mã hoặc tên
 const findStaff = function(){
   const ketqua = [];
   //1. Lấy keyword user nhập vào input
   const keyword = document.getElementById('txtSearch').value;
   // Duyệt mảng nhân viên, tìm ra nhân viên
   for (var i = 0;i<staffList.length;i++){
     const staff = staffList[i];
     // Đổi trường họ, tên từ tiếng việt sang tiếng anh không có dấu
    const convertedHo = nonAccentVietnamese(staff.lastName.toLowerCase())
    const convertedTen = nonAccentVietnamese(staff.firstName.toLowerCase())
    // Đổi keyword từ tiếng việt sang tiếng anh ko dấu
    const convertedKeyword = nonAccentVietnamese(keyword.toLowerCase().trim())

    if(keyword === staff.id){
      ketqua.push(staff);
      break;
    } else if (convertedHo.indexOf(convertedKeyword) !== -1){
      ketqua.push(staff);
      break;
    } else if (convertedTen.indexOf(convertedKeyword) !== -1){
      ketqua.push(staff)
    }

   }
   // hiển thị danh sách kết quả ra màn hình
   renderStaff(ketqua);

 }



 // Hiển thị danh sách nhân viên
 const renderStaff = function (arr){
  arr = arr || staffList;

  var toHtml = '';

  for (var i= 0; i<arr.length;i++){
    const staff = arr[i];
    toHtml += `
    <tr>
    <td>${i + 1}</td>
    <td>${staff.lastName}</td>
    <td>${staff.firstName}</td>
    <td>${staff.id}</td>
    <td>${staff.birthday}</td>
    <td>${staff.position}</td>
    <td>${staff.getSalary()}</td>
    <td>
    <button class="btn btn-primary" onclick="editFormStaff('${staff.id}')">Edit</button>
    <button class="btn btn-danger" onclick="deleteStaff('${
			staff.id
		}')">Xóa</button>
    
    </td>
    
    </tr>
    
    `

  }
  // console.log(toHtml)
  document.getElementById('tbodyEmployees').innerHTML = toHtml;

 }



 // tìm kiếm nhân viên dựa vào mã nhân viên
 const findById = function(id){
   for(var i = 0; i<staffList.length;i++){
     if(id === staffList[i].id){
       return i;
     }
   }

   return -1; // không tìm thấy
 }





 // Validation
 const checkRequired = function(value,idMessage,message){
   if(!value.length){
     document.getElementById(idMessage).innerHTML = message;
     return false;
   } else {
     document.getElementById(idMessage).innerHTML = '';
     return true;
   }
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

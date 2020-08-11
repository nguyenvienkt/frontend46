// Trùng tên với index.html mục đích là điều hướng.
// lỗi trên index.html thì sẽ đi tới index.js để quản lý

// Tạo đối tượng service tương tác với backend
var svService = new SinhVienService();

var sinhVienList = []; // mảng chứa toàn bộ object sinh viên

var renderSinhVien = function () {
  var promise = svService.layDanhSachSinhVien();
  promise
    .then(function (res) {
      // tạo <tr> table</tr>
      // console.log(res.data);

      var contentTable = "";
      for (var index = 0; index < res.data.length; index++) {
        // mỗi lần duyệt lấy ra 1 đối tướng sinh viên
        var data = res.data[index];
        // từ đối tượng sinh ra thẻ tr trên index.html
        contentTable += `
      <tr>
      <td>${data.MaSV}</td>      
      <td>${data.HoTen}</td>      
      <td>${data.Email}</td>      
      <td>${data.SoDT}</td>      
      <td>${data.CMND}</td>      
      <td>${data.DiemToan}</td>      
      <td>${data.DiemLy}</td>      
      <td>${data.DiemHoa}</td>
      <td>
      <button class="btn btn-danger" onclick="deleteSinhVien('${data.MaSV}')">Xóa</button>
      </td>      
      </tr>
      
      `
      }

      document.getElementById("tblSinhVien").innerHTML = contentTable;
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

renderSinhVien();

/*
  this.MaSV = '';
  this.HoTen = '';
  this.Email = '';
  this.SoDT = '';
  this.CMND = '';
  this.DiemToan = '';
  this.DiemLy = '';
  this.DiemHoa = '';  
  MaSV,HoTen,Email,SoDT,CMND,DiemToan,DiemLy,DiemHoa
*/

// Thêm Sinh Viên
var themSinhVien = function(){
 //1. Lấy thông tin sv mà user nhập vào form
 const MaSV = document.getElementById('MaSV').value.trim();
 const HoTen = document.getElementById('HoTen').value.trim();
 const Email = document.getElementById('Email').value;
 const SoDT = document.getElementById('SoDT').value;
 const CMND = document.getElementById('CMND').value;
 const DiemToan = document.getElementById('DiemToan').value;
 const DiemLy = document.getElementById('DiemLy').value;
 const DiemHoa = document.getElementById('DiemHoa').value;

//  Validation 
var isValid = true;

isValid &=
checkRequired(MaSV,"MaSVRe","Vui Lòng điền Mã Sinh Viên")

if (isValid){
  // check SV tồn tại hay chưa
  // for (var i=0;i< sinhVienList.length;i++){
  //   if(MaSV === sinhVienList[i].MaSV){
  //     alert('Sinh Viên đã tồn tại')
  //     return;
  //   }
  // }

  // Tạo new object từ form nhập vào
  const newSinhVien = new SinhVien(
		MaSV,
		HoTen,
		Email,
		SoDT,
		CMND,
		DiemToan,
		DiemLy,
		DiemHoa
  )
  
  // lưu object mới tạo vào backend qua api
  var promise = svService.add(newSinhVien);
  promise.then(function(res){
    // xử lý thành công, gọi hàm getData
    getData();
  }).catch(function(error){
    console.log(error)
  })

  // render giao diện mới sau khi thêm sinh vien

  renderSinhVien()


}


}

// Delete Sinh Viên
const deleteSinhVien = function (MaSV) {
	const index = findById(MaSV)
  console.log(MaSV,index)
	if (index !== -1) {
		sinhVienList.splice(index, 1)
		renderStaff()
	}

	// // xóa nhân viên tại backend
	// svService.delete(MaSV).then(function(res){
	//   getData()
	// }).catch(function(err){
	//   console.log(err)
	// })
}


// tìm kiếm nhân viên dựa vào mã nhân viên
 const findById = function(MaSV){
   for(var i = 0; i<sinhVienList.length;i++){
     if(MaSV === sinhVienList[i].MaSV){
       return i;
     }
   }
   return -1; // không tìm thấy
 }



// function getData
const getData = function(){
  const fetchNewData = axios({
		url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
		method: 'GET',
  })
  // resolver
  const resolver = function(res){
    for(var i=0;i<res.data.length;i++){
      const currentSV = res.data[i]
      const newSinhVien = new SinhVien(
        currentSV.MaSV,
        currentSV.HoTen,
        currentSV.Email,
        currentSV.SoDT,
        currentSV.CMND,
        currentSV.DiemToan,
        currentSV.DiemLy,
        currentSV.DiemHoa,
      )
        sinhVienList.push(newSinhVien)
    }
    renderSinhVien() // lấy dữ liệu cũ cho họ thấy
  };

  // rejecter
  const rejecter = function(err){
    console.log(err)
  }

  fetchNewData.then(resolver).catch(rejecter)


}





// Hàm checkRequired phải nhập dữ liệu
const checkRequired = function(value,idMessage,message){
  if(!value.length){
    document.getElementById('MaSVRe').innerHTML = message;
    return false;
  } else {
    document.getElementById('MaSVRe').innerHTML = '';
    return true;
  }
}
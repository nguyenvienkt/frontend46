// Trùng tên với index.html mục đích là điều hướng.
// lỗi trên index.html thì sẽ đi tới index.js để quản lý

// Tạo đối tượng service tương tác với backend
var svService = new SinhVienService();

var renderSinhVien = function() {
  var promise = svService.layDanhSachSinhVien();

  promise.then(function(res){
    // tạo <tr> table</tr>
    console.log(res.data)
    
    var contentTable = '';
    for (var index=0;index<res.data.length;index++){
      // mỗi lần duyệt lấy ra 1 đối tướng sinh viên
      var sinhVien = res.data[index];

      // từ đối tượng sinh ra thẻ tr trên index.html
      contentTable +=`
      <tr>
      <td>${sinhVien.MaSV}</td>      
      <td>${sinhVien.HoTen}</td>      
      <td>${sinhVien.Email}</td>      
      <td>${sinhVien.SoDT}</td>      
      <td>${sinhVien.CMND}</td>      
      <td>${sinhVien.DiemToan}</td>      
      <td>${sinhVien.DiemLy}</td>      
      <td>${sinhVien.DiemHoa}</td>      
      
      </tr>
      
      ` 
    }

    document.getElementById('tblSinhVien').innerHTML = contentTable;

  }).catch(function(error){
    console.log(error.response.data)
  })
}

renderSinhVien();

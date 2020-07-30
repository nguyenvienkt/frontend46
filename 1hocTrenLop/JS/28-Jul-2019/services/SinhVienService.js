// File liên kết tới backend sẽ chứa trong folder này
// link backend là: http://svcy.myclass.vn/swagger/ui/index#
var SinhVienService = function(){
  // Thêm mới Sinh Viên
  this.themMoi = function(sinhvien){
    return axios({
      url:'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
      method:'POST',
      data:sinhvien
    })
  }

  // Xóa Sinh Viên khỏi danh sách
  this.xoa = function(maSV){

  }

  // Cập nhật thông tin sinh viên
  this.capNhat = function (sinhVien) {

  }

  // lấy danh sách sinh viên
  this.layDanhSachSinhVien = function () {
    return axios({
			url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
			method: 'GET',
		})
  }

  // lấy thông tin sinh viên theo mã
  this.layThongTinSinhVien = function (maSV) {

  }
}
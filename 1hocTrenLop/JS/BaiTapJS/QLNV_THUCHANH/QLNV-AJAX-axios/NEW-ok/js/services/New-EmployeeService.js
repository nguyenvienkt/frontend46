// file tương tác dữ liệu với backend qua api
var StaffService = function (){

  // thêm nhân viên mới
  this.add = function(newStaff) {
    return axios({
			url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee',
      method: 'POST',
      data:newStaff
		})
  }
  // xóa nhân viên
  this.delete = function(id){
    return axios({
			url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee/'+id,
			method: 'DELETE',
		})
  }

  // sửa thông tin nhân viên

  this.update = function(id,staffUpdate){
    return axios({
			url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee/' + id,
      method: 'PUT',
      data:staffUpdate
		})
  }





}
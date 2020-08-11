// file tương tác dữ liệu với backend qua api

var EmployeeService = function() {
  // THÊM NHÂN VIÊN MỚI
  this.add = function(newEmployee) {
    return axios({
			url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee', // url là link backend api
			method: 'POST', // Phương thức trao đổi dữ liệu với backend
			data: newEmployee,
		})
  }

  // THAY ĐỔI CẬP NHẬT THÔNG TIN NHÂN VIEN
  this.update = function(id,employeeUpdate){
    return axios({
			url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee/'+id,
			method: 'PUT',
			data: employeeUpdate,
		})
  }

  // DELETE NHÂN VIÊN QUA BACKEND
   this.delete = function(id){
    return axios({
			url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee/'+id,
			method: 'DELETE',
			
    })
   }
}
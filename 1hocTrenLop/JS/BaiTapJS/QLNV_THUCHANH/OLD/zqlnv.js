/**
 * Xây dựng form quản lý nhân viên lấy dữ liệu từ backend bao gồm
 * 1. Chức năng hiển thị bảng danh sách nhân viên
 * 2. Chức năng thêm nhân viên
 * 3. Chức năng sửa thông tin nhân viên
 * 4. Chức năng xóa nhân viên
 * 5. Chức năng tìm kiếm nhân viên theo tên hoặc mã
 * 6. Xác thực thông tin khi thao tác với form
 */

 // Xây dựng lớp đối tượng prototype của nhân viên
function Staff (lastName, firstName, id, birthday,position){
  this.lastName = lastName
  this.firstName = firstName
  this.id = id 
  this.birthday = birthday
  this.position = position
  this.sumSalary = function(){
    if(this.position=== 'Sếp') return 5000
    if(this.position === 'Trưởng phòng') return 3000
    return 1000
  }
}

// khai báo mảng chứa toàn bộ object nhân viên sẽ là mảng rỗng
// mảng này sẽ bị gán lại nên dùng biến var
var staffList = []

// 1. Hiển thị danh sách nhân viên ra ngoài màn hình thì phải lấy dữ liệu từ api backend (hoặc truy cập vào local storage) và sau đó với dữ liệu đó thì viết hàm tạo ra html. Làm việc với api thì dùng axios

const renderStaff = function(arr) {
  var htmlContent = '';
  arr = arr || staffList;

  for (var i=0; i<arr.length;i++){
    htmlContent = `
    <tr>
    <td>${i + 1}</td>
    <td>${arr[i].lastName + ' ' + arr[i].firstName}</td>
    <td>${arr[i].id}</td>
    <td>${arr[i].birthday}</td>
    <td>${arr[i].position}</td>
    <td>${arr[i].sumSalary()}</td>
    <td >
    <input type="button"  value="Xóa" class="btn btn-danger" onclick="">
    <input type="button" value="Cập nhật" class="btn btn-info" onclick="">
    
    </td>
    </tr>
    
    `
  }

  document.getElementById('listnv').innerHTML = htmlContent;

}


// hàm getData để tự động lấy data mỗi khi reload, truy cập vào web
const getData = function(){

  const fetchStaffPromise = axios({
    url: 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee',
    method:'GET',
  });

  // resolver
  const resolver = function(res){
    // luôn luôn code trong resolver để lấy dũ liệu từ backend về rồi xử lý
    for(var i=0; i<res.data.length;i++){
    const fetchEmpl  = res.data[i]
    const fetchNewEmpl = new Staff( 
      fetchEmpl.lastName,
      fetchEmpl.firstName,
      fetchEmpl.id,
      fetchEmpl.birthday,
      fetchEmpl.position,)

      staffList.push(fetchNewEmpl)
  }
  renderStaff();
};

// rejecter
const rejecter = function(err) {
  console.log(err);
}

fetchStaffPromise.then(resolver).catch(rejecter);

}






getData();
//Lớp: Employee
//Chức năng
/**
 * 1.Thêm nhân viên mới vào danh sách
 * 2.Hiển thị danh sách nhân viên dưới dạng bảng
 * 3.Xóa nhân viên
 * 4.Cập nhật thông tin nhân viên
 * 5.Tìm kiếm nhân viên theo tên hoặc theo mã
 * 6. Validate thông tin
 */

//1.Xây dựng lớp đối tượng
function Employee(lastName, firstName, id, birthday, position) {
  this.lastName = lastName;
  this.firstName = firstName;
  this.id = id;
  this.birthday = birthday;
  this.position = position;
  this.calcSalary = function () {
    //position = "Sếp"
    //position = "Trưởng phòng"
    //position = "Nhân viên"
    if (this.position === "Sếp") return 5000;
    if (this.position === "Trưởng phòng") return 3000;
    return 1000;
  };
}

var employeeList = [];

//function 1 : thêm nhân viên
const addEmployee = function () {
  //1.lấy thông tin từ form, dom
  const lastName = document.getElementById("ho").value.trim();
  const firstName = document.getElementById("ten").value.trim();
  const id = document.getElementById("msnv").value;
  const birthday = document.getElementById("datepicker").value;
  const position = document.getElementById("chucvu").value;

  var isValid = true;

  //Kiểm tra dữ liệu
  isValid &=
    checkRequired(lastName, "lastNameError", "Vui lòng nhập họ") &&
    checkLength(lastName, "lastNameError", "Độ dài không phù hợp", 1, 10);
  isValid &=
    checkRequired(firstName, "firstNameError", "Vui lòng nhập tên") &&
    checkString(firstName, "firstNameError", "Tên không đúng định dạng");

  if (isValid) {
    //1.1 Kiểm tra tồn tại nhân viên
    for (var i = 0; i < employeeList.length; i++) {
      if (id === employeeList[i].id) {
        alert("Mã nhân viên đã tồn tại");
        return;
      }
    }

    //2.khởi tạo object, lưu thông tin lấy được vào object đó
    const newEmployee = new Employee(
      lastName,
      firstName,
      id,
      birthday,
      position
    );

    //3. bỏ vào mảng employeeList (object nhân viên)
    employeeList.push(newEmployee);

    //Lưu danh sách nhân viên xuống localStorage
    saveData();

    //4. render giao diện mỗi lần add 1 nhân viên
    renderEmployees();
  }
};

//Function 2: Tạo giao diện bảng nhân viên
const renderEmployees = function (arr) {
  var htmlContent = "";
  arr = arr || employeeList;
  for (var i = 0; i < arr.length; i++) {
    var currentEmp = arr[i];
    htmlContent += `
    <tr>
      <td>${i + 1}</td>
      <td>${currentEmp.lastName + " " + currentEmp.firstName}</td>
      <td>${currentEmp.id}</td>
      <td>${currentEmp.birthday}</td>
      <td>${currentEmp.position}</td>
      <td>${currentEmp.calcSalary()}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteEmpl('${
          currentEmp.id
        }')">Xóa</button>
        <button class="btn btn-info" onclick="getUpdateEmpl('${
          currentEmp.id
        }')">Cập nhật</button>
      </td>
    </tr>`;
  }
  console.log(htmlContent);
  document.getElementById("tbodyEmployees").innerHTML = htmlContent;
};

//function 3: Xóa nhân viên khỏi danh sách
const deleteEmpl = function (id) {
  //input: mã nhân viên
  //process: Tìm vị trí => xóa => render giao diện
  const index = findById(id);

  //Kiểm tra nếu tìm được thì xóa
  if (index !== -1) {
    employeeList.splice(index, 1);
    renderEmployees();
    //saveData()
  }
};

//function 4: cập nhật thông tin sinh viên
const getUpdateEmpl = function (id) {
  const index = findById(id);
  if (index !== -1) {
    const updateUser = employeeList[index];

    //show thông tin lên form
    document.getElementById("ho").value = updateUser.lastName;
    document.getElementById("ten").value = updateUser.firstName;
    document.getElementById("msnv").value = updateUser.id;
    document.getElementById("datepicker").value = updateUser.birthday;
    document.getElementById("chucvu").value = updateUser.position;

    //disable ô msnv
    document.getElementById("msnv").setAttribute("readonly", true);

    //ẩn nút thêm và hiện nút update
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";
  }
};

const updateUser = function () {
  const lastName = document.getElementById("ho").value;
  const firstName = document.getElementById("ten").value;
  const id = document.getElementById("msnv").value;
  const birthday = document.getElementById("datepicker").value;
  const position = document.getElementById("chucvu").value;

  const updateEmpl = new Employee(lastName, firstName, id, birthday, position);

  //dựa vào id không đổi, tìm nhân viên cũ nằm ở đâu trong mảng
  //đè nhân viên cũ vào
  const index = findById(id);
  if (index !== -1) {
    employeeList[index] = updateEmpl;
    renderEmployees();

    //xóa disable ô msnv
    document.getElementById("msnv").removeAttribute("readonly");

    //ẩn nút sửa và hiện nút thêm
    document.getElementById("btnAdd").style.display = "block";
    document.getElementById("btnUpdate").style.display = "none";

    //clear form
    document.getElementById("btnReset").click();
  }
};

//Hàm tìm nhân viên theo id hoặc tên
const findEmpl = function () {
  const results = [];
  //1. lấy keyword
  const keyword = document.getElementById("txtSearch").value;
  for (var i = 0; i < employeeList.length; i++) {
    const currentEmpl = employeeList[i];
    const fullName = currentEmpl.lastName + " " + currentEmpl.firstName;

    const convertFullName = nonAccentVietnamese(fullName.toLowerCase());
    const converttoKeyword = nonAccentVietnamese(keyword.toLowerCase().trim());
    if (keyword === currentEmpl.id) {
      results.push(currentEmpl);
      break;
    } else if (
      fullName.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1
    ) {
      results.push(currentEmpl);
    }
  }
  //Hiển thị danh sách nhân viên tìm được
  renderEmployees(results);
};

//function: Tìm vị trí theo id
const findById = function (id) {
  for (var i = 0; i < employeeList.length; i++) {
    if (id === employeeList[i].id) {
      return i;
    }
  }
  return -1;
};

//function: save data to local storage
const saveData = function () {
  //chuyển sang chuỗi JSON
  const employeeListJSON = JSON.stringify(employeeList);
  localStorage.setItem("employees", employeeListJSON);
};

const getData = function () {
  console.log("hieu dep trai");
  //dùng axios để call lên api của backend lấy ds nhân vien có ẵn
  const fetchEmplPromise = axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/employee",
    method: "GET",
  });
  //resolver
  const resolver = function (res) {
    console.log(res.data);
    for (var i = 0; i < res.data.length; i++) {
      const currentEmp = res.data[i];
      const newEmployee = new Employee(
        currentEmp.lastName,
        currentEmp.firstName,
        currentEmp.id,
        currentEmp.birthday,
        currentEmp.position
      );
      employeeList.push(newEmployee);
    }
    renderEmployees();
  };
  //rejecter
  const rejecter = function (err) {
    console.log(err);
  };

  fetchEmplPromise.then(resolver).catch(rejecter);
  console.log("Khải mập");
};

//Chuyển tiếng việt về tiếng anh
function nonAccentVietnamese(str) {
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

getData();
console.log("Thầy Song");
//-----------------VALIDATION DATA--------------------------------------
const checkRequired = function (value, idMessage, message) {
  //1. Lấy giá trị ô họ
  if (!value.length) {
    document.getElementById(idMessage).innerHTML = message;
    return false;
  }
  document.getElementById(idMessage).innerHTML = "";
  return true;
};

const checkLength = function (value, idMessage, message, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(idMessage).innerHTML = message;
    return false;
  }
  document.getElementById(idMessage).innerHTML = "";
  return true;
};

const checkString = function (value, idMessage, message) {
  const stringPattern = new RegExp(
    "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
  );
  if (stringPattern.test(value)) {
    document.getElementById(idMessage).innerHTML = "";
    return true;
  }
  document.getElementById(idMessage).innerHTML = message;
  return false;
};

//-----------demo asynchronous------------------

// const showMessage = function () {
//   console.log("this is a message");
// };

// console.log("a");
// setTimeout(showMessage, 200 );
// console.log("c");
// setTimeout(showMessage, 5000);

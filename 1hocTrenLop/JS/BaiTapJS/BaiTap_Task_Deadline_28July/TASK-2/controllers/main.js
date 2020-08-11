/** BÀI TẬP
 * Bài tập Quản lý Task cá nhân:
Chức năng: 
  1. Thêm task
  2. Xoá task 
  3. Cập nhật nôi dung task (theo giao diện mẫu, các ban tạo thêm 1 icon edit bên cạnh icon xoá, nhấn vào để cập nhật nha)
  4. Thay đổi trạng thái task (Hoàn thành hay chưa)
  5. Validation input
  Gợi ý: 
  - Phân tích đối tượng Task gồm những thuộc tính nào, vd: content, status
  -  Đối với chức năng thay đổi trang thái, đơn giản là tạo ra một mảng completeTasks , nhấn done task nào, thì xoá task đó ra khỏi mảng task hiện tại, và push task đó vào mảng completeTask
  - Ở trên thì render mảng chưa hoàn thành, bên dưới thì hiện mảng đã hoàn thành

Giao diện mẫu: http://lms.myclass.vn/pluginfile.php/20323/mod_assign/intro/102261494_2963474200414608_6861431171297837056_n.jpg
*/

 // Xây dựng lớp đối tượng task
function Task(id,content){
  this.id = id
  this.content = content
  // this.status = status
}

// tạo mảng chứa object tasklist
var taskList = [];
var doneTaskList = [];

// -----------------------------------------thêm task
const addTask = function(){
  
  // lấy thông tin user nhập vào input task
  const id = document.getElementById('inputid').value;
  const content = document.getElementById('inputTask').value;

// validation
var isValid = true;

isValid &=
checkRequired(id,'message','Vui lòng nhập giá trị') &&
checkRequired(content,'message','Vui lòng nhập giá trị')

if(isValid){
// Kiểm tra tránh trùng id
for(var i=0;i<taskList.length;i++){
  if(id === taskList[i].id){
    alert('Mã id đã tồn tại')
    return; // không cho thực hiện tiếp
  }
}
// Lưu thông tin lấy được từ input task vào lớp đối tượng
const newTask = new Task(id,content)

// Đưa object task vào mảng taskList
taskList.push(newTask);

// Lưu mảng vào local storage
saveData()

// Hiển thị danh sách task
renderTask()

// reset lại form
document.getElementById('btnReset').click()// reset lại form

}

}

// -----------------------------------------delete task
const deleteTask = function(id){
  // user click button xóa thì tìm vị trí task trong mảng
  const index = findById(id);
  // kiểm tra nếu tìm đc id thì xóa
  if(index !==-1){
    taskList.splice(index,1);
    renderTask()
    saveData() // lưu xuống local storage của browser

  }
}
// // -----------------------------------------delete task done
// const deleteTaskDone = function(id){
//   // user click button xóa thì tìm vị trí task trong mảng
//   const index = findById(id);
//   // kiểm tra nếu tìm đc id thì xóa
//   console.log(id,index)
//   if(index !== -1){
//     doneTaskList.splice(index,1);
//     renderTaskDone()
//     // saveDataTaskDone() // lưu xuống local storage của browser

//   }
// }

// -----------------------------------------Chỉnh sửa edit task
// 1. Tìm và đưa content lên lại field input
const editTask = function(id){
  const index = findById(id);
  if(index !== -1){
    const info = taskList[index]
    // lấy thông tin content của task đưa lên lại input 
    document.getElementById('inputid').value = info.id;
    document.getElementById('inputTask').value = info.content;

    // disable id cho user không sửa được
    document.getElementById('inputid').setAttribute('disabled',true)

    //ẩn nút thêm icon và hiện nút edit icon
    document.getElementById('btnAdd').style.display = "none";
    document.getElementById('btnEdit').style.display = "block";
  }
}
// 2. Tạo object task mới dựa vào thông tin trên input
const btnEditTask = function(){
  // lấy lại toàn bộ thông tin mà user đã thay đổi
  const id = document.getElementById('inputid').value;
  const content = document.getElementById('inputTask').value;

  // tạo đối tượng mới
  const updatedTask = new Task(id,content);

  // tìm và thay thế đối tượng cũ bằng đối tượng mới
  const index = findById(id);
  if(index !== -1){
    taskList[index] = updatedTask;
    renderTask()
    saveData()

    // remove disble id
    document.getElementById('inputid').removeAttribute('disabled')

    // hiện nút add task, ẩn nút edit
    document.getElementById('btnAdd').style.display = "block";
    document.getElementById('btnEdit').style.display = "none"

    // clear form
    document.getElementById('btnReset').click()


  }
}

// -----------------------------------------done task
// -  Đối với chức năng thay đổi trang thái, đơn giản là tạo ra một mảng completeTasks , nhấn done task nào, thì xoá task đó ra khỏi mảng task hiện tại, và push task đó vào mảng completeTask
// - Ở trên thì render mảng chưa hoàn thành, bên dưới thì hiện mảng đã hoàn thành

const doneTask = function(id){
  // khi user click vào icon checked thì sẽ dựa vào id tìm vị trí của task đó
  // push task đó vào mảng doneTaskList và xóa splice task đó khỏi taskList
  const index = findById(id);

  if(index !== -1){
    // push task tìm được vào mảng doneTaskList và hiển thị bằng hàm renderTaskDone
    doneTaskList.push(taskList[index]);
    // render ra mảng doneTaskList bằng hàm 
    renderTaskDone()
    // lưu vào local storage
    saveDataTaskDone()

    // xóa task tìm được trong mảng taskList và hiển thị hàm renderTask
    taskList.splice(index,1);
    // render lại tasklist
    renderTask()
    // lưu vào local storage
    saveData()
}
}

// tìm vị trí dựa vào id
const findById = function(id){
  for(var i=0;i<taskList.length;i++){
    if(id === taskList[i].id){
      return i;
    }
  }
  // không tìm thấy
  return -1
}



// hàm hiển thị Task
const renderTask = function(){
  var listHtml = '';
  for (var i=0;i<taskList.length;i++){
    var task = taskList[i];
    listHtml += `
    <div class="eachtask">
    <p>${task.id}. ${task.content}</p>
    <span>
    <i class="fa fa-pencil" onclick="editTask('${task.id}')"></i>
    <i class="fa fa-trash" onclick="deleteTask('${task.id}')"></i>
    <i class="fa fa-check-circle" onclick="doneTask('${task.id}')"></i>
    </span>
    
    </div>
    
    `
  }

  document.getElementById('tasklist').innerHTML = listHtml;

}

const renderTaskDone = function(){
  var listHtmlDone = '';
  for (var i=0;i<doneTaskList.length;i++){
    var task = doneTaskList[i];
    listHtmlDone += `
    <div class="eachtask">
    <p class="item-task-done">${task.id}. ${task.content}</p>
    <span>
    
    <i class="fa fa-trash" onclick="deleteTaskDone('${task.id}')"></i>
    <i class="fa fa-check-circle" id ="icontaskdone" ></i>
    </span>
    
    </div>
    
    `
  }

  document.getElementById('taskdone').innerHTML = listHtmlDone;
}


// save task vào local storage
const saveData = function(){
  // chuyển object task sang JSON
  const taskListJSON = JSON.stringify(taskList);
  localStorage.setItem('tasks',taskListJSON);
}
// save task done
const saveDataTaskDone = function(){
  // chuyển object task sang JSON
  const taskListJSON = JSON.stringify(doneTaskList);
  localStorage.setItem('tasksdone',taskListJSON);
}

// Khi vào page thì load local storage để lấy task
const getData = function(){
  var taskListJSON = localStorage.getItem('tasks');
  if(taskListJSON){
    const taskListFromLocal = JSON.parse(taskListJSON);
    // map mảng thành object
    for(var i = 0;i < taskListFromLocal.length;i++){
      const task = taskListFromLocal[i];
      const localTask = new Task(
        task.id,
        task.content,
        // task.status
      )
      taskList.push(localTask);
      // doneTaskList.push(localTask)
    }
    // sau khi đưa task vào mảng thì hiển thị ra
    renderTask()
    // renderTaskDone()
  }
}
// chạy hàm getdata ngay khi load trang
getData();

// getDataTaskDone
const getDataTaskDone = function(){
  var taskListJSON = localStorage.getItem('tasksdone')
	if (taskListJSON) {
		const taskListFromLocal = JSON.parse(taskListJSON)
		// map mảng thành object
		for (var i = 0; i < taskListFromLocal.length; i++) {
			const task = taskListFromLocal[i]
			const localTask = new Task(
				task.id,
				task.content
				// task.status
			)
			// taskList.push(localTask)
			doneTaskList.push(localTask)
		}
		// sau khi đưa task vào mảng thì hiển thị ra
		// renderTask()
		renderTaskDone()
	}
}
getDataTaskDone()


// Validation 
const checkRequired = function(value,idMessage,message){
  if(!value.length){
    document.getElementById(idMessage).innerHTML = message;
    return false;
  } else{
    document.getElementById(idMessage).innerHTML = '';
    return true;
  }
}

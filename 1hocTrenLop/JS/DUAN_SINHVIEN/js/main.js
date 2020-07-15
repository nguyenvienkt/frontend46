var gradeList = []; // khai báo mảng global để còn xài sau

// fucntion 1 - lấy danh sách điểm từ giao diện đưa vào mảng để dùng

function getGradesFromUI(){
	var tdTagList = document.querySelectorAll('#tableSinhVien tbody tr td:nth-child(4)');
	for(var i=0;i<tdTagList.length;i++) {
		gradeList.push(+tdTagList[i].innerHTML); // ép kiểu sang number, dùng method push lên mảng gradeList
		console.log(gradeList);
	}



	console.log(tdTagList);
}


// fucntion 2 - chức năng 2: Tính điểm trung bình của toàn bộ sinh viên

function calcAverage() {
	//sudo code
	// 1. duyệt mảng gradeList bằng vòng for, cộng dồn tất cả phần tử trong mảng và chia cho độ dài mảng
	// var sum = 0; duyệt for cộng dồn biến sum
	//2.  lấy sum/ độ dài mảng
	// 3. log điểm trung bình
	var sum = 0
	for (var i = 0; i < gradeList.length; i++) {
		sum += gradeList[i]
	}

	var diemTrungBinh = sum / gradeList.length


	console.log(diemTrungBinh) // Không làm tròn
	console.log(diemTrungBinh.toFixed(2)) // làm tròn phần thập phân --> chuỗi
	console.log(+diemTrungBinh.toFixed(2)) // làm tròn phần thập phân --> số
	console.log(1*diemTrungBinh.toFixed(2)) // làm tròn phần thập phân --> số
	console.log(Math.floor(diemTrungBinh)) // làm tròn xuống Math.floor
	console.log(Math.ceil(diemTrungBinh)) // làm tròn lên Math.floor
	console.log(Math.round(diemTrungBinh)) // làm tròn tự động
}



// function 3: Tìm điểm cao nhất trong danh sách

function findMaxAndSecond (){
	var max = gradeList[0]; // mặc định phần tử đầu tiên là lớn nhất
	var second = null;
	for (var i = 1; i<gradeList.length; i++){
		
		if(gradeList[i] > max) {
			second = max;
			max = gradeList[i];

		} else if(gradeList[i] >second && gradeList[i] !==max) {
			second = gradeList[i];
		}
	}
	console.log(max);
}
// function 4: Tìm điểm thấp nhất trong danh sách
// funtion 5: update function 3, tìm cao nhất và cao nhì trong ds
// funciton 6: kiểm tra có sinh viên nào dưới 5 điểm hay ko?
// function 7: sắp xếp danh sách điểm tăng dần



getGradesFromUI()
calcAverage() // tính điểm trung bình chạy dưới hàm UI;
findMaxAndSecond()// tìm max
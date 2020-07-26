// PHẦN ĐĂNG KÝ

function ktraBatBuocDangKy (){
  var pthongbao = document.getElementById('pthongbao');
  var nghenghiep = document.getElementById('nghenghiep');
  var nam = document.getElementById('nam');
  var nu = document.getElementById('nu');
  if(
    formDangKy.tendangnhap.value ==""|| 
    formDangKy.matkhau.value =="" || 
    formDangKy.email.value ==""||
    formDangKy.tuoi.value ==""
  ) {
    formDangKy.tendangnhap.style.border = "solid 2px red"; 
    formDangKy.matkhau.style.border = "solid 2px red";
    formDangKy.email.style.border = "solid 2px red";
    formDangKy.tuoi.style.border = "solid 2px red";
    pthongbao.style.display= "block";

    
    
    pthongbao.innerHTML = "Bạn cần nhập dữ liệu cho các trường đầy đủ"+"<br>"
    return false;
  } else if (nghenghiep.selectedIndex == 0) {
    pthongbao.style.display = 'block'
    pthongbao.innerHTML = 'Bạn phải chọn nghề nghiệp <br>'
    return false;
  } else if(!nam.checked && !nu.checked){
    pthongbao.style.display = 'block'
		pthongbao.innerHTML = 'Bạn phải chọn giới tính'
		return false;
    
  } else{
    pthongbao.style.display = 'none'
    return true
  }
}

// kiểm tra chiều dài dữ liệu nhập vào
function ktrChieuDaiChuoi(idText,minlength,maxlength) {
  var inputText = document.getElementById(idText);
  var field = inputText.value;
  var pthongbao = document.getElementById('pthongbao')
  if(field.length <minlength || field.length >maxlength){
    pthongbao.style.display = "block";
    pthongbao.innerHTML = "Tên đăng nhập nhập tối đa 30 kí tự"
    return false;
  } else {
    pthongbao.style.display = "none"
    return true;
  }
}
 
// Kiểm tra email
function ktraEmail(idTag){
  var inputTag = document.getElementById(idTag);
  var email = /^([\w\.])+@([a-zA-Z0-9\-])+\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
  var pthongbao = document.getElementById('pthongbao')
  if(inputTag.value.match(email)) {
    pthongbao.style.display = "none";
    return true;
  } else {
    pthongbao.style.display = "block";
    pthongbao.innerHTML = "Vui lòng nhập đúng định dạng email";
    // theP.style.color = "red";
    return false;
  }
  
}

// kiểm tra tuổi

function kiemtraTuoi(minTuoi, maxTuoi, idTagThongBao){
  var pthongbao = document.getElementById(idTagThongBao);
  var tuoi = document.getElementById('tuoi');
  var numbers = /^[0-9]+$/;

  if(tuoi.value.match(numbers)){
    var intTuoi = parseInt(tuoi.value);
    if(intTuoi > maxTuoi || intTuoi < minTuoi) {
      pthongbao.style.display = "block";
      pthongbao.innerHTML = "Vui lòng nhập tuổi từ " + minTuoi + " đến "+maxTuoi;
      return false; 
    } else {
      pthongbao.style.display = "none";
      return true;
    }

  } else {
    pthongbao.style.display = 'block'
    pthongbao.innerHTML = 'Vui lòng chỉ nhập số';
    return false;
  }

}

function ktraHopLe(){
  return (
		ktraBatBuocDangKy() &&
		ktrChieuDaiChuoi('tendangnhap', 1, 30) &&
		ktraEmail('email') &&
		kiemtraTuoi(18, 40, 'pthongbao')
	)
	
	
}


// PHẦN ĐĂNG NHẬP
function ktranhaplieu() {
  var loidangnhap = document.getElementById('loidangnhap')
  if (
    formDangNhap.iddangnhap.value ==""|| 
    formDangNhap.idmatkhau.value =="")
    {
    formDangNhap.iddangnhap.style.border = "2px solid red"
    formDangNhap.idmatkhau.style.border = "2px solid red"

    loidangnhap.style.display = "block";
    loidangnhap.innerHTML = "Vui lòng nhập giá trị"
    return false;
  } else {
    loidangnhap.style.display = "none";
    return true;
  }
}

function ktraBaMuoiKyTu (idKiemTra, minKyTu, maxKyTu) {
   var inputDangNhap = document.getElementById(idKiemTra)
		var giaTri = inputDangNhap.value
		var loidangnhap = document.getElementById('loidangnhap')
		if (giaTri.length < minKyTu || giaTri.length > maxKyTu) {
			loidangnhap.style.display = 'block'
			loidangnhap.innerHTML = 'Tên đăng nhập nhập tối đa 30 kí tự'
			return false
		} else {
			loidangnhap.style.display = 'none'
			return true
		}
}

function ktraDangNhap(){
  return ktranhaplieu() && ktraBaMuoiKyTu('iddangnhap', 1, 30)
}
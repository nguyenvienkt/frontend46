console.log('Hello nhe')

let name = 'Cybersoft'

name = 'Hello Cybersoft'
// name = 5

console.log(typeof name)

/** Khác nhau biến var và let 
// khi sử dụng var thì JS sẽ mang khai báo biến lên đầu tiên
console.log(a)
var a = 1

// khi sử dụng let thì JS sẽ ko mang biến lên đầu tiên
console.log(b)
let b = 2
*/

// biến const

const fullName = 'OK'
//fullName = 'YES'

let isLogin = false //typeof boolean

let firstName = null //typeof là object

let lastName //typeof undefined

console.log(typeof firstName)
console.log(typeof lastName)
console.log(typeof isLogin)

let sinhVien = {
	ten: 'A',
	tuoi: 20,
	lop: 'FE46',
}

console.log(sinhVien.ten, sinhVien.tuoi, sinhVien.lop)

let username = 'Dan'
let username1 = username

username1 = 'Teo'

// kiểu dữ liệu tham chiếu
let sinhVien1 = sinhVien
sinhVien1.ten = 'B'
console.log(sinhVien.ten)

// tạo ra biến sinh vien 2 mới tạo vùng nhớ mới và mang biến sinhVien gán vào
let sinhVien2 = Object.assign({}, sinhVien)
sinhVien2.lop = 'FE50'
console.log(sinhVien.lop)
console.log(sinhVien2.lop)

let num1 = 5 + 6
let num2 = 10 - 6
let num3 = 1 + '1'
let num4 = '1' + 1
let num5 = 'a' / 5
let num6 = 2 ** 3 // lũy thừa 2 mũ 3 = 2*2*2=8 = Math.pow(2,3)

console.log(num1)
console.log(num2)
console.log(num3)
console.log(typeof num3)
console.log(num4)
console.log(num5)
console.log(num6)

// Array index của mảng array bắt đầu từ 0
let car = ['Honda', 'Toyota', 'Audi', 'Vinfast', 'Ford', 'Truong Hai']
console.log(typeof car)
console.log(car.length)
console.log(car[1])

console.log(car[car.length - 1]) // lấy giá trị cuối cùng của mảng

// duyệt các phần tử, hiển thị trong mảng
for (let i = 0; i < car.length; i++) {
	console.log(car[i])
}

console.log(car)
// thêm phần tử vào cuối mảng push
car.push('Mercedes')

console.log(car[car.length - 1]) // lấy giá trị cuối cùng của mảng
console.log(car)

// Xóa ở cuối mảng hàm pop
let lastCar = car.pop()
console.log(car)

// Thêm phần tử vào đầu mảng
car.unshift('Ferari')
console.log(car)

// Xóa phần tử đầu mảng
let firstCar = car.shift()
console.log(car)

// Xóa giữ mảng thì cần phải biết vị trí
car.splice(2, 1) // xóa vị trí thứ 2 và chỉ xóa 1 phần tử (vị trí, số lượng)
console.log(car)

console.log(`
Bài Tập 1:
Cho mảng a = [3,-6,8,-9,-4,5,12]
 1. Tính tổng cảc số trong mảng a
 2. Tìm phần tử âm lớn nhất trong mảng a. Xuất giá trị và chỉ số tại vị trí đó
 3. Tính tổng các số lẻ trong mảng a
 4. Tìm số lớn nhất trong mảng a và xuất chỉ số tại đó
 Lưu ý: 
// So sánh 2 dấu bằng 1 == "1" --> trả về true vì chỉ so sánh giá trị
// So sánh 3 dấu bằng 1 ==="1" --> trả về false vì ngoài giá trị còn so sánh kiểu dữ liệu
`)

let a = [3, -6, 8, -9, -4, 5, 12]

let tong = 0 // tạo giá trị ban đầu là 0 vì nếu ko thì tong gia trị là undefine. xong cộng số thì sẽ bị lỗi NaN
let tongLe = 0
let tongChan = 0
let giaTriAm = -Number.MAX_VALUE
let viTriAm = null
let giaTriLonNhat = a[0]
let viTriLonNhat = 0

for (let i = 0; i < a.length; i++) {
	//1. Tính tổng cảc số trong mảng a
	tong += a[i]

	//2.
	if (giaTriAm < a[i] && a[i] < 0) {
		giaTriAm = a[i]
		viTriAm = i
	}

	//3. Tính tổng các số lẻ trong mảng a
	if (a[i] % 2 === 0) {
		tongLe += a[i]
	} else {
		tongChan += a[i]
	}

	//4.Tìm số lớn nhất trong mảng a và xuất chỉ số tại đó
	if (giaTriLonNhat < a[i]) {
		giaTriLonNhat = a[i]
		viTriLonNhat = i
	}
}
console.log('--------------Kết Quả')
//1
console.log(tong)
// 2
console.log(giaTriAm)
console.log(viTriAm)
//3
console.log(tongLe)
console.log(tongChan)
//4
console.log(giaTriLonNhat)
console.log(viTriLonNhat)
console.log('--------------END')
let x = 5
while (x > 0) {
	x--
	console.log(x)
}

console.log('Hàm tái sử dụng, dễ bảo trì, phân quyền')
console.log('Khai báo biến thì chỉ có tác dụng trong hàm thôi')

console.log(`HÀM tính tổng cách 1 khai báo hàm như sau:
function tinhTong(x, y) {
	return x + y
}`)
function tinhTong(x, y) {
	return x + y
}

let tong1 = tinhTong(2, 5)
let tong2 = tinhTong(10, 20)

console.log('Giá trị hàm tinhTong')
console.log(tong1)
console.log(tong2)

console.log(`Hàm tính hiệu cách 2 khai báo hàm như sau: 
let tinhHieu = function (x, y) {
	return x - y
}`)
let tinhHieu = function (x, y) {
	return x - y
}

console.log(`
Bài Tập 2:
Viết chương trình sử dụng hàm để xếp loại sinh viên theo yêu cầu sau:
ĐTB (9->10): Xuất sắc
ĐTB (8>9): Giỏi
ĐTB (7-8): Khá
ĐTB (6-7): Trung bình khá
ĐTB (5-6): Trung bình
ĐTB (<5): Yếu

* Xây dựng 3 hàm
 - Hàm tính điểm trung bình, sử dụng 3 tham số: Toán, lý, hóa
 - Hàm xếp loại
 - Hàm chỉnh sử dụng hàm trên
* Sử dụng console.log để xuất kết quả

`)

function tinhDiemTB(diemToan, diemLy, diemHoa) {
	return (diemToan + diemLy + diemHoa) / 3
}

function xepLoai(dtb) {
	let xepLoai = ''

	if (dtb >= 9) {
		xepLoai = 'Xuất Sắc'
	} else if (dtb >= 8) {
		xepLoai = 'Giỏi'
	} else if (dtb >= 7) {
		xepLoai = 'Khá'
	} else if (dtb >= 6) {
		xepLoai = 'Trung bình khá'
	} else if (dtb >= 5) {
		xepLoai = 'Trung Bình'
	} else if (dtb < 5) {
		xepLoai = 'Yếu'
	}

	return xepLoai

	// if(dtb >=9){
	//   return "Xuất sắc"
	// }
	// if(dtb>=8) {
	//   return "Giỏi"
	// }
	// if(dtb>=7){
	//   return "Khá"
	// }
}

function baiTap() {
	// tinhDiemTB
	// xepLoai
	let dtb = tinhDiemTB(5, 7, 9)
	let xepLoai1 = xepLoai(dtb)
	console.log(xepLoai1)
}
// gọi hàm baiTap ra chạy
console.log('Xếp Loại là: ')
baiTap()

console.log(`
function Test(){
  var a = 5
  if (a > 0){
    var = 10
  }
  console.log(a) --> a = 10
}

function Test1(){
  let a = 5
  if (a>0){
    let a = 10
  }
  console.log(a) --> a = 5
}



`)

function Test() {
	var a = 5
	if (a > 0) {
		var a = 10
	}
	console.log(a)
}

function Test1() {
	let b = 5
	if (b > 0) {
		let b = 10
	}
	console.log(b)
}

console.log(`DOM`)

// document.getElementById('name').value = 'OK bưởi'

function handleClick() {
	let value = document.getElementById('name').value
	let content = document.getElementById('content')
	// thay đổi nội dung
	content.innerHTML = value
	// thay đổi style. Lưu ý viết camel cho thuộc tính CSS
	content.style.color = 'red'
	content.style.fontWeight = 'bold'
	content.style.letterSpacing = '5px'
	content.style.fontSize = '30px'
	content.style.textTransform = 'uppercase'
	// Thêm class vào
	content.classList.add('active')
	// Remove class
	content.classList.remove('active')
}

console.log(`
Tạo JS cho bật tắt đèn
`)

function batDen() {
	// document.getElementById('bongden').src = './pic_bulbon.gif'
	document.getElementById('bongden').setAttribute('src', './pic_bulbon.gif')
}

function tatDen() {
	// document.getElementById('bongden').src = './pic_bulboff.gif'
	document.getElementById('bongden').setAttribute('src', './pic_bulboff.gif')
}

console.log(
	`Bài 2 ===========================================================================`
)

console.log(`
Bài 2: 2-Jul-2020
Từ bài này chuyển qua var. Không dùng let nữa nha

`)

// Khai bào function kiểu 1
// declaration function
function calcSum(a, b) {
	return a + b
}

var sum = calcSum(4, 2)

console.log(sum)
console.log(calcSum(2, 6))

// Khai báo function kiểu 2 là expression function. tạo hàm đưa vào biến
const calcSum1 = function (c, d) {
	// hàm function() --> anomynus function
	return c + d
}

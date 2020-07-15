// BẢNG GIÁ UBER tạo biến global sử dụng trong file này trong tất cả các hàm. Nếu hằng số viết hoa hết
const UBER_X_FIRST_PRICE = 8000
const UBER_X_MIDDLE_PRICE = 12000
const UBER_X_LAST_PRICE = 10000
const UBER_X_WAITING_PRICE = 2000

const UBER_SUV_FIRST_PRICE = 9000
const UBER_SUV_MIDDLE_PRICE = 14000
const UBER_SUV_LAST_PRICE = 12000
const UBER_SUV_WAITING_PRICE = 3000

const UBER_BLACK_FIRST_PRICE = 10000
const UBER_BLACK_MIDDLE_PRICE = 16000
const UBER_BLACK_LAST_PRICE = 14000
const UBER_BLACK_WAITING_PRICE = 4000

function main() {
	//input: dữ liệu lấy được và không cần tính toán
	// Loại xe, số km, thời gian chờ
	//process:
	/**
	 * 1. lấy được input
	 *    1.1 số km, thời gian chờ: dom tới input lấy value
	 *    1.2 Loại xe: dom tới 3 cái input radio, kiểm tra ô nào được check
	 *    là người dùng chọn xe đó
	 * 2. Tính tiền
	 *    2.1 switch case loại xe nào thì dùng bảng giá đó
	 *    2.2 xây dựng công thức tính tiền (UBERX)
	 *      km <= 0.5km, thời gian chờ 2 phút --> =8000 + 2000 * 2
	 *      km > 1 <=20, km = 15km, chờ 2 phút --> = 8000*1 + (12000*14) + 2000 * 2
	 *      km > 20, km = 23km, chờ 0 phút --> 8000* 1 + (12000*19) + (3 * 10000)
	 * 3. xuất tổng tiền ra màn hình
	 */
	//output: tiền

	var distance = document.getElementById('txtKm').value
	var waitingTime = document.getElementById('txtTime').value
	var uberType
	var totalAmount = 0

	//console.log(distance, waitingTime);

	// chuyển dữ liệu từ distance & waiting time sang số vì khi user nhập vào thì nó luôn là chuỗi
	// chuỗi trừ, nhân, chia với số thì ra số

	// 1. ParseFloat và ParseInt
	//distance = parseFloat(distance); // vế phải chạy trước gán cho vế trái
	// waitingTime = parseFloat(waitingTime); // vế phải chạy trước

	// 2. lấy * 1 ra số
	// distance = distance * 1;
	// waitingTime = waitingTime * 1;

	// 3. dùng dấu cộng (+) trước biến
	distance = +distance
	waitingTime = +waitingTime

	// console.log(distance, waitingTime)

	// Chạy hàm check loại xe
	uberType = checkUberType()
	// khi user không chọn loại xe nào thì sẽ trả về undefined, và sau đó dừng luôn.
	// if(uberType === undefined) return;
	if (!uberType) return // nếu uberType là true thì

	// Nếu check được loại xe thì tính tiền

	switch (uberType) {
		case 'uberX':
			totalAmount = calcTotalAmount(
				distance,
				waitingTime,
				UBER_X_FIRST_PRICE,
				UBER_X_MIDDLE_PRICE,
				UBER_X_LAST_PRICE,
				UBER_X_WAITING_PRICE
			)
			break

		case 'uberSUV':
			totalAmount = calcTotalAmount(
				distance,
				waitingTime,
				UBER_SUV_FIRST_PRICE,
				UBER_SUV_MIDDLE_PRICE,
				UBER_SUV_LAST_PRICE,
				UBER_SUV_WAITING_PRICE
			)
			break

		case 'uberBlack':
			totalAmount = calcTotalAmount(
				distance,
				waitingTime,
				UBER_BLACK_FIRST_PRICE,
				UBER_BLACK_MIDDLE_PRICE,
				UBER_BLACK_LAST_PRICE,
				UBER_BLACK_WAITING_PRICE
			)
			break

		default:
			return
	}

	// Hiện tổng tiền ra giao điện
	document.getElementById('divThanhTien').style.display = 'block'
	document.getElementById('xuatTien').innerHTML =
		totalAmount.toLocaleString() + ' VND'
}

// Function check loại xe
function checkUberType() {
	var uberXInput = document.getElementById('uberX')
	var uberSUVInput = document.getElementById('uberSUV')
	var uberBlackInput = document.getElementById('uberBlack')

	/**
	 * Khái niệm Truthy và falsy trong Javascript
	 * |=======================================|
	 * |Truthy        |      falsy            |
	 * |=======================================|
	 *                |       0
	 *                |       ""
	 *                |       null
	 *                |       undefined
	 *                |       false
	 * ========================================
	 */
	if (uberXInput.checked) return 'uberX'

	if (uberSUVInput.checked) return 'uberSUV'

	if (uberBlackInput.checked) return 'uberBlack'

	alert('Vui lòng chọn loại xe đi bạn!')
}

// function tính tiền

function calcTotalAmount(
	distance,
	waitingTime,
	firstPrice,
	middlePrice,
	lastPrice,
	waitingPrice
) {
	if (distance <= 1) {
		return distance * firstPrice + waitingTime * waitingPrice
	} else if (distance > 1 && distance <= 20) {
		return (
			firstPrice + (distance - 1) * middlePrice + waitingTime * waitingPrice
		)
	} else {
		return (
			firstPrice +
			middlePrice * 19 +
			(distance - 20) * lastPrice +
			waitingTime * waitingPrice
		)
	}
}

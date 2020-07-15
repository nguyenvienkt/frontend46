/*

// khai báo mảng 
var numArr = [1,2,3,4,5,"1",true,undefined];

console.log(numArr[3]); // xem phần từ mảng

numArr.push(10); // thêm phần tử vào đầu mảng

console.log(numArr); //

numArr.unshift(0); // thêm vào đầu mảng

numArr.pop(); // xóa phần tử cuối mảng

numArr.shift() // xóa phần từ đầu

console.log(numArr);

numArr.splice (3,2); // xóa phần tử ở vị trí bất kỳ (vị trí muốn xóa, số phần tử xóa)

console.log(numArr);

// vòng lặp xử lý tình huống

for(var i=2;i<10;i++){
  console.log(i);
}

// vòng lặp while. khi thỏa điều kiện thì chạy while điều kiện thì chạy
var j=0
while(j !==0 ){
  console.log(j);
}

*/

// Bài 1: Viết hàm truyền vào 1 con số và kiểm tra xem có phải là số nguyên tố hay không
// số nguyên tố là số chia hết cho 1 và chính nó. ví dụ 3, 5, 7, 11, 13, 15
/*
function checkPrime(num) {
  var count = 0
  for(var i = 2; i<num; i ++){
    if(num % i === 0 ) {
      count = count++;
    }

    if(count === 0 ) {
      return true;
    }
    return false;

  }

}
*/


function checkPrime(num) {
  if(num <=1) {
    return false;
  }

	for (var i = 2; i <= num/2; i++) {
		if (num % i === 0) {
			return false;
		}
		
  }
  
  return true;
}
// console.log(checkPrime(7)); // log ra giá trị hàm trả về
// console.log(checkPrime(5)); // log ra giá trị hàm trả về


// Excercise 2: Kiểm tra và in ra số lẻ trong mảng
function checkOdd(arr){
  // 1 dùng vòng lặp, lặp arr
  for(var i = 0; i<arr.length;i++){
    if(arr[i] % 2 === 1 ){
      console.log(arr[i] + ' là số lẻ');
    }
    
  }


}

checkOdd([3,4,5,6,2,7,8,2,1,99,2]);

// Exercise 3: cho 1 mảng ngẫu nhiên, yêu cầu kiểm tra trong mảng có 2 số bất kỳ có tổng là 10
// hay không? Nếu có thì trả ra true, nếu không thì trả ra false.


function checkSum(mang){
  for(var i = 0; i <mang.length; i++){
    for(var j =i+1;j<mang.length;j++){
      if(mang[i]+mang[j] ===10) {
        return true;
      }
    }
  }
  return false;
}



// console.log(checkSum([1,4,6,7,6]));

//Big O Notion --> độ phức tạp của thuật toán dựa vào số lượng operator (cộng trừ nhân chia, toán tử...) (hành động tính toán) càng nhiều thì càng phức tạp.0
// Excerceise 4: cho 1 mảng số được sắp xếp tăng dần,yêu cầu kiểm tra trong mảng có 2 số bất kỳ có tổng là 10
// hay không? Nếu có thì trả ra true, nếu không thì trả ra false.
// dùng thuật toán multiple point - đa điểm

function checkSum(arr){
// [1,2,3,4,5,6,13]
var i = 0;
var j = arr.length - 1;
while(i < j){
  if (arr[i] + arr[j] === 10 ) return true;
  if(arr[i] + arr[j] > 10) j--;
  if(arr[i] + arr[j] < 10) i++;
}
return false;

}

console.log(checkSum([1,2,3,4,5,6,13]))

// Bài cho 1 mảng trùng lặp, yêu cầu lọc lọc ra mảng unique đã bỏ những phần tử trùng lặp
// Cách 1: tạo 1 mảng rỗng cho từng số mảng cũ vào mảng rỗng mới, nếu chưa có thì đưa phần tử từ 
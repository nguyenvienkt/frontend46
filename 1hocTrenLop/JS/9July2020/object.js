// alert('hello')
// khởi tạo lớp đối tượng chó để tất cả các con chó phải theo định dạng này prototype. là khái niệm chữa cháy cho class trong javascript
// function Contructor để khởi tạo lớp Cho như bên dưới
function Cho(id, ten, loai, mau, tuoi, tiemNgua) { // vì là lớp đối tượng nên viết hoa chữ cái đầu tiên phân biệt với biến, đối tượng khác
  this.id = id;
  this.ten = ten;
  this.loai = loai;
  this.mau = mau;
  this.tuoi = tuoi;
  this.tiemNgua = tiemNgua;
  this.sua = function(){
    console.log('gau gau', this.ten);
  };

}

// khởi tạo đối tượng của lớp Cho là instance thể hiện cho1, cho2
var cho1 = new Cho(1,'gaugau','Phú Quốc','Vàng',30,true);
var cho2 = new Cho(2,'mực','Husky','Xám vàng',20,true);

// var cho1 = {
//   // thuộc tính
//   ten: 'meo',
//   loai: 'alaska',
//   mau: 'trang',
//   tuoi:49,
//   // phương thức lưu hàm
//   sua: function() {
//     console.log("hello, how are you?",cho1.ten);
//     console.log("hello, how are you?",this.ten); // vì đang ở trong đối tượng cho1.
//   },

// };
// var cho2 = {
//   // thuộc tính
//   ten: 'mực',
//   loai: 'phú quốc',
//   mau: 'xám tro',
//   tuoi:60,
//   // phương thức lưu hàm
//   sua: function() {
//     console.log("thank you, I'm fine");
//   },

// };

// không chấm undefinded được

console.log(cho1.ten, cho1.tuoi, cho1.loai, cho1.mau);
cho1.sua()
console.log(cho2.ten, cho2.tuoi, cho2.loai, cho2.mau);
cho2.sua()

var trungTamNuoiCho = {
  diaChi:"331 Nguyễn Du, Quận 1, TP. HCM",
  ten:"Cybersoft",
  soDT:'0987878787',
  giamDocs: [
    {id:1,
    ten:'Nguyen Van A',
     tuoi:12
    },

     {
      id:2,
      ten: 'Nguyễn Văn B',
      tuoi:33
    },
  ],
  
  danhSachCho: [cho1, cho2],
}

// for (var i = 0; i < trungTamNuoiCho.giamDocs.length;i++) {
//   console.log(trungTamNuoiCho.giamDocs[i].ten)
// }

trungTamNuoiCho.giamDocs[0].ten = "Nguyễn Văn A Sửa";
trungTamNuoiCho.giamDocs[0].tuoi = 40;

delete trungTamNuoiCho.giamDocs[1].tuoi;

console.log(trungTamNuoiCho)
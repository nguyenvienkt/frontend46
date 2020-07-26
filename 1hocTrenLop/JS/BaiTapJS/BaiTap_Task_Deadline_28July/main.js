/**
 * Lớp đối tượng task (id, title, status, function(){change status})
 * add, delete, update (thêm bút chì vào cạnh delete)
 * render() --> viết y chang và render ra dynamic, mỗi task là 1 item
 * hàm render có 2 chức năng --> đã hoàn thành, và chưa hoàn thành
 * filter()
 * Lọc ra task status false thì chưa hoàn thành
 * lọc ra taks status true thì hoàn thành rùi
 * Có 2 cách: 1 là 2 mảng incomplete Task [] và complete task []
 * cách 2 là: tạo 1 mảng tasks[] và mỗi lần render thì filter theo status của task
 */
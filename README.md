# 🚀 Code Generation & Automation Workshop

Chào mừng các bạn đến với Demo Project của buổi thuyết trình **"Code Generation and Automation"**.  
Project này minh họa cách tự động hóa quy trình phát triển phần mềm Backend (Node.js/Express) từ khâu khởi tạo, sinh mã (Generation) đến tái cấu trúc (Refactoring) bằng AST.

---

## ⚙️ Cài đặt (Installation)

### 1. Clone dự án
### 2.  Cài đặt thư viện: Mọi người có thể copy các câu lệnh dưới đây là gán vào terminal
## 2.1 Cài đặt các thư viện chính
        npm i
## 2.2. Cài đặt Hygen
        npm install -g hygen
## 2.3. Cài đặt thư viện xử lý AST (Dev Dependencies)
        npm install --save-dev @babel/core @babel/parser @babel/traverse @babel/generator @babel/types


## 🎬 Kịch bản thực hành (Workshop Walkthrough)
Chào mừng các bạn đến với phần thực hành! Trong workshop này, chúng ta sẽ đóng vai một đội ngũ phát triển phần mềm (Dev Team) cần xây dựng nhanh một hệ thống Backend API quản lý Sản phẩm (Product).

Chúng ta sẽ đi qua quy trình 4 bước từ con số 0 đến một hệ thống hoàn chỉnh, sử dụng các công cụ tự động hóa.
Tạo tính năng mới (Generation & DSL)
Mục tiêu: Sử dụng DSL (Domain Specific Language) đơn giản để sinh trọn bộ code cho tính năng Product.

## Chạy lệnh tạo API với các trường dữ liệu mong muốn:
    hygen api new --name Customer --fields name:string,phone:number,address:string
Kiểm tra kết quả:

src/models/Customer.js: Model được tạo ra và kế thừa BaseModel.

src/controllers/CustomerController.js: Controller chứa logic xử lý cơ bản (nhưng hiện tại đang code trực tiếp gọi Database - "Code xấu").

app.js: Tự động được thêm dòng đăng ký route (app.use...) nhờ kỹ thuật Code Transformation.
## Refactoring:
    hygen refactor extract-service --name Customer

<img width="328" height="788" alt="image" src="https://github.com/user-attachments/assets/4b66ef0b-61c7-4250-b5bc-4aed3fbb93bf" />

## Tự động Tái cấu trúc (AST Refactoring - Magic Step 🎩)
Mục tiêu: Sửa chữa "Code xấu" (Fat Controller) thành "Code đẹp" (Service Layer) một cách an toàn bằng AST.

Tình huống: File CustomerController.js hiện tại đang chứa logic gọi Database trực tiếp. Chúng ta cần tách logic này sang Service Layer mà không làm mất code cũ.

## Chạy lệnh "phẫu thuật" code bằng AST:
    node scripts/apply_ast.js
Kiểm tra kết quả (Điều kỳ diệu):

Mở src/services/CustomerService.js: File này mới xuất hiện, chứa toàn bộ logic DB cũ.
Mở src/controllers/CustomerController.js: Code đã được viết lại gọn gàng, chuyển sang gọi CustomerService.create().

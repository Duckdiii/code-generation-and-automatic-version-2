const fs = require('fs');
const path = require('path');

const parser = require('@babel/parser'); //Đọc code thành sơ đồ (AST)
const traverse = require('@babel/traverse').default; //Duyệt và chỉnh sửa AST
const generate = require('@babel/generator').default; // Chuyển AST về code
const t = require('@babel/types'); // Tạo và kiểm tra các node AST

const controllerPath = 'src/controllers/CustomerController.js';
const servicePath = 'src/services/CustomerService.js';

if (!fs.existsSync(controllerPath)) {
    console.error("Không tìm thấy Controller!");
    process.exit(1);
}

const code = fs.readFileSync(controllerPath, 'utf8');
const ast = parser.parse(code, { sourceType: 'module' });

let extractedBody = null;

console.log("Đang phẫu thuật tách hàm create...");

traverse(ast, {
    ObjectProperty(path) {
        // Tìm hàm 'create'
        if (path.node.key.name === 'create' && t.isArrowFunctionExpression(path.node.value)) {

            
            extractedBody = path.node.value.body; //là toàn bộ code nằm trong dấu { ... } của hàm cũ.

            const newBodyCode = `
        {
          const data = req.body;
          // Logic đã được chuyển sang Service bởi AST
          const result = await CustomerService.create(data);
          res.status(201).json(result);
        }
      `;
            // Parse đoạn code string này thành AST node để nhét vào
            const newBodyAST = parser.parse(newBodyCode, { sourceType: 'module' }).program.body[0];

            path.node.value.body = newBodyAST;
        }
    }
});

// Thêm dòng import CustomerService vào đầu Controller
const importDecl = t.variableDeclaration('const', [
    t.variableDeclarator(
        t.identifier('CustomerService'),
        t.callExpression(t.identifier('require'), [t.stringLiteral('../services/CustomerService')])
    )
]);
ast.program.body.unshift(importDecl);

// Ghi lại file Controller mới
const controllerOutput = generate(ast, {}, code);
fs.writeFileSync(controllerPath, controllerOutput.code);
console.log("[Controller] Đã thay thế logic bằng lời gọi Service.");


// --- PHA 2: TẠO SERVICE VỚI NỘI DUNG VỪA CẮT ---

if (extractedBody) {
    // Tạo khung sườn Class Service bằng Template String cho nhanh
    // Nhưng quan trọng là ta sẽ nhét cái 'extractedBody' vào giữa

    const serviceTemplate = `
    const db = require('../db');
    class CustomerService {
      async create(req, res) {
         // Placeholder để AST thay thế
      }
    }
    module.exports = new CustomerService();
  `;

    const serviceAst = parser.parse(serviceTemplate, { sourceType: 'module' });

    // Tìm chỗ placeholder để dán code cũ vào
    traverse(serviceAst, {
        ClassMethod(path) {
            if (path.node.key.name === 'create') {
                // DÁN (PASTE): Nhét nội dung đã cắt từ Controller vào đây
                path.node.body = extractedBody;
            }
        }
    });

    const serviceOutput = generate(serviceAst, {}, serviceTemplate);

    // Đảm bảo thư mục tồn tại
    if (!fs.existsSync(path.dirname(servicePath))) {
        fs.mkdirSync(path.dirname(servicePath), { recursive: true });
    }

    fs.writeFileSync(servicePath, serviceOutput.code);
    console.log("[Service] Đã tạo file Service chứa logic cũ của Controller.");
}
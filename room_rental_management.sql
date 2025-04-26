
-- Tạo bảng hình thức thanh toán
CREATE TABLE payment_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Tạo bảng thông tin thuê phòng trọ
CREATE TABLE room_rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_code VARCHAR(10) NOT NULL,
    tenant_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    start_date DATE NOT NULL,
    payment_type_id INT NOT NULL,
    notes TEXT,
    FOREIGN KEY (payment_type_id) REFERENCES payment_types(id)
);

-- Thêm dữ liệu vào bảng hình thức thanh toán
INSERT INTO payment_types (name) VALUES 
('Theo tháng'),
('Theo quý'),
('Theo năm');

-- Thêm một số dữ liệu mẫu vào bảng thông tin thuê phòng trọ
INSERT INTO room_rentals (room_code, tenant_name, phone_number, start_date, payment_type_id, notes) VALUES
('PT-001', 'Nguyễn Văn An', '0987654321', '2025-04-01', 1, 'Đã thanh toán tháng đầu'),
('PT-002', 'Trần Thị Bình', '0912345678', '2025-04-10', 2, 'Cọc 1 triệu'),
('PT-003', 'Lê Văn Chung', '0923456789', '2025-04-15', 3, 'Phòng tầng 2');

-- Tạo trigger để tạo mã phòng trọ tự động
DELIMITER $$
CREATE TRIGGER before_insert_room_rental
BEFORE INSERT ON room_rentals
FOR EACH ROW
BEGIN
    DECLARE next_id INT;
    SET next_id = (SELECT IFNULL(MAX(id), 0) + 1 FROM room_rentals);
    SET NEW.room_code = CONCAT('PT-', LPAD(next_id, 3, '0'));
END$$
DELIMITER ;

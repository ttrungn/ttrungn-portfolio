# Thiệp mời tốt nghiệp tạm thời

Nguồn thiết kế đã duyệt: `design-references/thiep-moi-tot-nghiep-nguyen-thanh-trung-fixed.html`. Bản này được tải từ tệp đính kèm của cuộc trò chuyện gốc; giữ nguyên HTML để có thể đối chiếu ở những lần chỉnh sửa tiếp theo. Giao diện React chuyển trực tiếp từ HTML/CSS gốc, dùng DM Sans và Playfair Display qua Google Fonts. CSS phục hồi mặc định trình duyệt bên trong thiệp để tránh Tailwind preflight làm sai thiết kế.

Chạy `npm run dev`; kiểm tra bản phát hành bằng `npm run build` rồi `npm run preview`.

`src/main.tsx` có cờ `SHOW_GRADUATION_SITE = true`. Đổi thành `false` để khôi phục toàn bộ portfolio và router cũ; không cần xóa trang thiệp. CSS trang thiệp được giới hạn trong `.graduation-site`. Component tự khôi phục tiêu đề, mô tả và ngôn ngữ khi tháo khỏi cây React. Không sửa dữ liệu CV hoặc các trang portfolio.

Khi cờ bật, mọi URL trang đều render `GraduationInvitation`, không đổi URL hoặc chuyển hướng tài nguyên/API. Lịch dùng mốc ISO có `+07:00`, dựa trên đồng hồ thiết bị; trước 10:00 đếm ngược, từ 10:00 giữ đồng hồ ở 00 và báo ngày tốt nghiệp đã đến, đúng hành vi HTML đã duyệt. Thông tin buổi lễ vẫn ghi 10:00–12:00. Nhạc tổng hợp nguyên bản bằng Web Audio, chỉ khởi tạo sau khi nhấn nút; không tải nhạc bên ngoài. Giữ khung ảnh của bản HTML, thay nội dung giữ chỗ bằng ảnh tốt nghiệp do người dùng cung cấp tại `public/images/nguyen-thanh-trung-tot-nghiep.jpeg`. Phần mở đầu ghi đầy đủ 10:00 – 12:00. Thiệp chỉ có các phần 01, 02, 03; không có RSVP.

## Truy cập trực tiếp đường dẫn sâu

Repo chưa có cấu hình hosting xác định. Đã thêm `vercel.json` cho Vercel: ưu tiên tệp thật và các hàm đã triển khai, sau đó trả `index.html` cho URL trang; `/api`, `/api/*`, `/assets`, `/assets/*` không dùng fallback. Không có thay đổi nào được triển khai tự động.

Vite dev/preview hỗ trợ SPA fallback. Nếu host thực tế là Nginx, dùng cấu hình tương đương sau trong máy chủ hiện có, giữ nguyên cấu hình API thực tế:

```nginx
location /api/ { try_files $uri =404; } # hoặc giữ upstream API đang dùng
location = /api { try_files $uri =404; }
location /assets/ { try_files $uri =404; }
location / { try_files $uri $uri/ /index.html; }
```

Với host khác, cần cấu hình SPA fallback tương ứng tại host. GitHub Pages không tự hỗ trợ fallback này. Việc đổi flag chỉ thay nội dung React; fallback SPA vẫn hữu ích cho router portfolio khi bật lại.

## Xác minh bản chuyển từ HTML

Build (bao gồm TypeScript), lint và kiểm tra mốc thời gian countdown đã đạt. Đã đối chiếu trong Chrome ở 1280 × 900 và 390 × 844; vị trí, kích thước các phần chính và font khớp bản HTML ở cùng viewport. Nút nhạc bật/tắt được, countdown cập nhật, `/about` và đường dẫn nhiều cấp bất kỳ có query đều hiển thị thiệp; không ghi nhận lỗi console. Nội dung `.reveal` luôn có `opacity: 1`, kể cả khi không có IntersectionObserver hoặc không chạy animation.

# vibecode-slide

Bộ **slide trình chiếu** cho workshop **Vibe Coding từ số 0** (Apero) — dạy người
chưa biết gì về code tự làm một website và đưa lên internet bằng AI.

Xây bằng **Next.js (App Router) + TypeScript**, phong cách giống
[superai.com](https://www.superai.com) (nền trắng, chữ navy, font Manrope, nền
sóng tím chuyển động). Toàn bộ deck **song ngữ Việt / English**.

> 🎓 Dự án **bài tập** cho học viên nằm ở repo riêng:
> [**vibecode-studentwork**](https://github.com/tanpn-fir/vibecode-studentwork)
> (bản demo: https://vibecode-studentwork.vercel.app).

---

## 🚀 Chạy thử

```bash
npm install
npm run dev        # mở http://localhost:3000
```

Build production: `npm run build && npm start`.

---

## 🎮 Điều khiển khi trình chiếu

| Phím / Hành động | Tác dụng |
|---|---|
| `←` `→` (hoặc Space / PageUp-Down) | Chuyển slide |
| `Home` / `End` | Slide đầu / cuối |
| `F` | Bật/tắt toàn màn hình |
| Bấm vào ảnh/video | Phóng to (lightbox) |
| Nút **🌐 EN/VI** (góc trên phải) | Đổi ngôn ngữ (nhớ qua `localStorage`) |
| `#n` trên URL | Tới thẳng slide thứ `n` (vd `/#23`) |
| `?lang=en` / `?lang=vi` | Mở deck ở ngôn ngữ chỉ định |

---

## 📂 Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `lib/deck.ts` | **Trái tim dự án** — toàn bộ nội dung slide + định nghĩa kiểu. Sửa slide ở đây. |
| `lib/i18n.ts` | Chuỗi giao diện (nút, gợi ý phím…) song ngữ VI/EN. |
| `components/Deck.tsx` | Viewer: phím tắt, deep-link, lightbox, đổi ngôn ngữ, theme sáng/tối. |
| `components/Slide.tsx` | Render từng loại slide theo `kind`. |
| `components/Background.tsx` | Nền sóng video. |
| `components/ExercisePrompt.tsx` | Nút hiện & copy prompt trong slide bài tập. |
| `components/StepsDetail.tsx` | Popup "Xem hướng dẫn chi tiết" (ảnh từng bước). |
| `components/ToolIcon.tsx` | Logo công cụ (`/public/icons`), thiếu thì hiện badge chữ. |
| `components/Lightbox.tsx` | Phóng to ảnh/video toàn màn hình. |
| `app/globals.css` | Toàn bộ theme & layout. |
| `public/img`, `public/icons`, `public/profile`, `public/superai` | Ảnh, logo, video nền. |

---

## ✍️ Cách "làm slide"

Mỗi slide là **một object trong mảng `deck`** ở `lib/deck.ts`, phân biệt bằng
trường `kind`. Thêm / sửa / xoá object là xong — không cần đụng component.

Các `kind` có sẵn:

`cover` · `section` · `bullets` · `steps` · `stats` · `columns` · `tools` ·
`gitflow` · `compare` · `image` · `split` · `quote` · `gallery` · `profile` ·
`exercise` · `closing`

### Song ngữ — helper `t(vi, en)`

Mọi chuỗi hiển thị cho người dùng được bọc bằng `t("tiếng Việt", "English")`:

```ts
title: t("Vibe Coding từ số 0", "Vibe Coding from Zero"),
```

`getDeck(lang)` sẽ tự "resolve" mọi `t(...)` thành đúng ngôn ngữ khi render.
Chuỗi **không** bọc `t` (tên riêng, URL, các **prompt** vốn viết bằng tiếng Anh)
sẽ giữ nguyên ở cả hai ngôn ngữ.

### Ảnh

Nhiều slide có cặp `image?` / `placeholder?`:
- Chưa có ảnh → để `placeholder` (mô tả ảnh cần đặt), slide hiện khung tạm.
- Có ảnh thật → thêm `image: "/img/ten-file.png"` (file trong `/public`).

### Slide bài tập (`exercise`)

- `prompt` — prompt (tiếng Anh) học viên bấm để hiện & copy gửi AI.
- `success` — điều kiện "✅ Hoàn thành khi…".
- `detail` — popup ảnh từng bước. `link` — nút mở trang ngoài.
- `advanced` — nội dung mẫu nâng cao để copy.

---

## 🎨 Theme

Bảng màu lấy từ superai.com: nền trắng + chữ navy, accent indigo `#3556eb`,
violet `#9f70fc`, lime `#dbfe52`. Slide `section`/`quote` dùng nền tối để tạo
nhịp; các slide nhiều chữ làm mờ video nền để chữ luôn rõ.

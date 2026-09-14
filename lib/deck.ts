// ===========================================================================
//  SLIDE MODEL
//  Đây là nơi bạn "làm slide". Thêm/sửa/xoá object trong mảng `deck` bên dưới.
//  Mỗi slide có 1 `kind` quyết định layout (xem các interface).
//
//  • Hình ảnh: nhiều slide có field `placeholder` — đây là KHUNG ẢNH TẠM, hiển
//    thị mô tả ảnh cần đặt. Khi có ảnh thật, đổi `placeholder` thành `image`
//    (đường dẫn file trong /public). Ví dụ: image: "/img/abc.png".
//  • Bài tập: slide kind "exercise" có `prompt` — học viên bấm nút để hiện
//    prompt và copy gửi cho AI.
// ===========================================================================

export interface CoverSlide {
  kind: "cover";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  note?: string; // dòng nhấn nhỏ dưới subtitle (vd: tự học cùng AI)
  link?: { label: string; url: string }; // link mở bộ slide (hiện rõ cho học viên)
  footer?: string;
}

export interface SectionSlide {
  kind: "section";
  index?: string;
  title: string;
  subtitle?: string;
}

export interface BulletsSlide {
  kind: "bullets";
  eyebrow?: string;
  title: string;
  bullets: string[];
  note?: string;
  link?: { label: string; url: string }; // link ngoài (vd mở trang bài tập)
}

export interface StepItem {
  title: string;
  desc?: string;
  icon?: string; // slug logo công cụ liên quan (vd "github")
  link?: { label: string; url: string }; // link tải / mở
}
// Hướng dẫn chi tiết (mở trong popup, không phá luồng chính).
// Mỗi shot là 1 chỗ để gắn ảnh từng bước.
export interface DetailGuide {
  caption?: string;
  shots: { label: string; image?: string }[];
}
export interface StepsSlide {
  kind: "steps";
  eyebrow?: string;
  title: string;
  start?: number; // số bắt đầu (mặc định 1)
  steps: StepItem[];
  image?: string; // ảnh minh hoạ bên phải
  placeholder?: string; // mô tả ảnh cần đặt
  detail?: DetailGuide; // nút "Xem hướng dẫn chi tiết"
}

// Sơ đồ GitHub: Repo Local <-> Repo Cloud
export interface GitFlowSlide {
  kind: "gitflow";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  local: { title: string; desc: string };
  cloud: { title: string; desc: string };
  pushLabel?: string;
  pullLabel?: string;
  analogy?: string;
  image?: string; // ảnh minh hoạ (vd ảnh chụp repo thật)
}

// Slide trưng bày công cụ — mỗi card có logo + mô tả
export interface ToolItem {
  name: string;
  icon?: string; // slug trong /public/icons (vd "claude"); thiếu -> badge chữ
  desc: string;
  url?: string; // link tải / mở
}
export interface ToolsSlide {
  kind: "tools";
  eyebrow?: string;
  title: string;
  tools: ToolItem[];
}

export interface StatsSlide {
  kind: "stats";
  eyebrow?: string;
  title: string;
  stats: { value: string; label: string }[];
}

export interface ColumnsSlide {
  kind: "columns";
  eyebrow?: string;
  title: string;
  columns: { heading: string; body: string; icon?: string }[];
}

export interface CompareSlide {
  kind: "compare";
  eyebrow?: string;
  title: string;
  highlight?: "left" | "right"; // bên nào được tô sáng (khuyên dùng)
  left: { heading: string; points: string[]; image?: string; placeholder?: string };
  right: { heading: string; points: string[]; image?: string; placeholder?: string };
}

// Slide ảnh toàn khung (placeholder cho tới khi có ảnh thật)
export interface ImageSlide {
  kind: "image";
  eyebrow?: string;
  title?: string;
  caption?: string;
  image?: string; // nếu có ảnh thật
  placeholder?: string; // mô tả ảnh cần đặt
}

// Chữ bên trái + ảnh bên phải
export interface SplitSlide {
  kind: "split";
  eyebrow?: string;
  title: string;
  body: string[];
  image?: string;
  placeholder?: string;
}

export interface QuoteSlide {
  kind: "quote";
  quote: string;
  author?: string;
}

// Lưới ảnh showcase (mỗi ô là 1 sản phẩm / ví dụ)
export interface GallerySlide {
  kind: "gallery";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: { label: string; image?: string }[];
}

// Lưới tài nguyên: mỗi thẻ là 1 nguồn (thumbnail web + tên + mô tả + link bấm được)
export interface ResourcesSlide {
  kind: "resources";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: {
    name: string;
    tag?: string; // nhãn nhỏ (vd "Người mới", "React")
    desc: string; // mô tả 1 dòng
    url: string; // mở tab mới khi bấm thẻ
    image?: string; // ảnh thumbnail trang web (/img/...)
  }[];
}

// Slide giới thiệu diễn giả (tiểu sử + sự nghiệp)
export interface ProfileSlide {
  kind: "profile";
  index?: string;
  title: string;
  name: string;
  email?: string;
  phone?: string;
  linkedin?: string; // URL
  discord?: string; // username
  avatar?: string; // ảnh chân dung (thiếu -> khung tạm)
  education: { title: string; org: string; logo?: string }[];
  careers: {
    role: string;
    org: string;
    note?: string; // ví dụ "Fortune Global 500"
    logo?: string;
    image?: string; // ảnh minh hoạ (thiếu -> khung tạm)
    points: string[];
  }[];
}

export interface ExerciseSlide {
  kind: "exercise";
  badge: string; // "Bài tập 1"
  title: string;
  brief: string[]; // đề bài / các bước
  prompt?: string; // prompt copy gửi AI (ẩn, bấm để hiện). Bỏ trống = không có prompt.
  onPageNote?: string; // callout: hướng dẫn nằm trên trang bài tập (thay cho ảnh)
  promptLabel?: string; // chữ trên nút mở (mặc định: "Xem lời giải — prompt gửi cho AI")
  promptTag?: string; // nhãn nhỏ trong hộp (mặc định: "Prompt — copy & gửi AI")
  success?: string; // điều kiện hoàn thành (hiển thị dạng "✅ Hoàn thành khi: …")
  tip?: string;
  link?: { label: string; url: string }; // link ngoài (vd mở Vercel)
  detail?: DetailGuide; // popup ảnh từng bước
  image?: string;
  placeholder?: string; // ảnh minh hoạ kết quả mong đợi
  // Phần nâng cao (không bắt buộc): nội dung mẫu để copy cho AI tái tạo
  advanced?: {
    title?: string;
    note: string;
    copyText: string;
    copyLabel?: string;
  };
}

export interface ClosingSlide {
  kind: "closing";
  title: string;
  subtitle?: string;
  note?: string; // gợi ý nhỏ dưới subtitle (vd: hết token thì đổi account)
  cta?: string;
}

export type Slide =
  | CoverSlide
  | SectionSlide
  | BulletsSlide
  | StepsSlide
  | StatsSlide
  | ColumnsSlide
  | ToolsSlide
  | GitFlowSlide
  | CompareSlide
  | ImageSlide
  | SplitSlide
  | QuoteSlide
  | GallerySlide
  | ResourcesSlide
  | ProfileSlide
  | ExerciseSlide
  | ClosingSlide;

// ===========================================================================
//  I18N — song ngữ Việt / English
//  `t(vi, en)` gói 2 ngôn ngữ vào 1 chuỗi (giữ nguyên kiểu string cho slide).
//  Khi render, getDeck(lang) sẽ "resolve" mọi t(...) thành đúng ngôn ngữ.
//  Chuỗi nào để nguyên (không bọc t) sẽ hiển thị giống nhau ở cả 2 ngôn ngữ
//  (tên riêng, URL, các prompt vốn đã viết bằng tiếng Anh…).
// ===========================================================================
export type Lang = "vi" | "en";

export const t = (vi: string, en: string): string =>
  ({ vi, en } as unknown as string);

function isLoc(v: unknown): v is { vi: string; en: string } {
  return (
    !!v &&
    typeof v === "object" &&
    typeof (v as Record<string, unknown>).vi === "string" &&
    typeof (v as Record<string, unknown>).en === "string" &&
    Object.keys(v as object).length === 2
  );
}

function localize<T>(node: T, lang: Lang): T {
  if (isLoc(node)) return node[lang] as unknown as T;
  if (Array.isArray(node)) return node.map((n) => localize(n, lang)) as unknown as T;
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const k in node as Record<string, unknown>) {
      out[k] = localize((node as Record<string, unknown>)[k], lang);
    }
    return out as T;
  }
  return node;
}

export function getDeck(lang: Lang): Slide[] {
  return localize(deck, lang);
}

// ===========================================================================
//  NỘI DUNG WORKSHOP — Vibe Coding từ số 0
// ===========================================================================

// ===========================================================================
//  CONTENT — ReelMe × PayPal · Creator Payouts (Discovery deck)
//  Song ngữ: mặc định tiếng Việt; mở ?lang=en để trình bày cho team PayPal.
//  Mọi con số ($, %, ngày) là GIẢ ĐỊNH hiện tại của ReelMe, cần PayPal xác nhận.
// ===========================================================================

export const deck: Slide[] = [
  // ---- 0 · Cover ---------------------------------------------------------
  {
    kind: "cover",
    eyebrow: t("ReelMe × PayPal · Buổi tìm hiểu", "ReelMe × PayPal · Discovery"),
    title: t("Trả tiền cho Creator qua PayPal", "Creator Payouts on ReelMe"),
    subtitle: t(
      "Cách chúng tôi muốn chi trả thu nhập của creator — thông qua PayPal.",
      "How we want to pay our creators their earnings — through PayPal.",
    ),
    note: t(
      "Tài liệu mở đầu để cùng khoanh vùng công việc tích hợp.",
      "A kickoff document to scope the integration together.",
    ),
    footer: "ReelMe.AI · 2026",
  },

  // ---- 1 · Who we are ----------------------------------------------------
  { kind: "section", index: "01", title: t("Chúng tôi là ai", "Who we are"), subtitle: t("ReelMe trong một phút", "ReelMe in one minute") },
  {
    kind: "bullets",
    eyebrow: t("Bối cảnh", "Context"),
    title: t("ReelMe là gì", "What ReelMe is"),
    bullets: [
      t("Nền tảng sáng tạo nội dung bằng AI — tạo ảnh và video.", "An AI content-creation platform — for images and video."),
      t("Creator tự dựng các “template” tái sử dụng được.", "Creators build reusable “templates”."),
      t("Khi người khác chạy template của một creator, creator đó KIẾM ĐƯỢC tiền.", "When other people run a creator's template, that creator EARNS."),
      t("Giờ chúng tôi muốn chi trả khoản thu nhập đó thành tiền thật.", "Now we want to pay out those earnings as real money."),
      t("→ PayPal là cách tiền rời khỏi nền tảng để về tay creator.", "→ PayPal is how the money leaves the platform to reach the creator."),
    ],
    note: t("Tài liệu này chỉ nói về phần trả tiền — không đụng phần AI.", "This deck is only about payouts — not the AI side."),
  },
  {
    kind: "columns",
    eyebrow: t("Tổng quan", "Overview"),
    title: t("Hai việc chúng tôi cần PayPal", "Two things we need PayPal for"),
    columns: [
      { heading: t("A · Kết nối tài khoản", "A · Connect an account"), body: t("Cho creator gắn một tài khoản PayPal để NHẬN tiền — làm một lần, đổi được.", "Let a creator attach a PayPal account to RECEIVE money — once, and changeable.") },
      { heading: t("B · Chi trả (Payout)", "B · Pay out"), body: t("Gửi tiền đã kiếm về tài khoản đó, ĐÁNG TIN CẬY, với trạng thái rõ ràng từng bước.", "Send the earned money to that account, RELIABLY, with clear step-by-step status.") },
    ],
  },

  // ---- 2 · Area A — Connect ---------------------------------------------
  { kind: "section", index: "02", title: t("Phần A — Kết nối tài khoản nhận tiền", "Area A — Connecting a payout account") },
  {
    kind: "compare",
    eyebrow: t("Hai đường kết nối", "Two ways to connect"),
    title: t("Kết nối PayPal — hai đường", "Connecting PayPal — two paths"),
    highlight: "left",
    left: {
      heading: t("Log in with PayPal  ★ khuyên dùng", "Log in with PayPal  ★ recommended"),
      points: [
        t("Creator đăng nhập & đồng ý (OpenID Connect / Connect).", "Creator logs in & consents (OpenID Connect / Connect)."),
        t("Chúng tôi nhận: payer_id, email, trạng thái verified_account.", "We receive: payer_id, email, verified_account status."),
        t("Trả tiền theo PAYPAL_ID → KHÔNG bao giờ bị “unclaimed”.", "Pay by PAYPAL_ID → NEVER goes unclaimed."),
      ],
    },
    right: {
      heading: t("Nhập email PayPal  (phương án phụ)", "PayPal email  (fallback)"),
      points: [
        t("Creator tự gõ một địa chỉ email.", "Creator types an email address."),
        t("Trả theo EMAIL; phải xác nhận qua link trước khi dùng.", "Pay by EMAIL; must be confirmed via a link first."),
        t("Gõ sai email → tiền treo “unclaimed” 30 ngày rồi trả về.", "Wrong email → money sits “unclaimed” for 30 days, then returns."),
      ],
    },
  },
  {
    kind: "bullets",
    eyebrow: t("Trạng thái tài khoản", "Account states"),
    title: t("Những trạng thái chúng tôi phải phản ánh đúng", "Account states we must reflect"),
    bullets: [
      t("Verified vs chưa verified (chưa verified có giới hạn nhận tiền).", "Verified vs not verified (unverified accounts have receiving limits)."),
      t("Email đã xác nhận / đang chờ xác nhận.", "Email confirmed / confirmation pending."),
      t("Quyền bị thu hồi — creator gỡ ReelMe trên paypal.com.", "Access revoked — the creator removed ReelMe on paypal.com."),
      t("Chúng tôi muốn hiển thị đúng TÍN HIỆU THẬT từ PayPal, không tự đoán.", "We want to show PayPal's REAL signals, never guess them."),
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Câu hỏi cho PayPal", "Questions for PayPal"),
    title: t("Kết nối — cần PayPal xác nhận", "Connecting — what we need to confirm"),
    bullets: [
      t("“Log in with PayPal” có phải sản phẩm đúng để định danh người nhận payout?", "Is “Log in with PayPal” the right product to identify a payout recipient?"),
      t("Nó có trả về payer_id + verified_account để chúng tôi trả tiền tới không?", "Does it return payer_id + verified_account we can pay to?"),
      t("Làm sao biết creator đã thu hồi quyền — có webhook không?", "How do we learn a creator revoked consent — is there a webhook?"),
      t("Có phát hiện được “giới hạn nhận tiền” trước khi gửi không?", "Can we detect receiving limits before sending?"),
    ],
  },

  // ---- 3 · Area B — Payout ----------------------------------------------
  { kind: "section", index: "03", title: t("Phần B — Chi trả (PayPal Payouts)", "Area B — Paying out (PayPal Payouts)") },
  {
    kind: "steps",
    eyebrow: t("Vòng đời một payout — đường thuận", "A payout's journey — the happy path"),
    title: t("Từ lúc bấm rút tới khi tiền về", "From “cash out” to money landed"),
    steps: [
      { title: t("Requested", "Requested"), desc: t("Creator yêu cầu rút; tiền được KHOÁ lại. Còn huỷ được.", "Creator requests a cash-out; money is RESERVED. Still cancellable.") },
      { title: t("Processing", "Processing"), desc: t("Đưa vào batch gửi PayPal. KHÔNG còn huỷ được.", "Sent to PayPal in a batch. NO longer cancellable.") },
      { title: t("Paid", "Paid"), desc: t("Tiền đã về tài khoản PayPal của creator. Có mã đối soát.", "Money landed in the creator's PayPal. Carries a reference code.") },
    ],
  },
  {
    kind: "columns",
    eyebrow: t("Khi payout kết thúc", "When a payout ends"),
    title: t("Ba kết cục có thể xảy ra", "Three possible outcomes"),
    columns: [
      { heading: t("Paid ✓", "Paid ✓"), body: t("Tiền đã về. Đánh dấu xong, lưu mã đối soát.", "Money landed. Marked done, reference stored.") },
      { heading: t("Failed ✗", "Failed ✗"), body: t("PayPal từ chối (giới hạn/tiền tệ). Tiền TỰ về số dư; creator thử lại.", "PayPal declined (limits/currency). Money RETURNS to balance; creator can retry.") },
      { heading: t("Unclaimed → Returned ⏳", "Unclaimed → Returned ⏳"), body: t("Email không có tài khoản PayPal. Giữ 30 ngày rồi trả về.", "Email had no PayPal account. Held 30 days, then returned.") },
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Sự thật về trạng thái", "Source of truth"),
    title: t("Chúng tôi muốn biết trạng thái thế nào", "How we want to know the status"),
    bullets: [
      t("Trạng thái trong sản phẩm PHẢI bằng trạng thái PayPal Payouts thật.", "Product status MUST equal the real PayPal Payouts status."),
      t("Nhận trạng thái qua webhook hay phải poll?", "Do we receive status via webhook, or must we poll?"),
      t("Người nhận theo PAYPAL_ID khi có, theo EMAIL khi không.", "Recipient by PAYPAL_ID when we have it, EMAIL otherwise."),
      t("Mỗi payout mang một mã đối soát khớp với biên nhận của PayPal.", "Every payout carries a reference we can reconcile with PayPal's receipt."),
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Phí", "Fees"),
    title: t("Ai chịu phí PayPal?", "Who pays the PayPal fee?"),
    bullets: [
      t("Giả định hiện tại: creator (người nhận) chịu phí, hiện rõ TRƯỚC khi bấm rút.", "Current assumption: the creator (recipient) bears the fee, shown BEFORE they confirm."),
      t("Giả định mức phí: ~2%, trần ~$1 — CẦN PayPal xác nhận số thật.", "Assumed fee: ~2%, cap ~$1 — TO BE validated with PayPal."),
      t("Câu hỏi: phí Payouts thật theo từng nước/tiền tệ là bao nhiêu?", "Question: what is the real Payouts fee by country/currency?"),
      t("Câu hỏi: có thể để bên nào chịu phí (người gửi hay người nhận)?", "Question: which side can bear the fee (sender or recipient)?"),
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Câu hỏi cho PayPal", "Questions for PayPal"),
    title: t("Chi trả — cần PayPal xác nhận", "Paying out — what we need to confirm"),
    bullets: [
      t("PayPal Payouts API có phải sản phẩm đúng cho việc này?", "Is the PayPal Payouts API the right product for this?"),
      t("Có webhook cho trạng thái từng item (success/failed/unclaimed/returned)?", "Are there webhooks for item status (success/failed/unclaimed/returned)?"),
      t("Unclaimed → Returned có tự động sau 30 ngày không?", "Is Unclaimed → Returned automatic after 30 days?"),
      t("Hỗ trợ trả theo cả PAYPAL_ID và EMAIL chứ?", "Are both PAYPAL_ID and EMAIL recipients supported?"),
      t("Có trần rút theo mỗi creator (AML / giới hạn) không?", "Are there per-creator payout caps (AML / limits)?"),
    ],
  },

  // ---- 4 · Edge cases & safety ------------------------------------------
  { kind: "section", index: "04", title: t("Ca ngoại lệ & an toàn tiền bạc", "Edge cases & money safety") },
  {
    kind: "bullets",
    eyebrow: t("Bất biến chúng tôi đã thiết kế", "Invariants we've designed"),
    title: t("Những luật tiền bạc không được vi phạm", "Money rules that must never break"),
    bullets: [
      t("Mỗi lúc chỉ MỘT payout đang chờ — chống rút trùng.", "One payout in flight at a time — no double cash-outs."),
      t("Khoá tiền khi yêu cầu; mọi thất bại → trả về đúng số, không mất, không nhân đôi.", "Reserve on request; any failure → returns the exact amount, never lost, never doubled."),
      t("Người nhận được “chụp” lúc tạo payout — đổi tài khoản sau không đổi payout đang chạy.", "Recipient is snapshotted at creation — changing account later doesn't reroute an in-flight payout."),
      t("Mỗi payout có mã đối soát bền để tra ngược với PayPal.", "Every payout has a stable reference to reconcile with PayPal."),
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Thuế (Mỹ)", "Tax (US)"),
    title: t("Thông tin thuế cho creator", "Tax information for creators"),
    bullets: [
      t("Creator vượt một ngưỡng tổng thu nhập (giả định $600/năm) cần khai thuế.", "Creators past a lifetime threshold (assumed $600/yr) need tax info."),
      t("Biểu mẫu: W-9 (người Mỹ) / W-8BEN (ngoài Mỹ).", "Forms: W-9 (US persons) / W-8BEN (non-US)."),
      t("Câu hỏi: PayPal có hỗ trợ biểu mẫu thuế / 1099-K, hay ReelMe tự lo?", "Question: does PayPal help with tax forms / 1099-K, or do we handle it?"),
    ],
  },

  // ---- 5 · The ask -------------------------------------------------------
  { kind: "section", index: "05", title: t("Chúng tôi cần gì từ PayPal", "What we need from PayPal") },
  {
    kind: "steps",
    eyebrow: t("Để bắt đầu xây dựng", "To start building"),
    title: t("Danh sách cần PayPal hỗ trợ", "What we need to get started"),
    steps: [
      { title: t("Tài khoản PayPal Business + duyệt Payouts", "A PayPal Business account + Payouts approved"), desc: t("Cho pháp nhân ReelMe.", "For the ReelMe entity.") },
      { title: t("App “Log in with PayPal” (OAuth client)", "A “Log in with PayPal” (Connect) app / OAuth client"), desc: t("Để kết nối tài khoản nhận tiền.", "To connect payout accounts.") },
      { title: t("Webhooks", "Webhooks"), desc: t("Trạng thái payout item + tín hiệu thu hồi quyền.", "Payout item status + consent-revoke signal.") },
      { title: t("Sandbox", "Sandbox credentials"), desc: t("Để thử toàn bộ luồng trước khi chạy thật.", "To test the whole flow before going live.") },
      { title: t("Thị trường & giới hạn", "Markets & limits"), desc: t("Chúng tôi nhắm VN / SEA — hỗ trợ tới đâu, phí thật, trần rút.", "We target VN / SEA — coverage, real fees, payout caps."), },
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Chúng tôi đang ở đâu", "Where we are today"),
    title: t("Đã dựng sẵn — chỉ chờ nối API thật", "Already built — just needs the real APIs"),
    bullets: [
      t("Đã có FE mô phỏng TRỌN VẸN vòng đời PayPal Payouts: kết nối, rút, biên nhận, 7 trạng thái.", "We've built a FULL front-end that models the PayPal Payouts lifecycle: connect, cash-out, receipt, 7 statuses."),
      t("Hiện là bản mock — chưa chạm tiền thật.", "It's a working mock today — no real money yet."),
      t("Sẵn sàng nối vào PayPal Payouts + Log in with PayPal thật.", "Ready to wire into real PayPal Payouts + Log in with PayPal."),
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Câu hỏi cho buổi làm việc đầu", "For our first call"),
    title: t("Các câu hỏi mở — gom lại", "Open questions — consolidated"),
    bullets: [
      t("Webhook cho việc thu hồi quyền?", "A webhook for consent revoke?"),
      t("verified_account đã đủ để tin “nhận được tiền” chưa?", "Is verified_account enough to trust receiving?"),
      t("Phí Payouts thật theo nước/tiền tệ?", "Real Payouts fees by country/currency?"),
      t("Trần rút / creator (AML)? Unclaimed→Returned tự động?", "Payout caps per creator (AML)? Auto Unclaimed→Returned?"),
      t("Truy cập Sandbox? Hỗ trợ thuế / 1099?", "Sandbox access? Tax / 1099 support?"),
    ],
  },

  // ---- 6 · Closing -------------------------------------------------------
  {
    kind: "closing",
    title: t("Cùng nhau xây phần này", "Let's build this together"),
    subtitle: t(
      "Bước tiếp theo: cấp Sandbox + một buổi kỹ thuật để map các API.",
      "Next step: sandbox access + a technical call to map the APIs.",
    ),
    note: t("Cảm ơn — đội ngũ ReelMe.", "Thank you — the ReelMe team."),
    cta: "ReelMe.AI",
  },
];

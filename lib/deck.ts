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
//  Ảnh /img/* là ảnh chụp thật từ sản phẩm ReelMe.
//  Mọi con số ($, %, ngày) là con số ví dụ/giả định của ReelMe, sẽ cùng PayPal chốt lại.
// ===========================================================================

export const deck: Slide[] = [
  // ---- Cover -------------------------------------------------------------
  {
    kind: "cover",
    eyebrow: t("ReelMe × PayPal", "ReelMe × PayPal"),
    title: t("Trả tiền cho creator, qua PayPal", "Paying creators, through PayPal"),
    subtitle: t(
      "Creator trên ReelMe kiếm được tiền từ template của mình — và tụi mình muốn số tiền đó về đúng tài khoản của họ, gọn gàng, minh bạch.",
      "Creators on ReelMe earn from their templates — and we want that money to reach them cleanly and transparently.",
    ),
    note: t(
      "Đây là buổi mở màn để hai bên hiểu nhau và khoanh vùng việc cần làm.",
      "This is a kickoff to get on the same page and scope the work together.",
    ),
    footer: "ReelMe.AI",
  },

  // ---- Who we are --------------------------------------------------------
  { kind: "section", index: "01", title: t("ReelMe là gì", "Who we are"), subtitle: t("Một phút cho dễ hình dung", "One minute for context") },
  {
    kind: "image",
    title: t("“Kiếm tiền mỗi khi có người dùng template của bạn”", "“Get paid every time someone uses your template”"),
    image: "/img/creator-landing.png",
    caption: t(
      "Trang mời creator tham gia — họ đóng gói thứ mình hay làm thành template, người khác chạy thì họ được chia tiền.",
      "The page that invites creators in — they package what they make into a template, and earn when others run it.",
    ),
  },
  {
    kind: "bullets",
    eyebrow: t("Bối cảnh", "Context"),
    title: t("Nói ngắn gọn thì…", "The short version"),
    bullets: [
      t("ReelMe là nền tảng làm ảnh và video bằng AI.", "ReelMe is a platform for making images and video with AI."),
      t("Creator biến phong cách của mình thành “template” cho người khác dùng lại.", "Creators turn their style into a “template” others can reuse."),
      t("Có người chạy template đó → creator kiếm được một phần tiền.", "Someone runs that template → the creator earns a share."),
      t("Việc còn thiếu: đưa số tiền đó ra ngoài, về tài khoản thật của họ.", "What's missing: getting that money out, into their real account."),
      t("Đó là chỗ PayPal bước vào câu chuyện.", "That's where PayPal comes in."),
    ],
    note: t("Buổi này chỉ bàn phần trả tiền — không đụng tới phần AI.", "Today is only about payouts — not the AI side."),
  },
  {
    kind: "columns",
    eyebrow: t("Tụi mình cần PayPal ở hai chỗ", "We need PayPal for two things"),
    title: t("Hai mảnh ghép", "Two pieces"),
    columns: [
      { heading: t("A · Kết nối tài khoản", "A · Connecting an account"), body: t("Để creator gắn tài khoản PayPal của họ vào — làm một lần, sau đổi cũng được.", "So a creator can link their PayPal account — once, and change it later if they want.") },
      { heading: t("B · Chuyển tiền", "B · Sending the money"), body: t("Đẩy tiền đã kiếm về tài khoản đó, chắc chắn tới nơi, và luôn biết tiền đang ở đâu.", "Get the earned money to that account, reliably, always knowing where it is.") },
    ],
  },
  {
    kind: "columns",
    eyebrow: t("Tiền ở đâu ra", "Where the money starts"),
    title: t("Creator kiếm tiền kiểu gì", "How a creator earns"),
    columns: [
      { heading: t("Có người chạy template", "Someone runs it"), body: t("Ai đó dùng template của creator — họ trả credit cho lượt đó.", "Someone uses a creator's template — they pay credits for that run.") },
      { heading: t("Creator được chia phần", "The creator gets a cut"), body: t("Creator giữ một nửa số credit của mỗi lượt chạy (con số ví dụ).", "The creator keeps half the credits from each run (example figure).") },
      { heading: t("Đổi thành đô-la", "It becomes dollars"), body: t("Phần credit đó quy ra USD — và đây chính là số tiền đem rút về PayPal.", "Those credits convert to USD — and that's the money paid out to PayPal.") },
    ],
  },

  // ---- Area A — Connect --------------------------------------------------
  { kind: "section", index: "02", title: t("Mảnh A — Kết nối tài khoản", "Part A — Connecting an account") },
  {
    kind: "compare",
    eyebrow: t("Có hai cách nối", "Two ways to connect"),
    title: t("Nối PayPal — hai lối đi", "Connecting PayPal — two paths"),
    highlight: "left",
    left: {
      heading: t("Log in with PayPal  ★ nên dùng", "Log in with PayPal  ★ preferred"),
      points: [
        t("Creator bấm đăng nhập và đồng ý — kiểu OpenID Connect.", "The creator logs in and consents — OpenID Connect style."),
        t("Mình nhận lại payer_id, email và trạng thái verified_account.", "We get back a payer_id, email and verified_account status."),
        t("Trả tiền theo PayPal ID nên tiền gần như không bao giờ bị treo.", "Paying by PayPal ID means money almost never gets stuck."),
      ],
    },
    right: {
      heading: t("Gõ email PayPal  (phương án dự phòng)", "Type a PayPal email  (fallback)"),
      points: [
        t("Creator tự nhập một địa chỉ email.", "The creator types in an email address."),
        t("Trả theo email — phải bấm link xác nhận trước đã.", "Paid by email — they confirm via a link first."),
        t("Lỡ gõ sai thì tiền treo 30 ngày rồi mới quay về.", "A typo means the money waits 30 days before coming back."),
      ],
    },
  },
  {
    kind: "split",
    eyebrow: t("Màn hình thật trong ReelMe", "The real screen in ReelMe"),
    title: t("Chỗ creator gắn PayPal", "Where a creator links PayPal"),
    body: [
      t("Đây là tab Earnings của creator — tụi mình đã dựng sẵn.", "This is the creator's Earnings tab — we've already built it."),
      t("Chưa nối thì hiện “Not connected” cùng nút Connect PayPal.", "Not linked yet shows “Not connected” with a Connect PayPal button."),
      t("Bấm vào là mở đúng hai lối ở slide trước.", "Tapping it opens exactly the two paths from the last slide."),
    ],
    image: "/img/earnings-notconnected.png",
  },
  {
    kind: "bullets",
    eyebrow: t("Trạng thái tài khoản", "Account states"),
    title: t("Những trạng thái mình cần hiển thị đúng", "The states we need to show honestly"),
    bullets: [
      t("Đã verified hay chưa (chưa verified thì bị giới hạn nhận tiền).", "Verified or not (unverified accounts have receiving limits)."),
      t("Email đã xác nhận, hay còn đang chờ.", "Email confirmed, or still pending."),
      t("Bị thu hồi quyền — khi creator gỡ ReelMe bên paypal.com.", "Access revoked — when a creator removes ReelMe over on paypal.com."),
      t("Mình muốn lấy tín hiệu thật từ PayPal chứ không tự đoán.", "We want the real signal from PayPal, not a guess."),
    ],
  },
  {
    kind: "split",
    eyebrow: t("Màn hình thật trong ReelMe", "The real screen in ReelMe"),
    title: t("Ví dụ: quyền bị thu hồi", "For example: access revoked"),
    body: [
      t("Creator gỡ ReelMe bên PayPal → mình hiện ngay thẻ đỏ “Access revoked”.", "A creator removes ReelMe on PayPal → we show a red “Access revoked” badge right away."),
      t("Rút tiền bị chặn cho tới khi họ nối lại.", "Cash-out is blocked until they reconnect."),
      t("Rất mong PayPal báo tín hiệu này qua webhook để mình hiện cho đúng.", "We'd love PayPal to signal this via webhook so we show it correctly."),
    ],
    image: "/img/account-revoked.png",
  },
  {
    kind: "bullets",
    eyebrow: t("Muốn hỏi PayPal", "To ask PayPal"),
    title: t("Về phần kết nối", "About connecting"),
    bullets: [
      t("“Log in with PayPal” có đúng là công cụ để xác định người nhận không?", "Is “Log in with PayPal” the right way to identify a recipient?"),
      t("Nó có trả về payer_id và verified_account để mình trả tiền tới không?", "Does it return a payer_id and verified_account we can pay to?"),
      t("Creator thu hồi quyền thì mình biết bằng cách nào — có webhook chứ?", "How do we hear that a creator revoked access — is there a webhook?"),
      t("Có cách nào biết trước tài khoản đang bị giới hạn nhận tiền không?", "Any way to know upfront that an account has receiving limits?"),
    ],
  },

  // ---- Area B — Payout ---------------------------------------------------
  { kind: "section", index: "03", title: t("Mảnh B — Chuyển tiền", "Part B — Sending the money") },
  {
    kind: "steps",
    eyebrow: t("Một lần rút đi qua những bước nào", "What one payout goes through"),
    title: t("Từ lúc bấm rút đến khi tiền về", "From “cash out” to money in hand"),
    steps: [
      { title: t("Vừa yêu cầu", "Requested"), desc: t("Creator bấm rút; tiền được giữ tạm. Đổi ý thì huỷ được.", "The creator asks to cash out; the money is held. They can still cancel.") },
      { title: t("Đang xử lý", "Processing"), desc: t("Đã gửi sang PayPal theo lô. Lúc này thôi huỷ.", "It's been sent to PayPal in a batch. No more cancelling now.") },
      { title: t("Đã trả", "Paid"), desc: t("Tiền về tài khoản PayPal của creator, kèm một mã để tra.", "Money lands in the creator's PayPal, with a reference to look it up.") },
    ],
  },
  {
    kind: "split",
    eyebrow: t("Màn hình thật trong ReelMe", "The real screen in ReelMe"),
    title: t("Nối xong là rút được ngay", "Connected, and ready to cash out"),
    body: [
      t("Nối rồi thì hiện thẻ Verified PayPal cùng nút Cash out.", "Once linked, it shows a Verified PayPal badge and a Cash out button."),
      t("Bên dưới là lịch sử từng lần rút, kèm trạng thái sống.", "Below sits the history of every cash-out, with live status."),
      t("Tất cả đang chạy bằng dữ liệu giả — chờ nối API PayPal thật.", "It all runs on mock data today — waiting for the real PayPal APIs."),
    ],
    image: "/img/earnings-connected.png",
  },
  {
    kind: "columns",
    eyebrow: t("Một lần rút có thể kết thúc thế nào", "How a payout can end"),
    title: t("Ba kết cục", "Three endings"),
    columns: [
      { heading: t("Đã trả", "Paid"), body: t("Tiền về nơi. Đánh dấu xong, lưu lại mã đối soát.", "Money arrived. Marked done, reference saved.") },
      { heading: t("Thất bại", "Failed"), body: t("PayPal từ chối — tiền quay lại số dư, creator rút lại được.", "PayPal declined — money returns to the balance, the creator can retry.") },
      { heading: t("Treo rồi trả về", "Unclaimed → Returned"), body: t("Email không có tài khoản PayPal — giữ 30 ngày rồi trả về.", "The email has no PayPal account — held 30 days, then returned.") },
    ],
  },
  {
    kind: "split",
    eyebrow: t("Màn hình thật trong ReelMe", "The real screen in ReelMe"),
    title: t("Mỗi lần rút đều có dấu vết", "Every payout leaves a trail"),
    body: [
      t("Lịch sử hiện rõ Đã trả / Treo-trả về / Thất bại, kèm lý do.", "The history shows Paid / Returned / Failed, each with a reason."),
      t("Mỗi dòng có mã PO-… để tra ngược với PayPal.", "Each row has a PO-… reference to check against PayPal."),
      t("Bấm vào là ra biên nhận đầy đủ kèm dòng thời gian.", "Tapping one opens a full receipt with a timeline."),
    ],
    image: "/img/payout-history.png",
  },
  {
    kind: "bullets",
    eyebrow: t("Nguồn của sự thật", "Source of truth"),
    title: t("Trạng thái phải khớp PayPal", "Status has to match PayPal"),
    bullets: [
      t("Trạng thái mình hiện cho creator phải đúng bằng trạng thái PayPal.", "What we show the creator must be exactly PayPal's status."),
      t("Mình nhận cập nhật qua webhook, hay phải chủ động hỏi?", "Do we get updates by webhook, or do we have to poll?"),
      t("Trả theo PayPal ID khi có, theo email khi không có.", "Pay by PayPal ID when we have it, by email when we don't."),
      t("Mỗi lần rút có một mã để khớp với biên nhận PayPal.", "Every payout has a reference to match PayPal's receipt.") ,
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Đối soát", "Reconciliation"),
    title: t("Lần rút nào cũng tra ngược được", "Every payout can be traced back"),
    bullets: [
      t("Mỗi lần rút mang một mã cố định (kiểu PO-XXXXXXXX).", "Each payout carries a fixed reference (like PO-XXXXXXXX)."),
      t("Mã đó nối: biên nhận PayPal — giao dịch credit sinh ra nó — sổ kế toán.", "That reference links the PayPal receipt, the credit transaction behind it, and the ledger."),
      t("Cần cho lúc hỗ trợ khách và lúc chốt sổ.", "Handy for customer support and for closing the books."),
      t("Hỏi PayPal: bên mình nên lưu mã/biên nhận nào để khớp?", "For PayPal: which id/receipt should we store to match on?"),
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Phí", "Fees"),
    title: t("Ai trả phí?", "Who covers the fee?"),
    bullets: [
      t("Hướng hiện tại: creator chịu phí, và hiện rõ trước khi họ bấm rút.", "Current thinking: the creator covers it, shown clearly before they confirm."),
      t("Con số đang để tạm ~2%, tối đa ~$1 — sẽ chốt lại cùng PayPal.", "We've penciled in ~2%, capped ~$1 — to settle with PayPal."),
      t("Phí Payouts thật theo từng nước/tiền tệ là bao nhiêu?", "What's the real Payouts fee by country and currency?"),
      t("Có thể chọn bên gửi hay bên nhận chịu phí không?", "Can we choose whether the sender or receiver pays?"),
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Muốn hỏi PayPal", "To ask PayPal"),
    title: t("Về phần chuyển tiền", "About sending money"),
    bullets: [
      t("PayPal Payouts có phải công cụ đúng cho việc này?", "Is PayPal Payouts the right tool here?"),
      t("Có webhook báo trạng thái từng khoản (đã trả/thất bại/treo/trả về)?", "Webhooks for each item's status (paid/failed/unclaimed/returned)?"),
      t("Treo → trả về có tự động sau 30 ngày không?", "Is unclaimed → returned automatic after 30 days?"),
      t("Trả được theo cả PayPal ID lẫn email chứ?", "Can we pay by both PayPal ID and email?"),
      t("Có trần rút cho mỗi creator (chống rửa tiền) không?", "Any per-creator payout caps (anti-money-laundering)?"),
    ],
  },

  // ---- Edge cases & safety ----------------------------------------------
  { kind: "section", index: "04", title: t("Trục trặc & giữ tiền an toàn", "Edge cases & keeping money safe") },
  {
    kind: "bullets",
    eyebrow: t("Mấy luật mình tự đặt ra", "Rules we hold ourselves to"),
    title: t("Tiền thì tuyệt đối không được lạc", "Money simply must not go astray"),
    bullets: [
      t("Mỗi lúc chỉ một lần rút đang chạy — tránh rút trùng.", "One payout in flight at a time — no accidental doubles."),
      t("Giữ tiền khi yêu cầu; hỏng cái gì là tiền quay về đủ, không thiếu không dư.", "Held on request; on any failure it returns in full — no more, no less."),
      t("Người nhận được ghi lại lúc tạo — đổi tài khoản sau không ảnh hưởng lần đang chạy.", "The recipient is captured at creation — changing accounts later won't reroute one in flight.") ,
      t("Lần nào cũng có mã cố định để tra với PayPal.", "Each one keeps a fixed reference to check against PayPal."),
    ],
  },
  {
    kind: "columns",
    eyebrow: t("Có sự cố thì hứng thế nào", "When something slips"),
    title: t("Vài tình huống trớ trêu", "A few awkward moments"),
    columns: [
      { heading: t("Lỗi lúc gửi yêu cầu", "Error while requesting"), body: t("Không ghi gì, không giữ tiền — creator thử lại thoải mái.", "Nothing recorded, nothing held — the creator just tries again.") },
      { heading: t("Rớt mạng / bấm hai lần", "Dropped network / double tap"), body: t("Chặn trùng theo mã — không đẻ ra hai lần rút.", "De-duped by reference — never two payouts.") },
      { heading: t("Bị thu hồi giữa chừng", "Revoked mid-way"), body: t("Lần đang chạy vẫn đi theo bản ghi cũ; lần mới bị chặn tới khi nối lại.", "The one in flight continues on its snapshot; a new one waits until they reconnect.") },
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Thuế (Mỹ)", "Tax (US)"),
    title: t("Giấy tờ thuế cho creator", "Tax paperwork for creators"),
    bullets: [
      t("Ai kiếm vượt một mốc trong năm (ví dụ $600) thì cần khai thuế.", "Anyone earning past a yearly mark (say $600) needs tax info on file."),
      t("Mẫu W-9 cho người Mỹ, W-8BEN cho người ngoài Mỹ.", "W-9 for US folks, W-8BEN for everyone else."),
      t("Hỏi PayPal: bên mình lo hay PayPal có hỗ trợ mẫu thuế / 1099?", "For PayPal: do we handle this, or does PayPal help with tax forms / 1099?"),
    ],
  },

  // ---- Phase 2 — user payments ------------------------------------------
  { kind: "section", index: "05", title: t("Giai đoạn sau — thu tiền từ user", "A later phase — taking payments from users"), subtitle: t("Không chỉ trả tiền ra, mà còn thu tiền vào", "Not just money out — money in too") },
  {
    kind: "columns",
    eyebrow: t("Hai chiều của dòng tiền", "Two directions of money"),
    title: t("PayPal cho cả hai đầu", "PayPal on both ends"),
    columns: [
      { heading: t("Bây giờ · Tiền ra", "Now · Money out"), body: t("Trả thu nhập cho creator — phần mình vừa bàn ở trên.", "Paying creators their earnings — everything above.") },
      { heading: t("Sau này · Tiền vào", "Later · Money in"), body: t("Cho user trả tiền cho ReelMe — mua gói, nạp thêm credit.", "Letting users pay ReelMe — buy a plan, top up credits.") },
    ],
  },
  {
    kind: "split",
    eyebrow: t("Màn hình thật trong ReelMe", "The real screen in ReelMe"),
    title: t("User mua gói bằng PayPal", "Users subscribe with PayPal"),
    body: [
      t("Các gói Free / Pro / Business đã có sẵn trong sản phẩm.", "Free / Pro / Business plans are already in the product."),
      t("Giai đoạn sau: thêm PayPal làm cách trả tiền — gói hằng tháng.", "Later: add PayPal as a way to pay — monthly subscriptions."),
      t("Và cho nạp lẻ credit khi cần (mua một lần).", "Plus one-off credit top-ups when needed."),
    ],
    image: "/img/subscription.png",
  },
  {
    kind: "bullets",
    eyebrow: t("Muốn hỏi PayPal", "To ask PayPal"),
    title: t("Về phần user trả tiền", "About users paying us"),
    bullets: [
      t("PayPal Checkout cho nạp lẻ, Subscriptions cho gói định kỳ — đúng hướng chứ?", "PayPal Checkout for top-ups, Subscriptions for recurring plans — the right direction?"),
      t("Phí thu tiền bên nhận (ReelMe) là bao nhiêu?", "What's the fee on the collection side (ReelMe)?"),
      t("Người mua ở VN / Đông Nam Á được hỗ trợ tới đâu, tiền tệ nào?", "How well are buyers in VN / SEA supported, and which currencies?"),
      t("Một tài khoản PayPal Business lo được cả thu lẫn chi chứ?", "Can one PayPal Business account handle both collecting and paying out?"),
    ],
  },

  // ---- The ask -----------------------------------------------------------
  { kind: "section", index: "06", title: t("Mình cần gì ở PayPal", "What we'd need from PayPal") },
  {
    kind: "steps",
    eyebrow: t("Để bắt đầu bắt tay vào làm", "To actually get going"),
    title: t("Danh sách xin PayPal", "Our short list"),
    steps: [
      { title: t("Tài khoản PayPal Business + bật Payouts", "A PayPal Business account + Payouts enabled"), desc: t("Cho pháp nhân ReelMe.", "For the ReelMe entity.") },
      { title: t("App Log in with PayPal", "A Log in with PayPal app"), desc: t("Để creator nối tài khoản nhận tiền.", "So creators can link their payout account.") },
      { title: t("Webhooks", "Webhooks"), desc: t("Báo trạng thái từng khoản + báo khi bị thu hồi quyền.", "For each item's status + a heads-up when access is revoked.") },
      { title: t("Sandbox", "A sandbox"), desc: t("Để chạy thử hết mọi tình huống trước khi động tới tiền thật.", "To run every case before touching real money.") },
      { title: t("Thị trường & giới hạn", "Markets & limits"), desc: t("Tụi mình nhắm VN / Đông Nam Á — phủ tới đâu, phí thật, trần rút.", "We're aiming at VN / SEA — coverage, real fees, payout caps.") },
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Mình đang ở đâu rồi", "Where we already are"),
    title: t("Phần khó nhìn thấy đã dựng xong", "The visible part is built"),
    bullets: [
      t("Mấy màn hình bạn vừa xem là thật — nối, rút, biên nhận, đủ 7 trạng thái.", "The screens you just saw are real — connect, cash out, receipt, all 7 statuses."),
      t("Giờ nó chạy bằng dữ liệu giả, chưa đụng đồng nào thật.", "It runs on mock data for now — no real money yet."),
      t("Ráp API PayPal vào là dùng được — mình sẵn sàng.", "Wire in the PayPal APIs and it's live — we're ready.") ,
    ],
  },
  {
    kind: "steps",
    eyebrow: t("Đường đi đề xuất", "A rollout we'd suggest"),
    title: t("Sandbox → Thử nghiệm nhỏ → Mở rộng", "Sandbox → Small pilot → Launch"),
    steps: [
      { title: "Sandbox", desc: t("Ráp API thật ở môi trường thử, chạy hết các ca.", "Wire the real APIs in a test environment, cover every case.") },
      { title: t("Thử nghiệm", "Pilot"), desc: t("Mở cho một nhóm creator nhỏ, tiền thật, theo dõi sát.", "Open to a small group of creators, real money, watched closely.") },
      { title: t("Mở rộng", "Launch"), desc: t("Lan dần theo thị trường (VN / Đông Nam Á trước).", "Roll out market by market (VN / SEA first).") },
    ],
  },
  {
    kind: "bullets",
    eyebrow: t("Để dành cho buổi đầu tiên", "For our first call"),
    title: t("Mấy câu mình muốn hỏi", "The questions on our mind"),
    bullets: [
      t("Có webhook cho việc thu hồi quyền không?", "Is there a webhook for revoked access?"),
      t("verified_account đã đủ để tin là “nhận được tiền” chưa?", "Is verified_account enough to trust that money will land?"),
      t("Phí thật theo nước/tiền tệ ra sao?", "What do real fees look like by country and currency?"),
      t("Trần rút mỗi creator? Treo → trả về có tự động không?", "Payout caps per creator? Is unclaimed → returned automatic?"),
      t("Cho tụi mình sandbox nhé? PayPal có đỡ phần thuế / 1099 không?", "Could we get a sandbox? And does PayPal help with tax / 1099?"),
    ],
  },

  // ---- Closing -----------------------------------------------------------
  {
    kind: "closing",
    title: t("Làm chung nhé", "Let's build it together"),
    subtitle: t(
      "Bước kế: cho tụi mình sandbox và một buổi kỹ thuật để ráp các API.",
      "Next up: a sandbox, and a technical call to map the APIs.",
    ),
    note: t("Cảm ơn — đội ReelMe.", "Thank you — the ReelMe team."),
    cta: "ReelMe.AI",
  },
];

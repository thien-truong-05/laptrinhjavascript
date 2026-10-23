/* ProSneaker - shared core: data, state, cart, auth, layout */
const IMG = {
    a: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    b: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    c: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
    d: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
    e: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    f: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80",
    g: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80",
    h: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
};
const FALLBACK_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="600" height="600" fill="#e2e8f0"/><text x="300" y="310" font-size="28" text-anchor="middle" fill="#94a3b8" font-family="sans-serif">ProSneaker</text></svg>');
 
const DEFAULT_PRODUCTS = [
    { id: 1, name: "Nike Air Zoom Pegasus 40", brand: "Nike", price: 3500000, oldPrice: 4200000, rating: 4.8, image: IMG.a, thumbnails: [IMG.a, IMG.e], sizes: [39, 40, 41, 42, 43], colors: ["Đỏ/Đen", "Trắng/Xám"], description: "Đôi giày chạy bộ đa năng với đệm React siêu êm ái kết hợp cùng túi khí Zoom Air gấp đôi sự đàn hồi." },
    { id: 2, name: "Adidas Ultraboost Light 23", brand: "Adidas", price: 4100000, oldPrice: 4800000, rating: 4.9, image: IMG.b, thumbnails: [IMG.b, IMG.f], sizes: [40, 41, 42, 43], colors: ["Đen/Trắng", "Xám"], description: "Ultraboost nhẹ nhất từ trước đến nay nhờ chất liệu Light BOOST đột phá." },
    { id: 3, name: "Puma Velocity Nitro 2", brand: "Puma", price: 2450000, oldPrice: 3100000, rating: 4.6, image: IMG.c, thumbnails: [IMG.c, IMG.g], sizes: [38, 39, 40, 41, 42], colors: ["Xanh Dương", "Đen"], description: "Thiết kế khí động học hiện đại với bọt Nitro đặc quyền mang lại khả năng phản hồi lực ấn tượng." },
    { id: 4, name: "Air Jordan 1 Retro High OG", brand: "Jordan", price: 5200000, oldPrice: 5800000, rating: 5.0, image: IMG.d, thumbnails: [IMG.d, IMG.h], sizes: [40, 41, 42, 43, 44], colors: ["Đỏ/Trắng/Đen"], description: "Biểu tượng bóng rổ đường phố bất tử với phối màu kinh điển nâng tầm mọi outfit." },
    { id: 5, name: "Nike Revolution 7", brand: "Nike", price: 1650000, oldPrice: 1950000, rating: 4.5, image: IMG.e, thumbnails: [IMG.e, IMG.a], sizes: [38, 39, 40, 41, 42, 43], colors: ["Đen", "Trắng"], description: "Lựa chọn nhập môn cho người mới chạy bộ: nhẹ, êm và bền với mức giá dễ tiếp cận." },
    { id: 6, name: "Adidas Adizero Boston 12", brand: "Adidas", price: 3900000, oldPrice: null, rating: 4.7, image: IMG.f, thumbnails: [IMG.f, IMG.b], sizes: [39, 40, 41, 42, 43, 44], colors: ["Xanh Navy", "Cam"], description: "Giày tập tốc độ với đế Lightstrike Pro và thanh năng lượng, hỗ trợ các buổi long run lẫn tempo." },
    { id: 7, name: "Puma Deviate Nitro Elite", brand: "Puma", price: 4600000, oldPrice: 5200000, rating: 4.8, image: IMG.g, thumbnails: [IMG.g, IMG.c], sizes: [40, 41, 42, 43], colors: ["Hồng", "Trắng"], description: "Tấm carbon PWRPLATE kết hợp bọt Nitro Elite cho nhịp chạy bứt tốc và hoàn trả năng lượng cao." },
    { id: 8, name: "Jordan Air Max 270 Street", brand: "Jordan", price: 3250000, oldPrice: 3800000, rating: 4.4, image: IMG.h, thumbnails: [IMG.h, IMG.d], sizes: [39, 40, 41, 42, 43], colors: ["Đen/Đỏ", "Xám"], description: "Phong cách đường phố với đế khí Air Max 270 lớn nhất, êm ái cả ngày dài." },
    { id: 9, name: "Nike Air Max 90", brand: "Nike", price: 3200000, oldPrice: 3800000, rating: 4.7, image: IMG.a, thumbnails: [IMG.a, IMG.e], sizes: [38, 39, 40, 41, 42, 43, 44], colors: ["Trắng/Xám", "Đen/Trắng"], description: "Huyền thoại Air Max với đế khí nhìn thấy được, phong cách retro dễ phối đồ và êm ái suốt ngày dài." },
    { id: 10, name: "Nike Zoom Fly 5", brand: "Nike", price: 4500000, oldPrice: 5200000, rating: 4.8, image: IMG.e, thumbnails: [IMG.e, IMG.a], sizes: [40, 41, 42, 43, 44], colors: ["Xanh Lá", "Đen"], description: "Giày chạy đường dài với tấm carbon và bọt ZoomX, giúp hoàn trả năng lượng mỗi sải chạy." },
    { id: 11, name: "Nike Court Vision Low", brand: "Nike", price: 1850000, oldPrice: 2200000, rating: 4.4, image: IMG.a, thumbnails: [IMG.a, IMG.d], sizes: [38, 39, 40, 41, 42, 43], colors: ["Trắng", "Trắng/Xanh"], description: "Phong cách bóng rổ cổ điển trong thiết kế cổ thấp, phù hợp đi học, đi làm và dạo phố." },
    { id: 12, name: "Nike Invincible 3", brand: "Nike", price: 5100000, oldPrice: 5800000, rating: 4.9, image: IMG.e, thumbnails: [IMG.e, IMG.f], sizes: [39, 40, 41, 42, 43, 44], colors: ["Hồng/Trắng", "Xám"], description: "Đệm ZoomX dày nhất của Nike, êm vượt trội cho người chạy bộ phục hồi và chạy dài ngày." },
    { id: 13, name: "Adidas Samba OG", brand: "Adidas", price: 2600000, oldPrice: null, rating: 4.8, image: IMG.f, thumbnails: [IMG.f, IMG.b], sizes: [38, 39, 40, 41, 42, 43], colors: ["Đen/Trắng", "Trắng/Xanh Lá"], description: "Mẫu giày sân cỏ huyền thoại trở thành biểu tượng street style với da mềm và đế gum bám tốt." },
    { id: 14, name: "Adidas Superstar", brand: "Adidas", price: 2300000, oldPrice: 2700000, rating: 4.6, image: IMG.b, thumbnails: [IMG.b, IMG.h], sizes: [37, 38, 39, 40, 41, 42, 43], colors: ["Trắng/Đen"], description: "Mũi vỏ sò đặc trưng cùng ba sọc kinh điển, đôi giày thời trang không bao giờ lỗi mốt." },
    { id: 15, name: "Adidas Duramo SL", brand: "Adidas", price: 1450000, oldPrice: 1750000, rating: 4.3, image: IMG.f, thumbnails: [IMG.f, IMG.c], sizes: [38, 39, 40, 41, 42, 43, 44], colors: ["Xanh Navy", "Đen"], description: "Giày chạy bộ nhập môn nhẹ, thoáng khí, mức giá dễ tiếp cận cho người mới bắt đầu." },
    { id: 16, name: "Adidas Supernova Rise", brand: "Adidas", price: 3300000, oldPrice: 3900000, rating: 4.6, image: IMG.b, thumbnails: [IMG.b, IMG.f], sizes: [39, 40, 41, 42, 43], colors: ["Xanh Dương", "Trắng"], description: "Bọt Dreamstrike+ mang lại độ êm và ổn định, phù hợp chạy hằng ngày." },
    { id: 17, name: "Puma Suede Classic XXI", brand: "Puma", price: 2100000, oldPrice: 2500000, rating: 4.5, image: IMG.c, thumbnails: [IMG.c, IMG.g], sizes: [38, 39, 40, 41, 42, 43], colors: ["Đỏ/Trắng", "Xanh Navy"], description: "Chất liệu da lộn cổ điển, phom dáng thanh lịch, biểu tượng văn hoá đường phố từ thập niên 60." },
    { id: 18, name: "Puma RS-X Reinvention", brand: "Puma", price: 2850000, oldPrice: 3400000, rating: 4.4, image: IMG.g, thumbnails: [IMG.g, IMG.c], sizes: [39, 40, 41, 42, 43], colors: ["Đa Sắc", "Trắng/Xám"], description: "Phong cách chunky nổi bật với công nghệ đệm Running System hoài cổ." },
    { id: 19, name: "Puma Magnify Nitro 2", brand: "Puma", price: 3600000, oldPrice: 4200000, rating: 4.7, image: IMG.c, thumbnails: [IMG.c, IMG.g], sizes: [39, 40, 41, 42, 43, 44], colors: ["Cam", "Đen/Vàng"], description: "Đệm Nitro dày cùng đế mở rộng, tối ưu độ êm cho các buổi chạy dài." },
    { id: 20, name: "Puma Fast-R Nitro Elite 2", brand: "Puma", price: 5900000, oldPrice: null, rating: 4.9, image: IMG.g, thumbnails: [IMG.g, IMG.c], sizes: [40, 41, 42, 43], colors: ["Xanh Lá Neon", "Hồng"], description: "Giày đua cao cấp với tấm carbon và bọt Nitro Elite, dành cho vận động viên theo đuổi thành tích." },
    { id: 21, name: "Air Jordan 4 Retro", brand: "Jordan", price: 5500000, oldPrice: null, rating: 4.9, image: IMG.d, thumbnails: [IMG.d, IMG.h], sizes: [40, 41, 42, 43, 44], colors: ["Đen/Xám", "Trắng/Xanh"], description: "Mẫu Jordan kinh điển với lưới thoáng khí, đế Air êm ái và dáng giày đậm chất sưu tầm." },
    { id: 22, name: "Air Jordan 1 Low", brand: "Jordan", price: 3400000, oldPrice: 3900000, rating: 4.7, image: IMG.h, thumbnails: [IMG.h, IMG.d], sizes: [38, 39, 40, 41, 42, 43, 44], colors: ["Đen/Đỏ", "Trắng/Xanh Dương"], description: "Phiên bản cổ thấp linh hoạt của Jordan 1, dễ phối trang phục hằng ngày." },
    { id: 23, name: "Jordan Luka 2", brand: "Jordan", price: 4700000, oldPrice: 5300000, rating: 4.6, image: IMG.d, thumbnails: [IMG.d, IMG.f], sizes: [40, 41, 42, 43, 44], colors: ["Đen/Vàng", "Trắng/Xanh"], description: "Giày bóng rổ hiệu năng cao với đệm phản hồi nhanh và khoá gót ổn định khi đổi hướng." },
    { id: 24, name: "Jordan Stay Loyal 3", brand: "Jordan", price: 3000000, oldPrice: 3500000, rating: 4.5, image: IMG.h, thumbnails: [IMG.h, IMG.a], sizes: [39, 40, 41, 42, 43, 44], colors: ["Xám/Đen", "Trắng/Đỏ"], description: "Lấy cảm hứng từ các dòng Jordan huyền thoại, phù hợp tập luyện nhẹ và mặc hằng ngày." },
    { id: 25, name: "Nike Air Force 1 '07", brand: "Nike", price: 2900000, oldPrice: 3300000, rating: 4.8, image: IMG.a, thumbnails: [IMG.a, IMG.d], sizes: [38, 39, 40, 41, 42, 43, 44], colors: ["Trắng", "Đen"], description: "Đôi sneaker biểu tượng với đế Air êm ái và thiết kế da trắng tinh khôi dễ phối mọi outfit." },
    { id: 26, name: "Nike Dunk Low Retro", brand: "Nike", price: 3100000, oldPrice: null, rating: 4.7, image: IMG.d, thumbnails: [IMG.d, IMG.e], sizes: [38, 39, 40, 41, 42, 43], colors: ["Đen/Trắng", "Xanh/Trắng"], description: "Phối màu tương phản cổ điển từ sân bóng rổ lên phố, da bền và form gọn." },
    { id: 27, name: "Nike Vomero 17", brand: "Nike", price: 4300000, oldPrice: 4900000, rating: 4.7, image: IMG.e, thumbnails: [IMG.e, IMG.a], sizes: [39, 40, 41, 42, 43, 44], colors: ["Xám/Cam", "Đen"], description: "Đệm ZoomX kết hợp Cushlon êm ái, lựa chọn cho các buổi chạy hằng ngày đường dài." },
    { id: 28, name: "Nike Metcon 9", brand: "Nike", price: 3800000, oldPrice: 4400000, rating: 4.6, image: IMG.a, thumbnails: [IMG.a, IMG.e], sizes: [39, 40, 41, 42, 43, 44], colors: ["Đen/Xám", "Trắng"], description: "Giày tập gym và cross-training với đế phẳng vững chắc, ổn định khi nâng tạ." },
    { id: 29, name: "Nike Pegasus Trail 5", brand: "Nike", price: 3600000, oldPrice: 4100000, rating: 4.5, image: IMG.e, thumbnails: [IMG.e, IMG.a], sizes: [39, 40, 41, 42, 43], colors: ["Xanh Rêu", "Đen/Cam"], description: "Phiên bản chạy địa hình của Pegasus, đế bám tốt trên đường đất và đá." },
    { id: 30, name: "Adidas Gazelle Indoor", brand: "Adidas", price: 2700000, oldPrice: 3100000, rating: 4.7, image: IMG.b, thumbnails: [IMG.b, IMG.f], sizes: [37, 38, 39, 40, 41, 42, 43], colors: ["Xanh Navy", "Đỏ Burgundy"], description: "Dáng giày retro da lộn mềm với đế gum, phong cách thập niên 80 đầy cá tính." },
    { id: 31, name: "Adidas Stan Smith", brand: "Adidas", price: 2400000, oldPrice: 2800000, rating: 4.6, image: IMG.f, thumbnails: [IMG.f, IMG.b], sizes: [37, 38, 39, 40, 41, 42, 43, 44], colors: ["Trắng/Xanh Lá", "Trắng/Navy"], description: "Mẫu tennis tối giản bất hủ, sạch sẽ và dễ kết hợp mọi trang phục." },
    { id: 32, name: "Adidas Adizero Adios Pro 3", brand: "Adidas", price: 5800000, oldPrice: null, rating: 4.9, image: IMG.b, thumbnails: [IMG.b, IMG.f], sizes: [40, 41, 42, 43], colors: ["Cam", "Trắng/Xanh"], description: "Giày đua marathon với thanh năng lượng Energyrods và Lightstrike Pro siêu nhẹ." },
    { id: 33, name: "Adidas Terrex Free Hiker 2", brand: "Adidas", price: 4800000, oldPrice: 5500000, rating: 4.5, image: IMG.f, thumbnails: [IMG.f, IMG.b], sizes: [39, 40, 41, 42, 43, 44], colors: ["Đen", "Xám/Xanh"], description: "Giày đi bộ đường dài với đế Continental bám tốt và lớp lót thoáng khí." },
    { id: 34, name: "Adidas Campus 00s", brand: "Adidas", price: 2650000, oldPrice: 3000000, rating: 4.5, image: IMG.b, thumbnails: [IMG.b, IMG.h], sizes: [37, 38, 39, 40, 41, 42, 43], colors: ["Xanh Rêu", "Hồng Pastel"], description: "Đế dày chunky, da lộn mềm, mang hơi thở streetwear đầu thập niên 2000." },
    { id: 35, name: "Puma Palermo", brand: "Puma", price: 2200000, oldPrice: 2600000, rating: 4.4, image: IMG.c, thumbnails: [IMG.c, IMG.g], sizes: [38, 39, 40, 41, 42, 43], colors: ["Xanh/Trắng", "Be"], description: "Giày terrace cổ điển phong cách bóng đá thập niên 80, đế gum hợp thời trang." },
    { id: 36, name: "Puma Caven 2.0", brand: "Puma", price: 1500000, oldPrice: 1800000, rating: 4.3, image: IMG.g, thumbnails: [IMG.g, IMG.c], sizes: [38, 39, 40, 41, 42, 43, 44], colors: ["Đen/Trắng", "Trắng"], description: "Sneaker thể thao mức giá dễ chịu, thiết kế gọn nhẹ đi học và đi làm." },
    { id: 37, name: "Puma Electrify Nitro 4", brand: "Puma", price: 3400000, oldPrice: 3900000, rating: 4.6, image: IMG.c, thumbnails: [IMG.c, IMG.g], sizes: [39, 40, 41, 42, 43], colors: ["Cam", "Xanh Dương"], description: "Giày chạy đệm Nitro êm và nảy, phù hợp tập luyện hằng ngày." },
    { id: 38, name: "Puma Speedcat OG", brand: "Puma", price: 2750000, oldPrice: null, rating: 4.5, image: IMG.g, thumbnails: [IMG.g, IMG.c], sizes: [37, 38, 39, 40, 41, 42], colors: ["Đen/Đỏ", "Trắng/Xanh"], description: "Dáng giày đua cổ điển mỏng nhẹ, đế mỏng cho cảm giác chạm đất thật." },
    { id: 39, name: "Air Jordan 3 Retro", brand: "Jordan", price: 5600000, oldPrice: null, rating: 4.9, image: IMG.d, thumbnails: [IMG.d, IMG.h], sizes: [40, 41, 42, 43, 44], colors: ["Trắng/Xi Măng", "Đen/Đỏ"], description: "Họa tiết xi măng đặc trưng cùng đệm Air Visible, biểu tượng của dòng Jordan." },
    { id: 40, name: "Air Jordan 11 Low", brand: "Jordan", price: 5300000, oldPrice: 5900000, rating: 4.8, image: IMG.h, thumbnails: [IMG.h, IMG.d], sizes: [40, 41, 42, 43, 44], colors: ["Trắng/Đen", "Xanh Navy"], description: "Mũi da bóng sang trọng, đế carbon bền chắc, kiểu dáng thanh lịch." },
    { id: 41, name: "Jordan Max Aura 5", brand: "Jordan", price: 2900000, oldPrice: 3400000, rating: 4.4, image: IMG.d, thumbnails: [IMG.d, IMG.f], sizes: [39, 40, 41, 42, 43, 44], colors: ["Đen/Trắng", "Xám/Đỏ"], description: "Lấy cảm hứng từ Jordan huyền thoại với đế Air Max êm, phù hợp đi hằng ngày." },
    { id: 42, name: "Jordan Tatum 3", brand: "Jordan", price: 4500000, oldPrice: 5100000, rating: 4.7, image: IMG.h, thumbnails: [IMG.h, IMG.a], sizes: [40, 41, 42, 43, 44], colors: ["Trắng/Xanh Lá", "Đen/Cam"], description: "Giày bóng rổ nhẹ với đệm Zoom Strobel, ôm chân và phản hồi nhanh." },
    { id: 43, name: "Air Jordan 5 Retro", brand: "Jordan", price: 5700000, oldPrice: null, rating: 4.8, image: IMG.d, thumbnails: [IMG.d, IMG.h], sizes: [40, 41, 42, 43, 44], colors: ["Đen/Bạc", "Trắng/Đỏ"], description: "Lưỡi giày bóng loáng và họa tiết lấy cảm hứng từ máy bay chiến đấu, mẫu sưu tầm được săn đón." },
    { id: 44, name: "Jordan Spizike Low", brand: "Jordan", price: 4200000, oldPrice: 4800000, rating: 4.6, image: IMG.h, thumbnails: [IMG.h, IMG.d], sizes: [39, 40, 41, 42, 43, 44], colors: ["Trắng/Xám", "Đen/Xanh"], description: "Tổng hợp chi tiết từ nhiều dòng Jordan cổ điển trong phom cổ thấp độc đáo." }
];
const DEFAULT_USERS = [
    { id: 1, name: "Quản Trị Viên", email: "admin@sport.com", password: "admin123", role: "admin", phone: "", createdAt: "2026-01-10" },
    { id: 2, name: "Nguyễn Văn Khách", email: "user@sport.com", password: "user123", role: "user", phone: "0901234567", createdAt: "2026-02-15" }
];
const DEFAULT_ORDERS = [
    { id: "#PS-10293", userEmail: "user@sport.com", customerName: "Nguyễn Văn Khách", phone: "0901234567", email: "user@sport.com", address: "123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh", date: "2026-03-20", total: 3530000, payment: "COD", status: "PENDING", items: [{ name: "Nike Air Zoom Pegasus 40", price: 3500000, size: 41, color: "Đỏ/Đen", qty: 1, image: IMG.a }] },
    { id: "#PS-88219", userEmail: "tranthib@example.com", customerName: "Trần Thị B", phone: "0918882233", email: "tranthib@example.com", address: "45 Lê Lợi, Quận Hải Châu, Đà Nẵng", date: "2026-03-19", total: 4130000, payment: "BANK", status: "COMPLETED", items: [{ name: "Adidas Ultraboost Light 23", price: 4100000, size: 40, color: "Đen/Trắng", qty: 1, image: IMG.b }] }
];
const COUPONS = { DISCOUNT10: 10, SPORT20: 20 };
const STATUS_LABEL = { PENDING: "Chờ xử lý", SHIPPING: "Đang giao", COMPLETED: "Hoàn thành", CANCELLED: "Đã hủy" };
const STATUS_CLASS = { PENDING: "bg-amber-100 text-amber-700", SHIPPING: "bg-blue-100 text-blue-700", COMPLETED: "bg-emerald-100 text-emerald-700", CANCELLED: "bg-red-100 text-red-700" };
const DISTRICTS_MAP = {
    "Hà Nội": ["Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Cầu Giấy", "Quận Đống Đa", "Quận Hai Bà Trưng"],
    "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7", "Quận Bình Thạnh", "Thành phố Thủ Đức"],
    "Đà Nẵng": ["Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Liên Chiểu", "Huyện Hòa Vang"],
    "Cần Thơ": ["Quận Ninh Kiều", "Quận Bình Thủy", "Quận Cái Răng"],
    "Hải Phòng": ["Quận Hồng Bàng", "Quận Ngô Quyền", "Quận Lê Chân"]
};
 
/* ---------- Storage ---------- */
const KEYS = { products: 'pro_products', users: 'pro_users', orders: 'pro_orders', cur: 'pro_current_user', cart: 'pro_cart', coupon: 'pro_coupon', msgs: 'pro_messages' };
function load(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return (v === null || v === undefined) ? d : v; } catch (e) { return d; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.warn(e); } }
 
let products = load(KEYS.products, DEFAULT_PRODUCTS);
let users = load(KEYS.users, DEFAULT_USERS);
let orders = load(KEYS.orders, DEFAULT_ORDERS);
let cart = load(KEYS.cart, []);
let messages = load(KEYS.msgs, []);
let discountCode = load(KEYS.coupon, null);
let currentUser = (() => {
    const stored = load(KEYS.cur, null);
    if (!stored) return null;
    return users.find(u => u.id === stored.id) || null;
})();
 
function saveState() {
    save(KEYS.products, products);
    save(KEYS.users, users);
    save(KEYS.orders, orders);
    save(KEYS.cur, currentUser ? { id: currentUser.id } : null);
    save(KEYS.cart, cart);
    save(KEYS.coupon, discountCode);
    save(KEYS.msgs, messages);
}
 
/* ---------- Helpers ---------- */
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function formatVND(n) { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n || 0); }
function qs(name) { return new URLSearchParams(location.search).get(name); }
function currentPage() { return (location.pathname.split('/').pop() || 'index.html').toLowerCase(); }
function safeRedirect(url) { return /^[a-z0-9\-_]+\.html(\?.*)?$/i.test(url || '') ? url : 'index.html'; }
function getProduct(id) { return products.find(p => p.id === Number(id)); }
function discountPct(p) { return p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0; }
function stars(rating) {
    const full = Math.floor(rating), half = rating - full >= 0.5;
    let h = '';
    for (let i = 0; i < 5; i++) h += `<i class="fa-${i < full ? 'solid fa-star' : (i === full && half ? 'solid fa-star-half-stroke' : 'regular fa-star')}"></i>`;
    return h;
}
 
let toastTimer;
function showToast(msg, type = 'ok') {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.className = 'fixed bottom-5 right-5 z-[60] bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none border border-slate-700 max-w-xs';
        t.innerHTML = '<i id="toastIcon" class="fa-solid fa-circle-check text-emerald-400 text-lg"></i><span id="toastMsg" class="text-xs font-semibold"></span>';
        document.body.appendChild(t);
    }
    document.getElementById('toastMsg').innerText = msg;
    document.getElementById('toastIcon').className = type === 'err' ? 'fa-solid fa-circle-exclamation text-red-400 text-lg' : 'fa-solid fa-circle-check text-emerald-400 text-lg';
    t.classList.remove('translate-y-20', 'opacity-0');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.add('translate-y-20', 'opacity-0'), 3000);
}
 
/* ---------- Auth ---------- */
function login(email, pass) {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
    if (!found) return false;
    currentUser = found; saveState(); return true;
}
function logout() { currentUser = null; saveState(); location.href = 'index.html'; }
function requireLogin() {
    if (!currentUser) {
        const need = (currentPage() === 'checkout.html') ? '&need=order' : '';
        location.replace('login.html?redirect=' + encodeURIComponent(currentPage() + location.search) + need);
        return false;
    }
    return true;
}
function requireAdmin() {
    if (!currentUser) { location.replace('login.html?redirect=admin.html'); return false; }
    if (currentUser.role !== 'admin') { alert('Bạn không có quyền truy cập trang quản trị.'); location.replace('index.html'); return false; }
    return true;
}
 
/* ---------- Cart ---------- */
function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartSubtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function discountPercent() { return discountCode && COUPONS[discountCode] ? COUPONS[discountCode] : 0; }
function cartDiscount() { return Math.round(cartSubtotal() * discountPercent() / 100); }
function addToCart(product, size, color, qty = 1) {
    const key = `${product.id}-${size}-${color}`;
    const ex = cart.find(i => i.key === key);
    if (ex) ex.qty += qty;
    else cart.push({ key, id: product.id, name: product.name, price: product.price, image: product.image, size, color, qty });
    saveState(); updateCartBadge();
}
function quickAddToCart(id) {
    const p = getProduct(id); if (!p) return;
    const size = p.sizes[0], color = (p.colors && p.colors[0]) || 'Tiêu Chuẩn';
    addToCart(p, size, color, 1);
    showToast(`Đã thêm ${p.name} (Size ${size}) vào giỏ!`);
}
function updateCartBadge() {
    const b = document.getElementById('cartBadge'); if (!b) return;
    const n = cartCount(); b.innerText = n; b.classList.toggle('hidden', n === 0);
}
 
/* ---------- Product card ---------- */
function productCard(p) {
    const d = discountPct(p);
    return `
    <div class="product-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col">
        <a href="product.html?id=${p.id}" class="relative block bg-slate-100 overflow-hidden aspect-square">
            <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG" class="product-image object-cover w-full h-full transition duration-500">
            <span class="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">${esc(p.brand)}</span>
            ${d ? `<span class="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">-${d}%</span>` : ''}
        </a>
        <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-1 text-amber-400 text-xs mb-1"><i class="fa-solid fa-star"></i><span class="text-slate-600 font-bold text-[11px] ml-0.5">${p.rating}</span></div>
                <a href="product.html?id=${p.id}" class="font-bold text-slate-800 text-sm hover:text-orange-600 transition line-clamp-1 block">${esc(p.name)}</a>
                <div class="mt-2 flex items-baseline gap-2">
                    <span class="font-black text-slate-900 text-base">${formatVND(p.price)}</span>
                    ${p.oldPrice ? `<span class="text-xs text-slate-400 line-through">${formatVND(p.oldPrice)}</span>` : ''}
                </div>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <a href="product.html?id=${p.id}" class="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-lg transition">Xem Chi Tiết</a>
                <button onclick="quickAddToCart(${p.id})" class="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-lg transition shadow-md shadow-orange-500/20" title="Thêm nhanh"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
    </div>`;
}
 
/* ---------- Layout (header / footer) ---------- */
function renderHeader() {
    const el = document.getElementById('site-header'); if (!el) return;
    const page = currentPage();
    const nav = [['index.html', 'Trang Chủ'], ['products.html', 'Sản Phẩm'], ['about.html', 'Giới Thiệu'], ['contact.html', 'Liên Hệ'], ['policy.html', 'Chính Sách']];
    const link = (h, t, mobile) => `<a href="${h}" class="${mobile ? 'block py-2.5 px-2 rounded-lg' : ''} text-sm font-semibold transition ${page === h ? 'text-orange-400' : 'text-slate-300 hover:text-white'}">${t}</a>`;
    const auth = currentUser ? `
        <div class="relative group">
            <a href="account.html" class="flex items-center gap-2 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-xl hover:bg-slate-700 transition">
                <span class="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xs uppercase">${esc(currentUser.name.charAt(0))}</span>
                <span class="text-left hidden lg:block"><span class="block text-xs font-bold text-white truncate max-w-[100px]">${esc(currentUser.name)}</span><span class="block text-[10px] text-orange-400 uppercase font-semibold">${esc(currentUser.role)}</span></span>
            </a>
            <div class="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
                <div class="w-48 bg-white text-slate-700 rounded-xl shadow-xl border border-slate-200 overflow-hidden text-sm">
                    <a href="account.html" class="block px-4 py-2.5 hover:bg-slate-50"><i class="fa-regular fa-user w-5"></i> Tài khoản</a>
                    <a href="account.html#orders" class="block px-4 py-2.5 hover:bg-slate-50"><i class="fa-solid fa-receipt w-5"></i> Đơn hàng của tôi</a>
                    ${currentUser.role === 'admin' ? '<a href="admin.html" class="block px-4 py-2.5 hover:bg-slate-50 text-orange-600 font-semibold"><i class="fa-solid fa-gauge-high w-5"></i> Trang quản trị</a>' : ''}
                    <button onclick="logout()" class="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-500 border-t border-slate-100"><i class="fa-solid fa-right-from-bracket w-5"></i> Đăng xuất</button>
                </div>
            </div>
        </div>` : `
        <a href="login.html" class="text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-3.5 py-2 rounded-xl transition"><i class="fa-solid fa-right-to-bracket mr-1"></i> Đăng Nhập</a>
        <a href="register.html" class="hidden sm:inline-block text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl transition">Đăng Ký</a>`;
    el.innerHTML = `
    <header class="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <a href="index.html" class="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-wider uppercase text-white hover:opacity-90 transition">
                <span class="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30"><i class="fa-solid fa-shoe-prints -rotate-45"></i></span>
                <span>PRO<span class="text-orange-500">SNEAKER</span></span>
            </a>
            <nav class="hidden lg:flex items-center gap-6">${nav.map(n => link(n[0], n[1])).join('')}</nav>
            <form action="products.html" method="get" class="hidden md:flex flex-1 max-w-xs">
                <div class="relative w-full">
                    <input type="text" name="q" placeholder="Tìm tên giày, thương hiệu..." class="w-full bg-slate-800/80 text-sm text-white placeholder-slate-400 rounded-full pl-10 pr-4 py-2.5 border border-slate-700 focus:outline-none focus:border-orange-500 transition">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                </div>
            </form>
            <div class="flex items-center gap-2 sm:gap-3">
                ${currentUser && currentUser.role === 'admin' ? '<a href="admin.html" class="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md"><i class="fa-solid fa-gauge-high"></i> Admin</a>' : ''}
                ${auth}
                <a href="cart.html" class="relative bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-full transition border border-slate-700 w-10 h-10 flex items-center justify-center" title="Giỏ hàng">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span id="cartBadge" class="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 hidden">0</span>
                </a>
                <button onclick="document.getElementById('mobileMenu').classList.toggle('hidden')" class="lg:hidden w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center"><i class="fa-solid fa-bars"></i></button>
            </div>
        </div>
        <div id="mobileMenu" class="hidden lg:hidden border-t border-slate-800 bg-slate-900 px-4 py-3">
            <form action="products.html" method="get" class="mb-2"><input type="text" name="q" placeholder="Tìm kiếm giày..." class="w-full bg-slate-800 text-sm text-white placeholder-slate-400 rounded-lg px-3 py-2.5 border border-slate-700 outline-none focus:border-orange-500"></form>
            ${nav.map(n => link(n[0], n[1], true)).join('')}
            ${currentUser && currentUser.role === 'admin' ? '<a href="admin.html" class="block py-2.5 px-2 text-sm font-semibold text-orange-400">Trang quản trị</a>' : ''}
        </div>
    </header>`;
    updateCartBadge();
}
 
function renderFooter() {
    const el = document.getElementById('site-footer'); if (!el) return;
    el.innerHTML = `
    <footer class="bg-slate-900 text-slate-400 mt-16 border-t border-slate-800 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="col-span-2 md:col-span-1 space-y-3">
                <div class="flex items-center gap-2 text-white font-black text-lg"><i class="fa-solid fa-shoe-prints text-orange-500"></i> PROSNEAKER</div>
                <p class="text-xs leading-relaxed">Hệ thống phân phối giày thể thao chính hãng. Bứt phá giới hạn trên từng bước chân.</p>
                <div class="flex gap-3 text-lg text-slate-500"><a href="contact.html" class="hover:text-orange-400"><i class="fa-brands fa-facebook"></i></a><a href="contact.html" class="hover:text-orange-400"><i class="fa-brands fa-instagram"></i></a><a href="contact.html" class="hover:text-orange-400"><i class="fa-brands fa-tiktok"></i></a></div>
            </div>
            <div><h4 class="text-white font-bold mb-3 text-xs uppercase tracking-wider">Mua sắm</h4>
                <ul class="space-y-2 text-xs"><li><a href="products.html" class="hover:text-orange-400">Tất cả sản phẩm</a></li><li><a href="products.html?brand=Nike" class="hover:text-orange-400">Nike</a></li><li><a href="products.html?brand=Adidas" class="hover:text-orange-400">Adidas</a></li><li><a href="products.html?brand=Puma" class="hover:text-orange-400">Puma</a></li><li><a href="products.html?brand=Jordan" class="hover:text-orange-400">Jordan</a></li></ul></div>
            <div><h4 class="text-white font-bold mb-3 text-xs uppercase tracking-wider">Hỗ trợ</h4>
                <ul class="space-y-2 text-xs"><li><a href="policy.html#shipping" class="hover:text-orange-400">Chính sách giao hàng</a></li><li><a href="policy.html#return" class="hover:text-orange-400">Đổi trả &amp; hoàn tiền</a></li><li><a href="policy.html#warranty" class="hover:text-orange-400">Bảo hành</a></li><li><a href="policy.html#faq" class="hover:text-orange-400">Câu hỏi thường gặp</a></li></ul></div>
            <div><h4 class="text-white font-bold mb-3 text-xs uppercase tracking-wider">Liên hệ</h4>
                <ul class="space-y-2 text-xs"><li><i class="fa-solid fa-location-dot w-4 text-orange-500"></i> 123 Nguyễn Văn Linh, Đà Nẵng</li><li><i class="fa-solid fa-phone w-4 text-orange-500"></i> 0905 123 456</li><li><i class="fa-solid fa-envelope w-4 text-orange-500"></i> support@prosneaker.vn</li><li><a href="about.html" class="hover:text-orange-400">Về chúng tôi</a></li></ul></div>
        </div>
        <div class="border-t border-slate-800 py-4 text-center text-xs">© 2026 ProSneaker Store. Hệ thống phân phối &amp; quản lý giày thể thao chuyên nghiệp.</div>
    </footer>`;
}
 
function initLayout() { renderHeader(); renderFooter(); }
initLayout();
 
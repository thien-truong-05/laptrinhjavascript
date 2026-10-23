/* ProSneaker - Admin dashboard logic (depends on app.js) */
if (requireAdmin()) {
    document.getElementById('adminRoot').classList.remove('hidden');

    function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
    function openModal(id) { document.getElementById(id).classList.remove('hidden'); }

    /* ---- Metrics ---- */
    function renderMetrics() {
        const rev = orders.reduce((s, o) => o.status === 'COMPLETED' ? s + (o.total || 0) : s, 0);
        const pending = orders.filter(o => o.status === 'PENDING').length;
        document.getElementById('mRevenue').innerText = formatVND(rev);
        document.getElementById('mOrders').innerText = orders.length;
        document.getElementById('mPending').innerText = pending ? `(${pending} chờ)` : '';
        document.getElementById('mProducts').innerText = products.length;
        document.getElementById('mUsers').innerText = users.length;
        const unread = messages.filter(m => !m.read).length;
        const b = document.getElementById('msgBadge');
        b.innerText = unread; b.classList.toggle('hidden', !unread);
    }

    /* ---- Tabs ---- */
    function showAdminTab(t) {
        if (!['products', 'orders', 'users', 'messages'].includes(t)) t = 'products';
        document.querySelectorAll('.atab-panel').forEach(p => p.classList.add('hidden'));
        document.getElementById('atab-' + t).classList.remove('hidden');
        document.querySelectorAll('button.atab').forEach(b => {
            const on = b.dataset.tab === t;
            b.classList.toggle('border-orange-500', on); b.classList.toggle('text-orange-600', on);
            b.classList.toggle('border-transparent', !on); b.classList.toggle('text-slate-500', !on);
        });
        history.replaceState(null, '', '#' + t);
    }
    document.querySelectorAll('button.atab').forEach(b => b.onclick = () => showAdminTab(b.dataset.tab));

    /* ---- Products ---- */
    function renderProducts() {
        const kw = document.getElementById('prodSearch').value.trim().toLowerCase();
        const list = products.filter(p => !kw || p.name.toLowerCase().includes(kw) || p.brand.toLowerCase().includes(kw));
        document.getElementById('tbProducts').innerHTML = list.map(p => `
            <tr class="hover:bg-slate-50/80">
                <td class="py-3 px-4"><div class="flex items-center gap-3"><img src="${esc(p.image)}" onerror="this.onerror=null;this.src=FALLBACK_IMG" class="w-10 h-10 rounded-lg object-cover border border-slate-200"><a href="product.html?id=${p.id}" class="font-bold text-slate-800 hover:text-orange-600 truncate max-w-[220px]">${esc(p.name)}</a></div></td>
                <td class="py-3 px-4 font-semibold text-slate-600">${esc(p.brand)}</td>
                <td class="py-3 px-4 font-black text-orange-600">${formatVND(p.price)}</td>
                <td class="py-3 px-4 text-slate-500">${p.sizes.join(', ')}</td>
                <td class="py-3 px-4 text-amber-500 font-bold"><i class="fa-solid fa-star mr-1"></i>${p.rating}</td>
                <td class="py-3 px-4 text-right space-x-3"><button onclick="openProductModal(${p.id})" class="text-blue-600 hover:text-blue-800 font-bold text-xs">Sửa</button><button onclick="deleteProduct(${p.id})" class="text-red-500 hover:text-red-700 font-bold text-xs">Xóa</button></td>
            </tr>`).join('') || '<tr><td colspan="6" class="py-8 text-center text-slate-400">Không có sản phẩm</td></tr>';
    }
    function openProductModal(id) {
        document.getElementById('brandList').innerHTML = [...new Set(products.map(p => p.brand))].map(b => `<option value="${esc(b)}">`).join('');
        const f = document.getElementById('productForm'); f.reset();
        document.getElementById('fId').value = '';
        document.getElementById('fRating').value = 5;
        document.getElementById('pmTitle').innerText = id ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới';
        if (id) {
            const p = getProduct(id); if (!p) return;
            document.getElementById('fId').value = p.id;
            document.getElementById('fName').value = p.name;
            document.getElementById('fBrand').value = p.brand;
            document.getElementById('fPrice').value = p.price;
            document.getElementById('fOld').value = p.oldPrice || '';
            document.getElementById('fRating').value = p.rating;
            document.getElementById('fSizes').value = p.sizes.join(', ');
            document.getElementById('fColors').value = (p.colors || []).join(', ');
            document.getElementById('fImage').value = p.image;
            document.getElementById('fThumbs').value = (p.thumbnails || []).filter(t => t !== p.image).join('\n');
            document.getElementById('fDesc').value = p.description || '';
        }
        openModal('productModal');
    }
    document.getElementById('productForm').onsubmit = e => {
        e.preventDefault();
        const v = id => document.getElementById(id).value.trim();
        const sizes = [...new Set(v('fSizes').split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)))].sort((a, b) => a - b);
        if (!sizes.length) { showToast('Vui lòng nhập ít nhất một size hợp lệ', 'err'); return; }
        const price = parseInt(v('fPrice')), oldRaw = v('fOld'), oldPrice = oldRaw ? parseInt(oldRaw) : null;
        if (oldPrice && oldPrice < price) { showToast('Giá gốc phải lớn hơn hoặc bằng giá bán', 'err'); return; }
        const colors = v('fColors').split(',').map(c => c.trim()).filter(Boolean);
        const image = v('fImage');
        const extra = v('fThumbs').split('\n').map(s => s.trim()).filter(Boolean);
        const data = {
            name: v('fName'), brand: v('fBrand'), price, oldPrice, sizes, image,
            rating: Math.min(5, Math.max(0, parseFloat(v('fRating')) || 5)),
            colors: colors.length ? colors : ['Tiêu Chuẩn'],
            thumbnails: [image, ...extra], description: v('fDesc')
        };
        const id = v('fId');
        if (id) { const i = products.findIndex(p => p.id === Number(id)); if (i > -1) products[i] = { ...products[i], ...data }; }
        else products.unshift({ id: Date.now(), ...data });
        saveState(); renderProducts(); renderMetrics(); closeModal('productModal'); showToast('Đã lưu sản phẩm!');
    };
    function deleteProduct(id) {
        if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) return;
        products = products.filter(p => p.id !== id);
        cart = cart.filter(i => i.id !== id);
        saveState(); renderProducts(); renderMetrics(); showToast('Đã xóa sản phẩm!');
    }

    /* ---- Orders ---- */
    function renderOrders() {
        const f = document.getElementById('orderFilter').value;
        const list = orders.filter(o => !f || o.status === f);
        document.getElementById('tbOrders').innerHTML = list.map(o => `
            <tr class="hover:bg-slate-50/80">
                <td class="py-3 px-4"><button onclick="viewOrder('${esc(o.id)}')" class="font-bold text-orange-600 hover:underline">${esc(o.id)}</button></td>
                <td class="py-3 px-4 font-semibold">${esc(o.customerName)}</td>
                <td class="py-3 px-4 text-slate-600">${esc(o.phone)}</td>
                <td class="py-3 px-4 font-black">${formatVND(o.total)}</td>
                <td class="py-3 px-4 text-slate-500">${o.payment === 'BANK' ? 'Chuyển khoản' : 'COD'}</td>
                <td class="py-3 px-4"><span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${STATUS_CLASS[o.status] || ''}">${STATUS_LABEL[o.status] || esc(o.status)}</span></td>
                <td class="py-3 px-4 text-right"><select onchange="setOrderStatus('${esc(o.id)}', this.value)" class="text-xs bg-white border border-slate-300 rounded px-2 py-1 outline-none">
                    ${Object.keys(STATUS_LABEL).map(s => `<option value="${s}" ${o.status === s ? 'selected' : ''}>${STATUS_LABEL[s]}</option>`).join('')}</select></td>
            </tr>`).join('') || '<tr><td colspan="7" class="py-8 text-center text-slate-400">Không có đơn hàng</td></tr>';
    }
    function setOrderStatus(id, status) {
        const o = orders.find(x => x.id === id); if (!o) return;
        o.status = status; saveState(); renderOrders(); renderMetrics();
        showToast(`Đơn ${id}: ${STATUS_LABEL[status]}`);
    }
    function viewOrder(id) {
        const o = orders.find(x => x.id === id); if (!o) return;
        document.getElementById('orderDetail').innerHTML = `
            <h3 class="text-xl font-extrabold text-orange-600">${esc(o.id)}</h3>
            <p class="text-xs text-slate-500 mb-4">Ngày đặt ${esc(o.date)} · <span class="font-bold">${STATUS_LABEL[o.status] || esc(o.status)}</span></p>
            <div class="text-sm space-y-1 mb-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <p><b>Khách:</b> ${esc(o.customerName)} · ${esc(o.phone)}</p>
                <p><b>Email:</b> ${esc(o.email || o.userEmail || '')}</p>
                <p><b>Địa chỉ:</b> ${esc(o.address || '—')}</p>
                ${o.note ? `<p><b>Ghi chú:</b> ${esc(o.note)}</p>` : ''}
                <p><b>Thanh toán:</b> ${o.payment === 'BANK' ? 'Chuyển khoản' : 'COD'}</p>
            </div>
            <div class="space-y-2 mb-4">${(o.items || []).map(i => `<div class="flex items-center gap-3"><img src="${esc(i.image || '')}" onerror="this.onerror=null;this.src=FALLBACK_IMG" class="w-11 h-11 rounded-lg object-cover bg-slate-100"><div class="flex-1 min-w-0"><p class="text-sm font-semibold truncate">${esc(i.name)}</p><p class="text-xs text-slate-500">Size ${esc(i.size)} · ${esc(i.color)} · x${i.qty}</p></div><b class="text-sm">${formatVND(i.price * i.qty)}</b></div>`).join('') || '<p class="text-xs text-slate-400">Không có chi tiết sản phẩm.</p>'}</div>
            <div class="text-sm space-y-1 border-t border-slate-100 pt-3">
                ${o.subtotal !== undefined ? `<div class="flex justify-between text-slate-500"><span>Tạm tính</span><span>${formatVND(o.subtotal)}</span></div>
                ${o.discount ? `<div class="flex justify-between text-emerald-600"><span>Giảm giá ${o.coupon ? '(' + esc(o.coupon) + ')' : ''}</span><span>-${formatVND(o.discount)}</span></div>` : ''}
                <div class="flex justify-between text-slate-500"><span>Vận chuyển</span><span>${formatVND(o.shipping)}</span></div>` : ''}
                <div class="flex justify-between font-extrabold text-base"><span>Tổng</span><span class="text-orange-600">${formatVND(o.total)}</span></div>
            </div>`;
        openModal('orderModal');
    }

    /* ---- Users ---- */
    function renderUsers() {
        document.getElementById('tbUsers').innerHTML = users.map(u => {
            const self = u.id === currentUser.id;
            return `<tr class="hover:bg-slate-50/80">
                <td class="py-3 px-4 font-bold">${esc(u.name)} ${self ? '<span class="text-[10px] text-orange-500">(bạn)</span>' : ''}</td>
                <td class="py-3 px-4 text-slate-600">${esc(u.email)}</td>
                <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}">${esc(u.role)}</span></td>
                <td class="py-3 px-4 text-slate-400 text-xs">${esc(u.createdAt || '')}</td>
                <td class="py-3 px-4 text-right space-x-3">${self ? '<span class="text-xs text-slate-300">—</span>' : `
                    <button onclick="toggleRole(${u.id})" class="text-blue-600 hover:text-blue-800 font-bold text-xs">${u.role === 'admin' ? 'Hạ xuống User' : 'Nâng lên Admin'}</button>
                    <button onclick="deleteUser(${u.id})" class="text-red-500 hover:text-red-700 font-bold text-xs">Xóa</button>`}</td>
            </tr>`;
        }).join('');
    }
    function toggleRole(id) {
        const u = users.find(x => x.id === id); if (!u || u.id === currentUser.id) return;
        u.role = u.role === 'admin' ? 'user' : 'admin'; saveState(); renderUsers(); showToast('Đã cập nhật vai trò!');
    }
    function deleteUser(id) {
        const u = users.find(x => x.id === id); if (!u || u.id === currentUser.id) return;
        if (!confirm(`Xóa tài khoản ${u.email}?`)) return;
        users = users.filter(x => x.id !== id); saveState(); renderUsers(); renderMetrics(); showToast('Đã xóa tài khoản!');
    }

    /* ---- Messages ---- */
    function renderMessages() {
        document.getElementById('msgList').innerHTML = messages.map(m => `
            <div class="border ${m.read ? 'border-slate-200' : 'border-orange-300 bg-orange-50/40'} rounded-xl p-4">
                <div class="flex flex-wrap justify-between gap-2"><p class="font-bold text-sm">${esc(m.name)} <span class="font-normal text-slate-500 text-xs">&lt;${esc(m.email)}&gt;</span></p><p class="text-xs text-slate-400">${esc(m.date)}</p></div>
                <p class="text-xs font-semibold text-orange-600 mt-0.5">${esc(m.subject)}</p>
                <p class="text-sm text-slate-700 mt-2 whitespace-pre-line">${esc(m.message)}</p>
                <div class="mt-3 space-x-3 text-xs font-bold">
                    <a href="mailto:${esc(m.email)}" class="text-blue-600 hover:underline">Trả lời</a>
                    <button onclick="toggleRead(${m.id})" class="text-slate-500 hover:underline">${m.read ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}</button>
                    <button onclick="deleteMessage(${m.id})" class="text-red-500 hover:underline">Xóa</button>
                </div>
            </div>`).join('') || '<p class="text-center text-slate-400 py-8 text-sm">Chưa có liên hệ nào</p>';
    }
    function toggleRead(id) { const m = messages.find(x => x.id === id); if (m) { m.read = !m.read; saveState(); renderMessages(); renderMetrics(); } }
    function deleteMessage(id) { if (!confirm('Xóa tin nhắn này?')) return; messages = messages.filter(x => x.id !== id); saveState(); renderMessages(); renderMetrics(); }

    renderMetrics(); renderProducts(); renderOrders(); renderUsers(); renderMessages();
    showAdminTab(location.hash.replace('#', ''));
}

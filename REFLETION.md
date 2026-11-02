# Week 1 reflection

1. Building a UI imperatively means manually telling the browser how to update the DOM step by step (createElement, appendChild, etc.), while React is declarative — we describe what the UI should look like for a given state, and React handles the DOM updates for us.

2. A component name must start with a capital letter so React can tell the difference between a custom component and a regular HTML tag. Lowercase names are treated as HTML elements, so <header /> would render an HTML tag instead of our Header component.

3. A fragment <>...</> groups multiple elements so a component can return a single parent, without adding an extra element to the DOM. We avoid using <div> because it adds an unnecessary wrapper that can break CSS layouts and clutters the DOM.

4. One benefit of splitting the UI into small components is reusability — components like MenuItemCard can be reused for every menu item, and changes only need to be made in one file instead of everywhere.

# Week 2 reflection

1. count is fixed during one render. All three calls read the same count value from that render and set it to count + 1, so the last write wins. The fix is the updater form setCount((c) => c + 1), where React passes the latest value to the function each time. I use the same pattern in CartProvider with setCart((prev) => ...) so rapid "+" clicks are not lost.

2. Props come from the parent and are read-only inside the child — MenuItemCard receives item and onAdd, and VendorCard receives vendor, isSelected, onSelect. State is owned by the component and can change — CartProvider owns cart and orders, and CheckoutForm owns values and errors. Props let a child display or trigger something; state lets a component remember something.

3. React uses key to match elements between renders. In HomePage I use key={vendor.id} and in VendorPage key={item.id} — ids from the JSON, not the index. If I used the index and the list were filtered or reordered (e.g. my Week 4 search/filter), React would reuse the wrong card and the "sold out" or heart state could stick to the wrong item. Stable ids let React update only the changed cards.

4. The parent passes a function down as a prop. In MenuItemCard, the button calls onAdd(item), which is wired in VendorPage to addToCart(...). In VendorCard, onSelect(vendor.id) calls navigate('/vendor/' + id). The child never touches the parent's state directly; it just calls the function it was given.

5. Several components need the cart: Header shows the count, VendorPage calls addToCart, CartPage edits it, OrdersPage reads past orders. If the count lived in Header, VendorPage could not add to it. Lifting the cart to the provider means one source of truth and no prop drilling.

6. An empty .map() renders nothing, so the user sees a blank area. I should add an empty-state message (e.g. "No items available right now") — this is in my Week 4 TODO list.

7. At first my page went blank because I forgot to import a file, so the fetch could not read the data path. I learned to check the browser console first — the error message usually names the missing import or the wrong path.

# Week 3 reflection

1. I cannot type anything. The input's value is bound to state (query), so every keystroke is immediately overwritten by the state value on the next render. onChange is what updates the state; without it, the state never changes, so the input always shows the same value. This is why the checkout inputs in CheckoutForm must have both value={values.name} and onChange={handleChange}.

2. In SearchList, visible is computed on every render with fruits.filter(...) from query. If I stored visible in state, I would have to keep it in sync with query manually — two sources of truth that can drift. Deriving it means one source of truth (query) and the list is always correct. I use the same idea in CartProvider: count and total are useMemo-derived from cart, not stored.

3. React Strict Mode runs effects twice on mount in development to expose missing cleanups. The first effect runs, its cleanup runs (controller.abort()), then the effect runs again. If the cleanup is missing, the first request is not cancelled and you get a race condition — two responses writing to setPosts. In production Strict Mode does not double-invoke, so the request appears once.

4. const controller = new AbortController() creates a signal passed to fetch(URL, { signal: controller.signal }). The effect returns () => controller.abort(), which runs if the component unmounts before the fetch finishes. In the .catch, we check if (err.name !== 'AbortError') so a cancelled request does not set an error. Without this, a fast unmount (e.g. navigating away) would call setPosts on an unmounted component.

5. useVendors returns reload (a useCallback-wrapped load). ErrorMessage receives it as onRetry and the button calls it. Inside load, we set loading = true, clear error, and re-fetch. The lab sheet suggests a reloadKey number in the effect's dependency array; my version achieves the same by exposing reload directly, which is cleaner because the caller does not need to know about a key.

6. A flat array would create duplicate lines when the same item is added twice. In addToCart, I check prev.find((i) => i.id === item.id); if it exists, I map and increment qty; if not, I append { ...item, qty: 1 }. One item = one line, and count is cart.reduce((sum, i) => sum + i.qty, 0). When qty reaches 0 in changeQty, the line is removed via removeFromCart.

7. They are pure functions of cart. Storing them would mean updating them in every action (addToCart, changeQty, removeFromCart, placeOrder) — four places to forget. Deriving them once with useMemo means they are always correct by construction. The lab sheet explicitly says "derive with cart.reduce(...), never store it in state".

8. It takes values and returns an errors object — no React state, no hooks, no side effects. Keeping it outside CheckoutForm means it is easy to test in isolation, it does not re-create on every render, and the component stays focused on wiring inputs to state. handleSubmit calls validate(values), stores the result with setErrors(found), and only calls onPlaceOrder(values) if Object.keys(found).length === 0.

9. Without it, the browser performs its default form submission — a full page reload — which wipes React state and the cart. e.preventDefault() stops that, so the form is handled entirely in JavaScript. This was my Week 3 bug: my first version forgot it, and pressing "Place order" reloaded the page and emptied the cart. I added it as the first line of handleSubmit, and validation and onPlaceOrder then ran without a reload. (Also logged in AI_USAGE.md Week 3 — the AI's snippet forgot preventDefault and I added it myself.)

10. CartProvider calls useLocalStorage('campuseats-cart', []) and useLocalStorage('campuseats-orders', []). On mount, the hook reads localStorage.getItem(key) and JSON.parses it; on every change, a useEffect writes it back. Without it, a refresh would reset the cart to [] because React state lives only in memory. The lab sheet's "test yourself" asks exactly this: add an item, refresh, is it still there?

11. At first I did not understand why the fetch ran twice in development. Reading the Strict Mode note in the lab sheet clarified it: the double-invoke is intentional, and the fix is a proper cleanup (controller.abort()), not disabling Strict Mode.

# Week 4 reflection

1. useLocalStorage(key, initialValue) has the same shape as useState but survives a refresh. It reads once with a lazy initialiser (() => { const saved = localStorage.getItem(key); return saved !== null ? JSON.parse(saved) : initialValue }) and writes on every change through useEffect. Both cart and orders in CartProvider use it, so the cart survives a refresh — one of the Week 4 "test yourself" checks. I added try/catch around both read and write so a corrupted value or a full storage does not crash the app.

2. It returns { vendors, loading, error, reload }. It owns the fetch('/api/vendors.json'), sets loading = true before the request, clears error, and on failure stores err.message. Both HomePage and VendorPage need the same data, so a hook avoids copy-pasting the fetch and keeps each page focused on rendering. reload is the useCallback-wrapped load, so it is stable and can be passed to ErrorMessage's "Try again" button.

3. useCart reads CartContext with useContext. If ctx is null it throws useCart must be used inside <CartProvider>. This is good because a silent null would produce a confusing error later (e.g. "cannot read property addToCart of null"); the thrown message names the real problem and the fix.

4. The cart is needed by Header (count), VendorPage (addToCart), CartPage (changeQty, removeFromCart, placeOrder) and OrdersPage (orders). Before, those values were passed as props through every intermediate component. Now CartProvider owns cart and orders with useLocalStorage, computes count and total with useMemo, and provides actions. Components call useCart() directly — no prop drilling, and CartProvider is the single source of truth.

5. App.jsx wraps everything in <BrowserRouter> and <CartProvider>, then defines routes as children of <Route element={<Layout />}>. Layout renders Header, <Outlet /> and Footer, so every page shares the same shell. VendorPage reads the id with useParams(), so a deep link like /vendor/2410319-Mahasiswa-Vendor opens the correct vendor on first load and after a refresh. The selected vendor is not state — the URL is the source of truth. HomePage uses useNavigate() to go to /vendor/:id, and after a valid checkout placeOrder(details) runs and then navigate('/orders').

6. VendorPage finds no vendor with that id, so it renders "Vendor tidak dijumpai!" with a back button. An unknown URL falls into <Route path="*" element={<NotFoundPage />} />, which shows the 404 page. Both are in the Week 4 "test yourself" list.

7. My personal feature is recently viewed menu items for digit 9. It lives in src/hooks/useRecentlyViewed.js (with useLocalStorage), used by VendorPage.jsx and HomePage.jsx and stores its state in useLocalStorage because the list must survive a refresh and be remembered across pages, but it is only displayed on the home page — so it does not need to be in Context. The hook handles deduplication (newest first, max 5) and exposes clearRecent for the Clear button.

8. I would wrap the value object in CartProvider with useMemo (depending on cart, orders, count, total). Right now the object is re-created on every render, so every consumer of CartContext re-renders even when the part they use has not changed. It is not a bug, but it will matter as the app grows. 
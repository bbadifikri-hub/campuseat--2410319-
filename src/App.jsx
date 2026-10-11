import Header from './component/Header.jsx'
import VendorCard from './component/VendorCard.jsx'
import MenuItemCard from './component/MenuItemCard.jsx'
import Footer from './component/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <section>
          <h2 className="section-title">Today's vendors</h2>
          <VendorCard />
        </section>
        <section>
          <h2 className="section-title">Popular items</h2>
          <div className="grid">
            <MenuItemCard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
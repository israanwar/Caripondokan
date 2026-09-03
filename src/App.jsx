import { useState } from "react";
import {
  Bed,
  BookOpen,
  CheckCircle,
  Desk,
  Drop,
  Lamp,
  ListChecks,
  Moon,
  Sun,
} from "@phosphor-icons/react";

const rooms = [
  {
    id: "a",
    label: "Ruang A",
    image: "cp-room-a.png",
    description: "Contoh ruang dengan cahaya pagi yang lebih terbuka.",
    light: "Terang",
    lightNote: "Jendela lebar",
    bath: "Pribadi",
    bathNote: "Di dalam ruang",
    study: "Siap",
    studyNote: "Meja, kursi, lampu",
    rules: "Catat jam malam dan tamu saat survei.",
    mood: "Tenang",
  },
  {
    id: "b",
    label: "Ruang B",
    image: "cp-room-b.png",
    description: "Contoh ruang ringkas untuk membaca tata letak dan penyimpanan.",
    light: "Sedang",
    lightNote: "Jendela berpeneduh",
    bath: "Perlu tanya",
    bathNote: "Konfirmasi saat survei",
    study: "Cukup",
    studyNote: "Meja tersedia",
    rules: "Bawa daftar kebutuhan pribadi saat survei.",
    mood: "Praktis",
  },
  {
    id: "c",
    label: "Ruang C",
    image: "cp-room-c.png",
    description: "Contoh ruang dengan pencahayaan lebih redup dan meja lipat.",
    light: "Redup",
    lightNote: "Jendela sempit",
    bath: "Perlu tanya",
    bathNote: "Konfirmasi saat survei",
    study: "Perlu cek",
    studyNote: "Meja lipat tersedia",
    rules: "Tanyakan sirkulasi udara dan aturan rumah.",
    mood: "Hening",
  },
];

const criteria = [
  { key: "light", title: "Cahaya alami", subtitle: "Pagi hingga sore", Icon: Sun },
  { key: "bath", title: "Kamar mandi", subtitle: "Pribadi atau bersama", Icon: Drop },
  { key: "study", title: "Kesiapan belajar", subtitle: "Meja, kursi, lampu", Icon: Desk },
  { key: "rules", title: "Aturan rumah", subtitle: "Hal yang perlu ditanya", Icon: ListChecks },
  { key: "mood", title: "Suasana ruang", subtitle: "Kesan awal saat melihat", Icon: Moon },
];

const assetUrl = (file) => `${import.meta.env.BASE_URL}assets/${file}`;

export function App() {
  const [isSaved, setIsSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState("a");
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const activeRoom = rooms.find((room) => room.id === activeRoomId) ?? rooms[0];

  const activateRoom = (roomId) => {
    setActiveRoomId(roomId);
    document.querySelector("#comparison")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitNote = (event) => {
    event.preventDefault();
    setNoteSaved(true);
  };

  return (
    <main>
      <a className="skip-link" href="#comparison">Langsung ke perbandingan</a>
      <header className="site-header">
        <a className="brand" href="#top">Caripondokan</a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="#comparison">Bandingkan</a>
          <a href="#panduan">Panduan</a>
          <a href="#tentang">Tentang</a>
        </nav>
        <div className="header-actions">
          <button className={isSaved ? "save-button is-saved" : "save-button"} type="button" onClick={() => setIsSaved((saved) => !saved)}>
            <Bed size={17} weight="regular" aria-hidden="true" /> {isSaved ? "Tersimpan" : "Simpan"}
          </button>
          <button className="menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "Tutup" : "Menu"}</button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Menu seluler">
            <a href="#comparison" onClick={() => setMenuOpen(false)}>Bandingkan ruang</a>
            <a href="#panduan" onClick={() => setMenuOpen(false)}>Panduan survei</a>
            <a href="#tentang" onClick={() => setMenuOpen(false)}>Tentang prototype</a>
          </nav>
        )}
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Sebelum berkunjung</p>
          <h1 id="hero-title">Bandingkan.<br />Baru putuskan.</h1>
          <p>
            Lihat contoh ruang dari sinar alami, fasilitas, kesiapan belajar, dan hal yang perlu
            ditanyakan. Bukan untuk menggantikan survei—tetapi untuk datang dengan lebih siap.
          </p>
          <a className="primary-button" href="#comparison">Mulai membandingkan</a>
          <div className="hero-note"><CheckCircle size={18} weight="regular" aria-hidden="true" /> <span>Seluruh ruang di halaman ini adalah contoh demonstrasi, bukan ketersediaan aktual.</span></div>
        </div>
        <figure className="hero-image">
          <img src={assetUrl("cp-hero-room.png")} alt="Contoh ruang pondokan dengan meja belajar, tempat tidur, dan jendela terbuka." />
          <figcaption>Ruang yang perlu dilihat pelan-pelan.</figcaption>
        </figure>
      </section>

      <section id="comparison" className="comparison-section" aria-labelledby="comparison-title">
        <div className="comparison-heading">
          <div>
            <p className="eyebrow">Perbandingan contoh</p>
            <h2 id="comparison-title">Tiga ruang, beberapa pertanyaan yang lebih penting.</h2>
          </div>
          <p>Tekan kartu ruang untuk menandainya sebagai detail yang sedang kamu baca.</p>
        </div>

        <div className="comparison-scroll" tabIndex="0" aria-label="Tabel perbandingan ruang contoh">
          <div className="comparison-grid">
            <div className="grid-intro">
              <strong>Ruang yang dibandingkan</strong>
              <span>Contoh visual / bukan listing aktif</span>
            </div>
            {rooms.map((room) => (
              <button
                type="button"
                key={room.id}
                className={activeRoom.id === room.id ? "room-head is-active" : "room-head"}
                aria-pressed={activeRoom.id === room.id}
                onClick={() => setActiveRoomId(room.id)}
              >
                <img src={assetUrl(room.image)} alt={`Contoh ${room.label}: ${room.description}`} />
                <span>{room.label}</span>
                <small>{activeRoom.id === room.id ? "Sedang dibaca" : "Baca detail"}</small>
              </button>
            ))}

            {criteria.map(({ key, title, subtitle, Icon }) => (
              <div className="criterion-row" key={key}>
                <div className="criterion-label"><Icon size={22} weight="regular" aria-hidden="true" /><span><strong>{title}</strong><small>{subtitle}</small></span></div>
                {rooms.map((room) => (
                  <div className={activeRoom.id === room.id ? "criterion-value is-highlighted" : "criterion-value"} key={`${key}-${room.id}`}>
                    <strong>{room[key]}</strong>
                    {key !== "mood" && <small>{room[`${key}Note`]}</small>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="active-detail" aria-live="polite">
          <div><p className="eyebrow">Ruang yang sedang dibaca</p><h3>{activeRoom.label}</h3><p>{activeRoom.description}</p></div>
          <div className="detail-callout"><BookOpen size={24} weight="regular" aria-hidden="true" /><p>{activeRoom.rules}</p></div>
        </section>
      </section>

      <section id="panduan" className="guide-section" aria-labelledby="guide-title">
        <div>
          <p className="eyebrow">Panduan survei singkat</p>
          <h2 id="guide-title">Bawa pertanyaan yang tepat, bukan asumsi.</h2>
        </div>
        <ol>
          <li><span>01</span>Datang pada waktu yang mewakili cahaya dan aktivitas sekitar.</li>
          <li><span>02</span>Lihat meja, stopkontak, sirkulasi udara, dan penyimpanan dengan kebutuhanmu sendiri.</li>
          <li><span>03</span>Tanyakan aturan rumah, fasilitas bersama, dan apa saja yang perlu disiapkan sebelum tinggal.</li>
        </ol>
      </section>

      <section id="tentang" className="about-section">
        <div><p className="eyebrow">Tentang Caripondokan</p><h2>Ruang untuk mengambil keputusan dengan lebih tenang.</h2></div>
        <p>Caripondokan adalah prototype portofolio untuk pengalaman pencarian pondokan jangka panjang. Tidak ada alamat, harga, ketersediaan, ulasan, atau pemesanan aktual di halaman ini.</p>
      </section>

      <section className="note-section" aria-label="Catatan survei">
        <div><Lamp size={23} weight="regular" aria-hidden="true" /><p>Masih ragu? Tulis pertanyaanmu untuk dibawa saat survei.</p></div>
        <button type="button" onClick={() => { setNoteOpen((open) => !open); setNoteSaved(false); }}>{noteOpen ? "Tutup catatan" : "Buka catatan"}</button>
        {noteOpen && (
          <form onSubmit={submitNote}>
            <label htmlFor="survey-note">Catatan survei</label>
            <textarea id="survey-note" name="survey-note" required placeholder="Contoh: bagaimana kondisi air, internet, dan jam akses malam?" />
            <button type="submit">Simpan catatan demo</button>
            {noteSaved && <p className="success-message">Catatan demo siap kamu salin saat survei.</p>}
          </form>
        )}
      </section>

      <footer><span>Caripondokan</span><span>Prototype pencarian pondokan jangka panjang</span></footer>
    </main>
  );
}

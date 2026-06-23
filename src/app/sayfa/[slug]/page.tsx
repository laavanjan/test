import Image from "next/image";
import { PageShell } from "@/components/PageShell";

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "sikca-sorulan-sorular") {
    return (
      <PageShell>
        <section className="static-page shell faq-page" style={{ padding: "48px 0" }}>
          <h1 style={{ textAlign: "center", marginBottom: "32px", fontSize: "28px", fontWeight: 800 }}>Sıkça Sorulan Sorular</h1>
          <div className="faq-list">
            <details open style={{ border: "1px solid rgba(227, 231, 238, 0.95)", borderRadius: "8px", background: "#fff", padding: "16px", marginBottom: "12px" }}>
              <summary style={{ fontSize: "15px", fontWeight: 750, color: "#33363d", cursor: "pointer", userSelect: "none" }}>Varsapp&apos;tan nasıl kiralama yapabilirim?</summary>
              <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#5d6675" }}>Beğendiğiniz ürünü seçip, kiralama tarihlerinizi belirledikten sonra güvenli ödeme adımını tamamlayarak kolayca kiralama talebi oluşturabilirsiniz.</p>
            </details>
            <details style={{ border: "1px solid rgba(227, 231, 238, 0.95)", borderRadius: "8px", background: "#fff", padding: "16px", marginBottom: "12px" }}>
              <summary style={{ fontSize: "15px", fontWeight: 750, color: "#33363d", cursor: "pointer", userSelect: "none" }}>Kargo ve teslimat süreci nasıl işliyor?</summary>
              <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#5d6675" }}>Tüm kiralama siparişlerinizde gidiş ve dönüş kargo süreçleri tamamen ücretsizdir. Ürününüz kargo ile kapınıza teslim edilir.</p>
            </details>
            <details style={{ border: "1px solid rgba(227, 231, 238, 0.95)", borderRadius: "8px", background: "#fff", padding: "16px", marginBottom: "12px" }}>
              <summary style={{ fontSize: "15px", fontWeight: 750, color: "#33363d", cursor: "pointer", userSelect: "none" }}>Kiralama süresi bittiğinde ürünü nasıl teslim edeceğim?</summary>
              <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#5d6675" }}>Kiralama süreniz bittiğinde, size verilen ücretsiz kargo gönderim kodu ile en yakın kargo şubesine teslim edebilir ya da kapıdan teslim alma talebi oluşturabilirsiniz.</p>
            </details>
            <details style={{ border: "1px solid rgba(227, 231, 238, 0.95)", borderRadius: "8px", background: "#fff", padding: "16px", marginBottom: "12px" }}>
              <summary style={{ fontSize: "15px", fontWeight: 750, color: "#33363d", cursor: "pointer", userSelect: "none" }}>Kiralama süresini uzatabilir miyim?</summary>
              <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#5d6675" }}>Evet! Kiralama süreniz dolmadan önce üye panelinizden ya da müşteri hizmetlerimizle iletişime geçerek kiralama sürenizi kolayca uzatabilirsiniz.</p>
            </details>
            <details style={{ border: "1px solid rgba(227, 231, 238, 0.95)", borderRadius: "8px", background: "#fff", padding: "16px", marginBottom: "12px" }}>
              <summary style={{ fontSize: "15px", fontWeight: 750, color: "#33363d", cursor: "pointer", userSelect: "none" }}>Kiraladığım üründe hasar oluşursa ne olur?</summary>
              <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#5d6675" }}>Varsapp güvence kapsamındaki ürünlerimizde, normal kullanım kaynaklı oluşabilecek hafif çizik ve yıpranmalar güvencemiz altındadır.</p>
            </details>
          </div>
        </section>
      </PageShell>
    );
  }

  if (slug === "varsapp-teslimat-sureci-nasil-yapiliyor") {
    return (
      <PageShell>
        <section className="static-page shell delivery-process-page" style={{ padding: "48px 0", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "24px" }}>Teslimat Süreci Nasıl Yapılıyor?</h1>
          <div style={{ maxWidth: "600px", margin: "24px auto", lineHeight: "1.8", color: "#5d6675", textAlign: "left" }}>
            <p><strong>1. Kolay Rezervasyon:</strong> Ürünler seçtiğiniz tarih aralığı için adınıza rezerve edilir.</p>
            <p><strong>2. Ücretsiz Kargo:</strong> Kargo süreci kiralama süresine dahil değildir. Ürünleriniz kargo ile tamamen ücretsiz olarak gönderilir.</p>
            <p><strong>3. Kolay Teslim Etme:</strong> Kiralama süresi bittikten bir gün sonra ürün kapınızdan alınabilir ya da ücretsiz gönderim kodu ile en yakın kargo şubesine teslim edilebilir.</p>
          </div>
          <div style={{ position: "relative", width: "100%", maxWidth: "520px", height: "340px", margin: "32px auto", overflow: "hidden", borderRadius: "8px", border: "1px solid #edf0f4" }}>
            <Image src="/assets/ui/how-it-works.png" alt="Teslimat Süreci" fill style={{ objectFit: "contain", padding: "12px" }} />
          </div>
        </section>
      </PageShell>
    );
  }

  if (slug === "varsapp-kullanici-yorumlari") {
    const reviews = [
      { name: "Merve E.", product: "Instax Mini 9", rating: 5, date: "Haziran 2026", text: "Doğum günü partisi için Instax kiraladık, anında fotoğraflar harika bir hava kattı. Kargo çok hızlı geldi, kutulama özenliydi." },
      { name: "Sibel Y.", product: "Bissell Koltuk Yıkama", rating: 5, date: "Mayıs 2026", text: "Evdeki tüm koltukları tertemiz yaptı. 3 günlük süre fazlasıyla yetti. İade koduyla kolayca kargoya teslim ettim." },
      { name: "Tuğba E.", product: "PlayStation 5 Konsol", rating: 5, date: "Nisan 2026", text: "İlk defa kiralama yaptım ve 3 gün daha dursa mı diye düşündüm. Çok memnun kaldık." },
      { name: "Hakan A.", product: "Anker Nebula Projeksiyon", rating: 4, date: "Mart 2026", text: "Bahçe sineması yapmak için kiraladım. Görüntü kalitesi akşam karanlığında harika. Kurulumu da çok basitti." }
    ];

    return (
      <PageShell>
        <section className="static-page shell reviews-page" style={{ padding: "48px 0" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "16px" }}>Kullanıcılarımızın Yorumları</h1>
          <p style={{ color: "#5d6675", marginBottom: "32px" }}>Varsapp kullanıcıları ürünü satın almadan önce deneyebildiği için memnuniyet odaklı bir kiralama deneyimi yaşar. İşte bazı müşteri yorumları:</p>
          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {reviews.map((review, i) => (
              <div key={i} style={{ border: "1px solid #edf0f4", borderRadius: "8px", padding: "20px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <strong style={{ color: "#33363d" }}>{review.name}</strong>
                  <span style={{ color: "#ffb020" }}>{"★".repeat(review.rating)}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#9a9da5", marginBottom: "8px" }}>
                  {review.product} kiraladı - {review.date}
                </div>
                <p style={{ fontSize: "14px", color: "#5d6675", lineHeight: "1.5", margin: 0 }}>“{review.text}”</p>
              </div>
            ))}
          </div>
        </section>
      </PageShell>
    );
  }

  if (slug === "puan-sistemi-nedir") {
    return (
      <PageShell>
        <section className="static-page shell points-page" style={{ padding: "48px 0" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "24px" }}>Varsapp Kiralama Puan Sistemi</h1>
          <div style={{ lineHeight: "1.8", color: "#5d6675", maxWidth: "800px" }}>
            <p>Varsapp&apos;tan kiraladıkça kazanın! Kiraladığınız her ürün ve yaptığınız her işlem size puan kazandırır. Bu puanları sonraki kiralamalarınızda indirim olarak kullanabilirsiniz.</p>
            <h3 style={{ color: "#33363d", marginTop: "24px", marginBottom: "12px" }}>Nasıl Puan Kazanılır?</h3>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Her Kiralama:</strong> Kiralama tutarının %5&apos;i kadar puan hesabınıza eklenir.</li>
              <li style={{ marginBottom: "8px" }}><strong>Yorum Yapma:</strong> Kiraladığınız ürüne yorum ekleyerek ekstra 50 puan kazanırsınız.</li>
              <li style={{ marginBottom: "8px" }}><strong>Arkadaşını Davet Et:</strong> Davet kodunuzla üye olan arkadaşınızın ilk kiralamasında her ikiniz de 100 puan kazanırsınız.</li>
            </ul>
            <h3 style={{ color: "#33363d", marginTop: "24px", marginBottom: "12px" }}>Puanlar Nasıl Kullanılır?</h3>
            <p>Sepet sayfasında ödeme aşamasına geçmeden önce birikmiş puanlarınızı seçerek anında indirim kodu oluşturabilir ve kiralama bedelini düşürebilirsiniz.</p>
          </div>
        </section>
      </PageShell>
    );
  }

  if (slug === "urun-kullanim-bilgilendirmeleri") {
    return (
      <PageShell>
        <section className="static-page shell usage-page" style={{ padding: "48px 0" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "24px" }}>Ürün Kullanım Bilgilendirmeleri</h1>
          <div style={{ lineHeight: "1.8", color: "#5d6675", maxWidth: "800px" }}>
            <p>Kiraladığınız ürünlerin size en iyi şekilde hizmet etmesi için teslim aldıktan sonra dikkat etmeniz gereken bazı temel kullanım kuralları:</p>
            <h3 style={{ color: "#33363d", marginTop: "24px", marginBottom: "12px" }}>1. Paket Açılışı ve Kontrol</h3>
            <p>Ürününüz size koruyucu kutusu içinde ulaşır. Kutu içeriğinde eksik aparat veya aksesuar olup olmadığını kontrol ediniz. Herhangi bir sorun durumunda ilk 2 saat içinde destek ekibimizle iletişime geçiniz.</p>
            <h3 style={{ color: "#33363d", marginTop: "24px", marginBottom: "12px" }}>2. Doğru Kullanım Kılavuzları</h3>
            <p>Ürünle birlikte gelen veya dijital olarak paylaşılan kullanım kılavuzunu inceleyiniz. Özellikle elektronik ve buharlı temizlik makinelerini kılavuza uygun voltaj ve su doluluk seviyelerinde çalıştırınız.</p>
            <h3 style={{ color: "#33363d", marginTop: "24px", marginBottom: "12px" }}>3. Teslim Etme Hazırlığı</h3>
            <p>Kiralama süreniz bittiğinde, ürünü temiz ve tüm aparatlarıyla birlikte size ulaştığı koruyucu orijinal kutusuna koyarak paketleyiniz. Kutunun üzerine size iletilen ücretsiz gönderi barkodunu yapıştırmayı unutmayınız.</p>
          </div>
        </section>
      </PageShell>
    );
  }

  // Fallback to default layout
  return (
    <PageShell>
      <section className="static-page shell" style={{ padding: "48px 0", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800 }}>Bilinmeyen Sayfa</h1>
        <p style={{ color: "#5d6675", marginTop: "12px" }}>Aradığınız içerik bulunamadı.</p>
      </section>
    </PageShell>
  );
}

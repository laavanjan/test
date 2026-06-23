import { PageShell } from "@/components/PageShell";

const copy = {
  "varsapp-teslimat-sureci-nasil-yapiliyor": {
    title: "Teslimat Süreci Nasıl Yapılıyor?",
    lines: [
      "Ürünler seçtiğiniz tarih aralığı için rezerve edilir.",
      "Kargo süreci kiralama süresine dahil değildir.",
      "Kiralama süresi bittikten bir gün sonra ürün kapınızdan alınabilir ya da ücretsiz gönderim kodu ile kargo şubesine teslim edilebilir.",
    ],
  },
  "varsapp-kullanici-yorumlari": {
    title: "Kullanıcılarımızın Yorumları",
    lines: [
      "Varsapp kullanıcıları ürünü satın almadan önce deneyebildiği için memnuniyet odaklı bir kiralama deneyimi yaşar.",
      "Bu mock sayfa, mevcut sitedeki yorumlar alanının bağımsız bilgi sayfası karşılığıdır.",
    ],
  },
};

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = copy[slug as keyof typeof copy] ?? copy["varsapp-teslimat-sureci-nasil-yapiliyor"];

  return (
    <PageShell>
      <section className="static-page shell">
        <h1>{page.title}</h1>
        {page.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>
    </PageShell>
  );
}

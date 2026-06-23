export function AdminLocked({ failed }: { failed?: boolean }) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/70">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-500">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Giriş yap</h1>
        <span className="mt-3 block text-sm font-semibold leading-6 text-slate-500">
          Admin panelini açmak için demo admin bilgilerini gir.
        </span>
        <form action="/api/admin/login" className="mt-7 grid gap-4" method="post">
          <label className="grid gap-2 text-sm font-bold text-slate-600">
            Kullanıcı adı
            <input
              autoComplete="username"
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              name="username"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-600">
            Parola
            <input
              autoComplete="current-password"
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              name="password"
              required
              type="password"
            />
          </label>
          {failed ? <strong className="text-sm font-black text-rose-600">Kullanıcı adı veya parola hatalı.</strong> : null}
          <button
            className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
            type="submit"
          >
            Admin paneline gir
          </button>
        </form>
      </section>
    </main>
  );
}

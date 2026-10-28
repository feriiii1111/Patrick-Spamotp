/* PatrickStar Spam OTP — REST API Docs Logic */

const snippets = {
  curl: `curl -X POST "https://flox-spamotp.vercel.app/api/rest-otp" \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: Patrick" \\
  -d '{"phone":"628123456789"}'`,

  javascript: `fetch("https://flox-spamotp.vercel.app/api/rest-otp", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "Patrick"
  },
  body: JSON.stringify({ phone: "628123456789" })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));`,

  python: `import requests

url = "https://flox-spamotp.vercel.app/api/rest-otp"
headers = {
    "Content-Type": "application/json",
    "X-API-KEY": "Patrick"
}
payload = {"phone": "628123456789"}

res = requests.post(url, json=payload, headers=headers)
print(res.json())`,

  php: `<?php
$url = "https://flox-spamotp.vercel.app/api/rest-otp";
$data = json_encode(["phone" => "628123456789"]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "X-API-KEY: Patrick"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
curl_close($ch);
echo $result;`,

  nodejs: `const fetch = require('node-fetch');

fetch("https://flox-spamotp.vercel.app/api/rest-otp", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "Patrick"
  },
  body: JSON.stringify({ phone: "628123456789" })
})
.then(res => res.json())
.then(data => console.log(data));`
};

let totalRequests = 0;
let currentLang = "nodejs";

const codeBody = document.getElementById("codeBody");
const langTabs = document.querySelectorAll(".lang-tab");
const copyBtn = document.getElementById("copyBtn");
const submitBtn = document.getElementById("submitBtn");
const phoneInput = document.getElementById("phoneInput");
const keyInput = document.getElementById("keyInput");
const totalCount = document.getElementById("totalCount");
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("dropdown");

function renderCode(lang) {
  currentLang = lang;
  if (codeBody) codeBody.textContent = snippets[lang] || "";
  langTabs.forEach(t => {
    t.classList.toggle("active", t.dataset.lang === lang);
  });
}

langTabs.forEach(tab => {
  tab.addEventListener("click", () => renderCode(tab.dataset.lang));
});

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const text = snippets[currentLang] || "";
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.innerHTML = `<svg viewBox="0 0 24 24" style="width:12px;height:12px;fill:currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> COPIED`;
      setTimeout(() => {
        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" style="width:12px;height:12px;fill:currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> COPY`;
      }, 1500);
    });
  });
}

if (submitBtn) {
  submitBtn.addEventListener("click", async () => {
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const key = keyInput ? keyInput.value.trim() : API_KEY;

    if (!phone) {
      alert("Masukkan nomor target");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg class="spin" viewBox="0 0 24 24" style="width:22px;height:22px;fill:#fff"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg> Sending...`;

    // Simulate API call
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    totalRequests++;
    if (totalCount) totalCount.textContent = totalRequests;

    submitBtn.disabled = false;
    submitBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Submit Query`;
  });
}

// Menu
if (menuBtn && dropdown) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });
  document.addEventListener("click", () => dropdown.classList.remove("show"));
}

// Init
renderCode("nodejs");
if (keyInput) keyInput.value = API_KEY;
if (phoneInput) phoneInput.placeholder = "Contoh: 628123456789";

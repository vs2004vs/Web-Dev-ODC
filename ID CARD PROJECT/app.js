// Helpers
const $ = sel => document.querySelector(sel);
const form = $("#idForm");
const msg = document.querySelector("#msg");
const LS_KEY = "lr-id-simple";

// load saved data on start
(function init() {
  const saved = load();
  if (saved) {
    for (const [k, v] of Object.entries(saved)) {
      if (form[k] && form[k].type !== "file") form[k].value = v;
    }
  }
  render(saved || {});
})();

$("#btnGenerate").addEventListener("click", async () => {
  const data = getFormData();
  const files = await readFiles();
  Object.assign(data, files);
  save(data);
  render(data);
});

$("#btnClear").addEventListener("click", () => {
  localStorage.removeItem(LS_KEY);
  form.reset();
  render({});
});

// live-save text inputs
form.addEventListener("input", () => {
  const current = getFormData();
  const prev = load() || {};
  current.photoData = prev.photoData || null; // keep previous image
  save(current);
  render(current);
});

function getFormData() {
  const fd = new FormData(form);
  const d = Object.fromEntries(fd.entries());
  for (const k in d) if (typeof d[k] === "string") d[k] = d[k].trim();
  return d;
}

function save(d) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }
function load() { try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch { return null; } }

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d) ? iso : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

async function readFiles() {
  const photoFile = form.photo.files?.[0];
  const toDataURL = f => new Promise(res => {
    if (!f) return res(null);
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.readAsDataURL(f);
  });
  return { photoData: await toDataURL(photoFile) };
}

function render(d) {
  $("#outLast").textContent = d.lastName || "—";
  $("#outFirst").textContent = d.firstName || "—";
  $("#outDob").textContent = fmtDate(d.dob);
  $("#outSex").textContent = d.sex || "—";
  $("#outNin").textContent = d.nin || "LBR-0000-0000";
  $("#outAddress").textContent = d.address || "—";
  $("#outHolder").textContent = [d.firstName, d.lastName].filter(Boolean).join(" ") || "—";

  // the  photo


  const img = $("#outPhoto");
  if (d.photoData) img.src = d.photoData; else img.removeAttribute("src");

  // This is the QR with the NIN 
  const qrBox = $("#qrBox");
  qrBox.innerHTML = "";
  if (d.nin) {
    QRCode.toCanvas(d.nin, { margin: 1, scale: 6 }, (err, canvas) => {
      if (!err) {
        canvas.style.maxWidth = "95%";
        canvas.style.maxHeight = "95%";
        qrBox.appendChild(canvas);
      }
    });
  }
}

document.querySelector("#btnGenerate").addEventListener("click", async () => {
  clearMsg();
  if (!validate()) return;

  const data = getFormData();
  const files = await readFiles();
  Object.assign(data, files);
  save(data);
  render(data);
  showMsg("Updated the preview and saved your data.", "ok");
});

document.querySelector("#btnPrint").addEventListener("click", () => {
  window.print();
});

document.querySelector("#btnDownload").addEventListener("click", async () => {
  clearMsg();
  await downloadCard(document.querySelector("#cardFront"), "ID_Front.png");
  await downloadCard(document.querySelector("#cardBack"), "ID_Back.png");
  showMsg("Downloaded front and back PNG files.", "ok");
});


function validate() {
  form.dob.setCustomValidity("");

  // native required/pattern checks first
  if (!form.reportValidity()) {
    showMsg("Please fill all required fields correctly.", "error");
    return false;
  }

  // extra DOB rule
  const dobVal = form.dob.value;
  if (dobVal) {
    const dob = new Date(dobVal);
    const today = new Date();
    if (dob > today) {
      form.dob.setCustomValidity("Date of birth cannot be in the future.");
      form.reportValidity();
      showMsg("Date of birth cannot be in the future.", "error");
      return false;
    }
  }
  return true;
}


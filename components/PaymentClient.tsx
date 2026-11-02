"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";

// === Supabase konfiguratsiyasi ===
const SUPABASE_URL = "https://vxpvgeyktgyasegvycfp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin Telegram lichkasi
const ADMIN_TELEGRAM_USERNAME = "iimaan_admin1";
const PREDEF_TEXT = "Assalomu Alaykum! Men Mahbubiyat kursiga to'lov qilmoqchiman, lekin qila olmadim";
const ADMIN_LINK = `https://t.me/${ADMIN_TELEGRAM_USERNAME}?text=${encodeURIComponent(PREDEF_TEXT)}`;

const SMS_SENDER = "4546";

const PAYMENT_CARDS = {
  visa: {
    number: "4195 2500 8003 1808",
    holder: "Allanazarova Mamura",
  },
};

const PAYMENT_SERVICES = [
  {
    id: "payme",
    name: "Payme",
    logoUrl: "/payme.svg",
    color: "#D6006F",
    bgColor: "#FFE9F4",
    link: "https://payme.uz/fallback/merchant/?id=69fc5763bd28411f5dfa6d8b",
    badge: "Online to'lov",
    description: "Payme ilovasi yoki karta orqali to'lang",
  },
  {
    id: "click",
    name: "Click",
    logoUrl: "/click.png",
    color: "#00AAFF",
    bgColor: "#E8F6FF",
    link: "https://my.click.uz/services/pay/?service_id=102820&merchant_id=49607",
    badge: "Online to'lov",
    description: "Click ilovasi yoki karta orqali to'lang",
  },
  {
    id: "paynet",
    name: "Paynet",
    logoUrl: "/paynet.png",
    color: "#F5A623",
    bgColor: "#FFF6E8",
    link: "https://app.paynet.uz/?m=51415",
    badge: "Online to'lov",
    description: "Paynet terminali yoki ilovasi orqali to'lang",
  },
];

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.32l-1.67 7.88c-.12.55-.45.68-.91.42l-2.52-1.86-1.22 1.17c-.13.13-.25.25-.51.25l.18-2.57 4.65-4.2c.2-.18-.04-.28-.31-.1L7.6 14.04l-2.47-.77c-.54-.17-.55-.54.11-.8l9.64-3.72c.45-.16.84.11.69.8l.36-.01z"
        fill="#fff"
      />
    </svg>
  );
}

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const recordId      = searchParams.get("id")            || "";
  const full_name     = searchParams.get("full_name")     || "";
  const phone_number  = searchParams.get("phone_number")  || "";
  const tariff_value  = searchParams.get("tariff_value")  || "mahbubiyat";

  const [timeLeft, setTimeLeft] = useState(15 * 60);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const minutes  = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds  = String(timeLeft % 60).padStart(2, "0");
  const isUrgent = timeLeft < 3 * 60;

  const [copiedId,   setCopied]    = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setError]    = useState("");
  const [done,        setDone]     = useState(false);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(""), 2000);
    });
  }

  async function handleContinue() {
    if (!recordId || !full_name || !phone_number) {
      setError("Ma'lumotlar topilmadi. Iltimos, orqaga qayting.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const { error: updateError } = await supabase
        .from("mahbubiyat")
        .update({ is_uploaded: true })
        .eq("id", recordId);

      if (updateError) console.error("Supabase update error:", updateError);
      setDone(true);
    } catch (err: any) {
      setError(`Xatolik: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  /* ──────────────────────────────────────────
     ✅  TO'LOV TASDIQLANGANDAN KEYINGI EKRAN
  ────────────────────────────────────────── */
  if (done) {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.card, textAlign: "center" }}>

          {/* Pushti belgi */}
          <div style={{
            width: 76, height: 76, borderRadius: "50%",
            background: "linear-gradient(145deg, #FFE3F0, #FFC1E3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 18px", fontSize: 40,
            boxShadow: "0 8px 20px rgba(255,79,160,0.35), inset 0 2px 4px rgba(255,255,255,0.6)",
          }}>
            ✅
          </div>

          <p style={{ fontWeight: 900, fontSize: 20, color: "#3A1030", margin: "0 0 6px" }}>
            To'lov qabul qilindi!
          </p>
          <p style={{ fontSize: 14, color: "#8a6b7c", margin: "0 0 24px", lineHeight: 1.6 }}>
            Tabriklaymiz, <strong>{full_name}</strong>! Kursga kirish ma'lumotlari yuborildi.
          </p>

          {/* SMS haqida — 4546 raqami bilan */}
          <div style={{
            background: "linear-gradient(135deg, #FFF0F7, #FFE3F0)",
            border: "1.5px solid #FF4FA033",
            borderRadius: 18, padding: "16px", textAlign: "left", marginBottom: 14,
            boxShadow: "0 4px 14px rgba(255,79,160,0.12)",
          }}>
            <p style={{ margin: "0 0 8px", fontWeight: 800, fontSize: 14, color: "#D6006F" }}>
              📱 SMS xabari yuborildi
            </p>
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "#7a5566", lineHeight: 1.7 }}>
              100% to'lov qilinganidan so'ng,{" "}
              <strong style={{
                background: "#FFD6EA", color: "#D6006F",
                padding: "2px 8px", borderRadius: 6, fontWeight: 800,
              }}>
                {SMS_SENDER}
              </strong>{" "}
              raqamidan{" "}
              <strong style={{ color: "#3A1030" }}>{phone_number}</strong>{" "}
              raqamingizga kursga kirish uchun <strong>bir martalik havola</strong> SMS ko'rinishida yuboriladi.
            </p>
          </div>

          {/* Diqqat — bir martalik havola ogohlantirishi */}
          <div style={{
            background: "#FFF8E8", border: "1.5px solid #F5A623",
            borderRadius: 18, padding: "14px 16px", textAlign: "left", marginBottom: 24,
          }}>
            <p style={{ margin: "0 0 8px", fontWeight: 800, fontSize: 13, color: "#C07A00" }}>
              ⚠️ Muhim ogohlantirish
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#7A5000", lineHeight: 1.9 }}>
              <li>Havola <strong>faqat 1 marta</strong> ishlatiladi</li>
              <li>Havoladan bir marta kirgach, <strong>qayta ushbu havoladan kirib bo'lmaydi</strong></li>
              <li>Havolani hech kimga <strong>bermang va ulashmang</strong></li>
              <li>SMS 5 daqiqa ichida kelmasa — adminga yozing</li>
            </ul>
          </div>

          {/* Admin */}
          <p style={{ fontSize: 13, color: "#b090a0", margin: "0 0 10px" }}>
            Muammo bo'ldimi? Admin yordam beradi 👇
          </p>
          <a
            href={ADMIN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              width: "100%", padding: "15px 0",
              background: "linear-gradient(135deg, #0088CC, #00AAFF)",
              color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 16,
              textDecoration: "none",
              boxShadow: "0 6px 18px rgba(0,136,204,0.4)",
              boxSizing: "border-box",
            }}
          >
            <TelegramIcon />
            ADMINGA YOZISH
          </a>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────
     🏠  ASOSIY TO'LOV SAHIFASI
  ────────────────────────────────────────── */
  return (
    <>
      <Head>
        <title>MAHBUBIYAT KURSI UCHUN TO'LOV</title>
      </Head>
      <div style={styles.page}>

        {/* ── Timer banner ── */}
        <div style={{
          ...styles.timerBanner,
          background: isUrgent
            ? "linear-gradient(135deg, #FF3B70, #FF6B9D)"
            : "linear-gradient(135deg, #C2007A, #FF4FA0)",
        }}>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: "#fff" }}>
              MAHBUBIYAT KURSI
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
              Tarif: {tariff_value.charAt(0).toUpperCase() + tariff_value.slice(1)}
            </p>
            <p style={{ margin: "6px 0 0", fontWeight: 900, fontSize: 26, color: "#fff" }}>
              100.000 so'm
            </p>
          </div>
          <div style={styles.timerBox}>
            <span style={{
              fontSize: 10, color: "rgba(255,255,255,0.75)",
              letterSpacing: 1, marginBottom: 2, display: "block",
            }}>
              VAQT
            </span>
            <span style={{
              fontSize: 28, fontWeight: 900, color: "#fff",
              letterSpacing: 3, fontVariantNumeric: "tabular-nums",
            }}>
              {minutes}:{seconds}
            </span>
          </div>
        </div>

        {/* ── Asosiy karta ── */}
        <div style={styles.card}>

          {/* Qadam 1 */}
          <div style={styles.stepLabel}>
            <span style={styles.stepNum}>1</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#3A1030" }}>
              Quyidagi to'lov turlaridan birini tanlang
            </span>
          </div>

          {/* ⚠️ Payme uchun telefon raqam eslatmasi */}
          <div style={{
            background: "#FFF8E8", border: "1.5px solid #F5A623",
            borderRadius: 16, padding: "13px 15px",
            marginBottom: 16,
            display: "flex", gap: 10, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 13, color: "#B07800" }}>
                Online to`lov qilishdan oldin o'qing
              </p>
              <p style={{ margin: 0, fontSize: 12.5, color: "#7A5000", lineHeight: 1.7 }}>
                Quyidagi ilovalardan biri orqali to`lov qilayotganingizda kiritiladigan <strong>telefon raqam</strong> saytda{" "}
                <strong>ro'yxatdan o'tgan raqamingiz</strong> bilan bir xil bo'lishi shart:
              </p>
              {phone_number && (
                <div style={{
                  display: "inline-block",
                  background: "#FEF3C7", border: "1px solid #F59E0B",
                  borderRadius: 8, padding: "5px 12px", marginTop: 8,
                  fontWeight: 900, fontSize: 15, color: "#92400E",
                  letterSpacing: 1, fontFamily: "monospace",
                }}>
                  📞 {phone_number}
                </div>
              )}
            </div>
          </div>

          {/* Online to'lov */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {PAYMENT_SERVICES.map((svc, idx) => (
              <a
                key={svc.id}
                href={svc.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: svc.bgColor,
                  border: `1.5px solid ${svc.color}33`,
                  borderRadius: 18, padding: "14px 16px",
                  textDecoration: "none", cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(255,79,160,0.15)",
                  transition: "box-shadow 0.2s, transform 0.15s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 10px 26px ${svc.color}44`;
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 18px rgba(255,79,160,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                {/* Tartib raqami */}
                <div style={{
                  position: "absolute", top: -8, left: -8,
                  width: 22, height: 22, borderRadius: "50%",
                  background: "linear-gradient(135deg, #D6006F, #FF4FA0)",
                  color: "#fff", fontSize: 12, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(214,0,111,0.4)",
                }}>
                  {idx + 1}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden", boxShadow: "0 4px 12px rgba(255,79,160,0.2), inset 0 1px 2px rgba(255,255,255,0.8)",
                    flexShrink: 0,
                  }}>
                    <img
                      src={svc.logoUrl}
                      alt={svc.name}
                      style={{ width: 40, height: 40, objectFit: "contain" }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        if (target.parentElement) {
                          const span = document.createElement("span");
                          span.textContent = svc.name.slice(0, 2).toUpperCase();
                          span.style.fontWeight = "900";
                          span.style.fontSize = "18px";
                          span.style.color = svc.color;
                          target.parentElement.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 17, color: svc.color }}>
                      {svc.name}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "#a88094" }}>
                      {svc.description}
                    </p>
                  </div>
                </div>
                <div style={{
                  background: `linear-gradient(135deg, ${svc.color}, #FF8FB3)`,
                  color: "#fff",
                  borderRadius: 12, padding: "8px 14px",
                  fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
                  boxShadow: `0 4px 10px ${svc.color}55`,
                  flexShrink: 0,
                }}>
                  To'lash →
                </div>
              </a>
            ))}
          </div>

          {/* "To'lov qanday amalga oshiriladi?" qo'llanma */}
          <div style={{
            background: "linear-gradient(135deg, #F0F7FF, #E8F1FF)",
            border: "1.5px solid #3B82F633",
            borderRadius: 16, padding: "14px 16px", marginBottom: 20,
            boxShadow: "0 4px 14px rgba(59,130,246,0.1)",
          }}>
            <p style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 13, color: "#2563EB" }}>
              ℹ️ To'lov qanday amalga oshiriladi?
            </p>
            <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#3d5a8a", lineHeight: 2 }}>
              <li>Yuqoridagi to'lov turlaridan birini (Click, Payme, Paynet) yoki chet el fuqarosi bo`lsangiz pastdagi visa karta raqami orqali to`lov qilishingiz mumkin</li>
              <li>Ochilgan sahifada <strong>{tariff_value.charAt(0).toUpperCase() + tariff_value.slice(1)}</strong> kursi uchun to'lovni amalga oshiring</li>
              <li>100% to'lov tasdiqlangach, <strong>{SMS_SENDER}</strong> raqamidan <strong>{phone_number || "raqamingizga"}</strong> kirish havolasi SMS orqali yuboriladi</li>
            </ol>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "#FBDCEA" }} />
            <span style={{ fontSize: 12, color: "#c98caf", fontWeight: 600, letterSpacing: 0.5 }}>
              Chet el fuqarosi bo`lsangiz, pastdagi karta raqamidan to`lov qilishingiz mumkin
            </span>
            <div style={{ flex: 1, height: 1, background: "#FBDCEA" }} />
          </div>

          {/* Visa card — 3D pushti */}
          <div style={{ marginBottom: 24 }}>
            <div style={styles.cardBox}>
              <div style={{
                ...styles.cardHeader,
                background: "linear-gradient(135deg, #D6006F, #FF4FA0 55%, #FF8FB3)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 48, height: 26, borderRadius: 6, background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}>
                    <span style={{
                      fontSize: 14, fontWeight: 900,
                      color: "#D6006F", fontStyle: "italic",
                    }}>
                      VISA
                    </span>
                  </div>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Visa</span>
                </div>
              </div>
              <div style={{ padding: "16px", background: "linear-gradient(180deg, #fff, #FFF5FA)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={styles.cardNumber}>{PAYMENT_CARDS.visa.number}</p>
                    <p style={styles.cardHolder}>{PAYMENT_CARDS.visa.holder}</p>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(PAYMENT_CARDS.visa.number.replace(/\s/g, ""), "visa")
                    }
                    style={{
                      ...styles.copyBtn,
                      background: copiedId === "visa"
                        ? "linear-gradient(135deg, #27ae60, #2ecc71)"
                        : "linear-gradient(145deg, #FFE3F0, #FFC1E3)",
                      color: copiedId === "visa" ? "#fff" : "#D6006F",
                      boxShadow: copiedId === "visa"
                        ? "0 4px 12px rgba(39,174,96,0.4)"
                        : "0 4px 12px rgba(255,79,160,0.35), inset 0 1px 2px rgba(255,255,255,0.7)",
                    }}
                  >
                    {copiedId === "visa" ? "✓" : "📋"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Qadam 2 */}
          <div style={{ ...styles.stepLabel, marginBottom: 16 }}>
            <span style={styles.stepNum}>2</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#3A1030" }}>
              To'lovni amalga oshiring va SMS xabarni kuting
            </span>
          </div>

          {/* 📱 To'lovdan keyin nima bo'ladi — SMS 4546 va bir martalik havola ogohlantirishi */}
          <div style={{
            background: "linear-gradient(135deg, #FFF0F7, #FFE9F3)",
            border: "1.5px solid #FF4FA033",
            borderRadius: 16, padding: "14px 16px", marginBottom: 12,
            boxShadow: "0 4px 14px rgba(255,79,160,0.1)",
          }}>
            <p style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 13, color: "#D6006F" }}>
              📱 To'lovdan keyin nima bo'ladi?
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#8a4468", lineHeight: 1.9 }}>
              100% to'lov qilinganingizdan so'ng,{" "}
              <strong style={{
                background: "#FFD6EA", color: "#D6006F",
                padding: "2px 8px", borderRadius: 6, fontWeight: 800,
              }}>
                {SMS_SENDER}
              </strong>{" "}
              raqamidan{" "}
              <strong style={{ color: "#3A1030" }}>{phone_number || "raqamingiz"}</strong>ga{" "}
              kursga kirish uchun havola <strong>SMS ko'rinishida</strong> yuboriladi!
            </p>
          </div>

          {/* Ogohlantirish — bir martalik havola */}
          <div style={{
            background: "linear-gradient(135deg, #FFF8E8, #FFF3D6)",
            border: "1.5px solid #F5A623",
            borderRadius: 16, padding: "14px 16px", marginBottom: 20,
            boxShadow: "0 4px 14px rgba(245,166,35,0.12)",
          }}>
            <p style={{ margin: "0 0 8px", fontWeight: 800, fontSize: 13, color: "#C07A00" }}>
              ⚠️ Ogohlantirish
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#7A5000", lineHeight: 1.8 }}>
              Yuborilgan havola <strong>faqat bir marta</strong> beriladi va bir marta ishlatiladi.
              Havoladan bir marta kirgach, <strong>qayta ushbu havoladan kirib bo'lmaydi</strong>.
              Shuning uchun havolani ehtiyotlik bilan, faqat o'zingiz ishlating.
            </p>
          </div>

          {/* Xato xabari */}
          {submitError && (
            <div style={{
              background: "#fff0f0", border: "1px solid #E63429",
              borderRadius: 10, padding: "12px 14px",
              color: "#E63429", fontSize: 13, marginBottom: 14,
            }}>
              {submitError}
            </div>
          )}

          {/* ✅ TO'LOV QILDIM tugmasi (kerak bo'lsa yoqing) */}
          {/* <button
            onClick={handleContinue}
            disabled={submitting}
            style={{
              width: "100%",
              padding: "18px 0",
              background: submitting
                ? "#f5b8d3"
                : "linear-gradient(135deg, #D6006F, #FF4FA0)",
              color: "#fff",
              fontWeight: 900,
              fontSize: 17,
              letterSpacing: 1,
              borderRadius: 16,
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              boxShadow: submitting ? "none" : "0 6px 22px rgba(255,79,160,0.5)",
              transition: "all 0.2s",
              marginBottom: 10,
            }}
          >
            {submitting ? "YUKLANMOQDA..." : "✅ TO'LOV QILDIM"}
          </button> */}

          {/* Tugma tagidagi izoh */}
          <p style={{ textAlign: "center", fontSize: 12, color: "#c495ac", margin: 0, lineHeight: 1.6 }}>
            To`lov qilganingizdan so'ng{" "}
            <strong style={{ color: "#8a4468" }}>{phone_number || "raqamingizga"}</strong>{" "}
            <strong style={{ color: "#8a4468" }}>{SMS_SENDER}</strong> raqamidan telegram kanal link SMS ko`rinishida yuboriladi
          </p>
        </div>

        {/* ── Yordam kartasi ── */}
        <div style={{ ...styles.card, textAlign: "center" }}>
          <p style={{ fontWeight: 800, fontSize: 16, margin: "0 0 4px", color: "#3A1030" }}>
            Muammo yuzaga keldimi?
          </p>
          <p style={{ fontSize: 13, color: "#a88094", margin: "0 0 6px", lineHeight: 1.7 }}>
            To'lov amalga oshmadi yoki SMS kelmadi?
            <br />
            Admin sizga tezda yordam beradi 👇
          </p>
          <p style={{ fontSize: 12, color: "#d0b0c2", margin: "0 0 16px" }}>
            Tugmaga bosganingizda Telegram ochilib, admin bilan suhbat boshlanadi
          </p>
          <a
            href={ADMIN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              width: "100%", padding: "16px 0",
              background: "linear-gradient(135deg, #0088CC, #00AAFF)",
              color: "#fff", fontWeight: 800, fontSize: 15,
              letterSpacing: 0.8, borderRadius: 16,
              textDecoration: "none",
              boxShadow: "0 6px 18px rgba(0,136,204,0.4)",
              boxSizing: "border-box",
            }}
          >
            <TelegramIcon />
            ADMINGA YOZISH
          </a>
        </div>

      </div>
    </>
  );
}

/* ─── Inline Styles — Pushti 3D dizayn ─── */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #2B0A21, #4A0E37 45%, #1a0714)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 48,
    gap: 16,
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  timerBanner: {
    width: "100%",
    maxWidth: 480,
    margin: "0 12px",
    borderRadius: 22,
    padding: "20px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 12px 36px rgba(214,0,111,0.45), inset 0 1px 2px rgba(255,255,255,0.25)",
    boxSizing: "border-box",
  },
  timerBox: {
    background: "rgba(0,0,0,0.25)",
    borderRadius: 16,
    padding: "10px 16px",
    textAlign: "center",
    minWidth: 90,
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  card: {
    background: "linear-gradient(180deg, #ffffff, #FFF6FA)",
    borderRadius: 24,
    width: "100%",
    maxWidth: 480,
    margin: "0 12px",
    padding: "20px 18px",
    boxShadow: "0 14px 44px rgba(214,0,111,0.25), 0 2px 6px rgba(0,0,0,0.06)",
    boxSizing: "border-box",
    border: "1px solid #FFE3F0",
  },
  stepLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #D6006F, #FF4FA0)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 10px rgba(255,79,160,0.45)",
  },
  cardBox: {
    border: "1.5px solid #FFD6EA",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(214,0,111,0.18)",
  },
  cardHeader: {
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontFamily: "'Courier New', monospace",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: 2,
    margin: 0,
    color: "#3A1030",
  },
  cardHolder: {
    fontSize: 13,
    color: "#a88094",
    margin: 0,
    fontWeight: 500,
  },
  copyBtn: {
    border: "none",
    borderRadius: "50%",
    width: 42,
    height: 42,
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
    flexShrink: 0,
  },
};
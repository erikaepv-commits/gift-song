import { useState, useEffect, useRef } from "react";

const COLORS = {
  coral: "#E8634A",
  coralDark: "#D04E36",
  coralLight: "#FFF0ED",
  charcoal: "#2D2D2D",
  warmGray: "#7A7A7A",
  warmWhite: "#FDFAF7",
  cream: "#F5F0E8",
  sage: "#4A8C6F",
  white: "#FFFFFF",
  trustpilot: "#00B67A",
  border: "rgba(45,45,45,0.08)",
};

const steps = [
  {
    number: "01",
    emoji: "✍️",
    label: "PASO 1",
    badge: "Gratis",
    badgeColor: COLORS.sage,
    title: "Cuéntanos sobre ellos",
    desc: "Algunos detalles sobre tu persona y lo que la hace especial.",
    border: `1px solid ${COLORS.border}`,
  },
  {
    number: "02",
    emoji: "🎧",
    label: "PASO 2",
    badge: "Gratis",
    badgeColor: COLORS.sage,
    title: "Escucha tu canción gratis",
    desc: "En minutos la escribimos y producimos, y tú la previsualizas gratis.",
    border: `1px solid ${COLORS.border}`,
  },
  {
    number: "03",
    emoji: "💝",
    label: "PASO 3",
    badge: "$34.99",
    badgeColor: COLORS.coral,
    title: "Compártela con amor",
    desc: "Si te encanta, descárgala y regálasela. ¡Solo pagas si la amas!",
    border: `2px solid rgba(232,99,74,0.3)`,
  },
];

const occasions = [
  { id: "birthday", emoji: "🎂", label: "Cumpleaños" },
  { id: "anniversary", emoji: "💑", label: "Aniversario" },
  { id: "wedding", emoji: "💍", label: "Boda" },
  { id: "friendship", emoji: "🤝", label: "Amistad" },
  { id: "graduation", emoji: "🎓", label: "Graduación" },
  { id: "memorial", emoji: "🕯️", label: "Memorial" },
  { id: "christmas", emoji: "🎄", label: "Navidad" },
  { id: "other", emoji: "✨", label: "Otro" },
];

const genres = [
  { id: "pop", emoji: "🎵", label: "Pop" },
  { id: "rock", emoji: "🎸", label: "Rock" },
  { id: "country", emoji: "🤠", label: "Country" },
  { id: "rnb", emoji: "🎤", label: "R&B" },
  { id: "jazz", emoji: "🎷", label: "Jazz" },
  { id: "folk", emoji: "🪕", label: "Folk" },
  { id: "hiphop", emoji: "🎧", label: "Hip Hop" },
  { id: "classical", emoji: "🎻", label: "Clásica" },
];

const testimonials = [
  {
    name: "María García",
    rating: 5,
    date: "Hace 2 días",
    text: "¡Increíble! Mi esposo lloró cuando escuchó la canción en nuestro aniversario. Cada detalle que compartí quedó perfectamente capturado. Fue el regalo más especial que le he dado en 15 años.",
    occasion: "Aniversario",
    avatar: "MG",
    avatarBg: "#E8634A",
  },
  {
    name: "Carlos López",
    rating: 5,
    date: "Hace 5 días",
    text: "Lo usé para el cumpleaños de mi mamá. La canción quedó tan bonita que toda la familia terminó llorando. La calidad es impresionante para el precio. 100% recomendado.",
    occasion: "Cumpleaños",
    avatar: "CL",
    avatarBg: "#4A8C6F",
  },
  {
    name: "Ana Martínez",
    rating: 5,
    date: "Hace 1 semana",
    text: "Pensé que sería algo genérico, pero quedé sin palabras. La letra incluía momentos específicos que solo nosotras conocemos. Mi mejor amiga la tiene como tono de llamada desde entonces.",
    occasion: "Amistad",
    avatar: "AM",
    avatarBg: "#9B59B6",
  },
  {
    name: "Roberto Silva",
    rating: 5,
    date: "Hace 1 semana",
    text: "Para la boda de mi hija. El proceso fue súper fácil y el resultado fue mágico. El DJ la puso durante el primer baile y todos los invitados aplaudieron. Vale cada centavo.",
    occasion: "Boda",
    avatar: "RS",
    avatarBg: "#2980B9",
  },
  {
    name: "Laura Pérez",
    rating: 4,
    date: "Hace 2 semanas",
    text: "Muy buen servicio. La canción capturó perfectamente el espíritu de mi abuela que falleció. Fue un tributo hermoso para toda la familia. Solo tardó unos minutos en estar lista.",
    occasion: "Memorial",
    avatar: "LP",
    avatarBg: "#E67E22",
  },
];

const faqs = [
  {
    q: "¿Cuánto tiempo tarda en estar lista mi canción?",
    a: "Tu vista previa gratuita estará lista en aproximadamente 3 minutos. Una vez que confirmes tu compra, recibirás la canción completa en alta calidad en tu correo.",
  },
  {
    q: "¿Qué incluye la canción personalizada?",
    a: "Incluye letra original basada en tu historia, producción musical profesional, voz cantada, y el archivo de audio en alta calidad (MP3). También puedes compartirla con un enlace especial.",
  },
  {
    q: "¿Qué pasa si no me gusta la canción?",
    a: "¡Completamente normal! La vista previa es 100% gratuita. Solo pagas si te enamoras de la canción. No hay cargos ocultos ni compromisos.",
  },
  {
    q: "¿En qué idioma se crea la canción?",
    a: "Creamos canciones en español, inglés y otros idiomas. Puedes indicar tu preferencia al compartir tu historia.",
  },
  {
    q: "¿Puedo pedir cambios en la letra?",
    a: "Si quieres ajustes, nuestro equipo puede realizarlos. Los retoques menores están incluidos en el precio.",
  },
];

// --- AudioWave Animation Component ---
function AudioWave({ playing }) {
  const bars = 20;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 32 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 99,
            background: COLORS.coral,
            height: playing ? `${Math.random() * 24 + 8}px` : 4,
            transition: playing ? "height 0.15s ease" : "height 0.4s ease",
            animation: playing ? `wave ${0.4 + (i % 5) * 0.1}s ease-in-out infinite alternate` : "none",
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}

// --- Star Rating ---
function Stars({ count = 5, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="2" fill={i < count ? COLORS.trustpilot : "#dcdce6"} />
          <path
            d="M12 3.5l2.47 5.01L20 9.27l-4 3.9.94 5.5L12 15.77l-4.94 2.9.94-5.5-4-3.9 5.53-.76L12 3.5z"
            fill="#fff"
          />
        </svg>
      ))}
    </span>
  );
}

// --- FAQ Item ---
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        overflow: "hidden",
        marginBottom: 12,
        transition: "box-shadow 0.2s",
        boxShadow: open ? "0 4px 20px rgba(232,99,74,0.08)" : "none",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 12,
        }}
      >
        <span style={{ fontWeight: 600, color: COLORS.charcoal, fontSize: 15 }}>{q}</span>
        <span
          style={{
            fontSize: 20,
            color: COLORS.coral,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 18px", color: COLORS.warmGray, fontSize: 14, lineHeight: 1.7 }}>{a}</div>
      )}
    </div>
  );
}

// --- Multi-step Form ---
function SongForm({ onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    occasion: "",
    recipientName: "",
    senderName: "",
    story: "",
    genre: "",
    mood: "",
    email: "",
  });
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const totalSteps = 4;

  const handleNext = () => {
    if (step === totalSteps - 1) {
      setGenerating(true);
      // TODO: Llamar a la API real de generación de canciones con los datos del formulario
      setTimeout(() => {
        setGenerating(false);
        setDone(true);
      }, 3000);
    } else {
      setStep((s) => s + 1);
    }
  };

  const canNext = () => {
    if (step === 0) return form.occasion !== "";
    if (step === 1) return form.recipientName.length > 1 && form.senderName.length > 1;
    if (step === 2) return form.story.length > 20;
    if (step === 3) return form.genre !== "" && form.email.includes("@");
    return true;
  };

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && !generating && !done && onClose()}
    >
      <div
        style={{
          background: COLORS.white,
          borderRadius: 24,
          maxWidth: 520,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {!done && !generating && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: COLORS.warmGray,
              zIndex: 10,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            ×
          </button>
        )}

        {generating ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎵</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.charcoal, marginBottom: 8 }}>
              Componiendo tu canción...
            </h3>
            <p style={{ color: COLORS.warmGray, marginBottom: 32 }}>
              Estamos escribiendo algo especial. Esto tarda ~3 minutos.
            </p>
            <div
              style={{
                height: 8,
                background: COLORS.cream,
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                  borderRadius: 99,
                  animation: "loadingBar 3s ease-in-out forwards",
                }}
              />
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <AudioWave playing={true} />
            </div>
          </div>
        ) : done ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.charcoal, marginBottom: 8 }}>
              ¡Tu vista previa está lista!
            </h3>
            <p style={{ color: COLORS.warmGray, marginBottom: 24, lineHeight: 1.6 }}>
              Hemos enviado el enlace a <strong>{form.email}</strong>. Escucha tu canción personalizada y, si te encanta, ¡descárgala!
            </p>
            <div
              style={{
                background: COLORS.coralLight,
                borderRadius: 16,
                padding: "16px 20px",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>💝</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontWeight: 700, color: COLORS.charcoal, marginBottom: 2 }}>
                  Vista previa 100% gratis
                </p>
                <p style={{ color: COLORS.warmGray, fontSize: 13 }}>
                  Solo pagas $34.99 si te enamoras de ella
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "16px",
                background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                color: COLORS.white,
                border: "none",
                borderRadius: 16,
                fontSize: 17,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ¡Entendido! 🎵
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ padding: "28px 28px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <p style={{ color: COLORS.coral, fontSize: 12, fontWeight: 600, marginBottom: 2 }}>
                    PASO {step + 1} DE {totalSteps}
                  </p>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.charcoal }}>
                    {step === 0 && "¿Cuál es la ocasión? 🎉"}
                    {step === 1 && "¿Para quién es la canción? 💌"}
                    {step === 2 && "Cuéntanos su historia 📖"}
                    {step === 3 && "Últimos detalles 🎸"}
                  </h3>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ height: 6, background: COLORS.cream, borderRadius: 99, marginBottom: 24 }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                    borderRadius: 99,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>

            <div style={{ padding: "0 28px 28px" }}>
              {/* Step 0: Occasion */}
              {step === 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {occasions.map((occ) => (
                    <button
                      key={occ.id}
                      onClick={() => setForm((f) => ({ ...f, occasion: occ.id }))}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 16px",
                        borderRadius: 14,
                        border: form.occasion === occ.id ? `2px solid ${COLORS.coral}` : `2px solid ${COLORS.border}`,
                        background: form.occasion === occ.id ? COLORS.coralLight : COLORS.white,
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: form.occasion === occ.id ? 700 : 500,
                        color: form.occasion === occ.id ? COLORS.coral : COLORS.charcoal,
                        transition: "all 0.2s",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{occ.emoji}</span>
                      {occ.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 1: Names */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.charcoal, marginBottom: 6 }}>
                      Nombre del destinatario
                    </label>
                    <input
                      value={form.recipientName}
                      onChange={(e) => setForm((f) => ({ ...f, recipientName: e.target.value }))}
                      placeholder="ej. Laura, mamá, mi amor..."
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `2px solid ${form.recipientName.length > 1 ? COLORS.coral : COLORS.border}`,
                        fontSize: 15,
                        outline: "none",
                        color: COLORS.charcoal,
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.charcoal, marginBottom: 6 }}>
                      Tu nombre (quien hace el regalo)
                    </label>
                    <input
                      value={form.senderName}
                      onChange={(e) => setForm((f) => ({ ...f, senderName: e.target.value }))}
                      placeholder="Tu nombre..."
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `2px solid ${form.senderName.length > 1 ? COLORS.coral : COLORS.border}`,
                        fontSize: 15,
                        outline: "none",
                        color: COLORS.charcoal,
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Story */}
              {step === 2 && (
                <div>
                  <p style={{ fontSize: 14, color: COLORS.warmGray, marginBottom: 12, lineHeight: 1.6 }}>
                    Cuéntanos sobre {form.recipientName || "ellos"}. ¿Qué los hace especiales? ¿Tienen momentos o recuerdos únicos? ¿Qué quieres que sienta al escucharla?
                  </p>
                  <textarea
                    value={form.story}
                    onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
                    placeholder="ej. Mi abuela siempre me despertaba con el olor a café y tortillas. Cada verano íbamos al río juntos..."
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: 12,
                      border: `2px solid ${form.story.length > 20 ? COLORS.coral : COLORS.border}`,
                      fontSize: 15,
                      outline: "none",
                      color: COLORS.charcoal,
                      resize: "vertical",
                      lineHeight: 1.6,
                      fontFamily: "inherit",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                  />
                  <p style={{ fontSize: 12, color: COLORS.warmGray, marginTop: 6, textAlign: "right" }}>
                    {form.story.length} caracteres (mín. 20)
                  </p>
                </div>
              )}

              {/* Step 3: Genre + Email */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.charcoal, marginBottom: 10 }}>
                      Estilo musical preferido
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {genres.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setForm((f) => ({ ...f, genre: g.id }))}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 14px",
                            borderRadius: 12,
                            border: form.genre === g.id ? `2px solid ${COLORS.coral}` : `2px solid ${COLORS.border}`,
                            background: form.genre === g.id ? COLORS.coralLight : COLORS.white,
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: form.genre === g.id ? 700 : 500,
                            color: form.genre === g.id ? COLORS.coral : COLORS.charcoal,
                            transition: "all 0.2s",
                          }}
                        >
                          <span style={{ fontSize: 16 }}>{g.emoji}</span>
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.charcoal, marginBottom: 6 }}>
                      Tu correo electrónico
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="tu@correo.com"
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `2px solid ${form.email.includes("@") ? COLORS.coral : COLORS.border}`,
                        fontSize: 15,
                        outline: "none",
                        color: COLORS.charcoal,
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                    />
                    <p style={{ fontSize: 12, color: COLORS.warmGray, marginTop: 6 }}>
                      🔒 Te enviaremos la vista previa gratuita aquí. Sin spam.
                    </p>
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    style={{
                      padding: "14px 20px",
                      borderRadius: 14,
                      border: `2px solid ${COLORS.border}`,
                      background: "none",
                      cursor: "pointer",
                      fontSize: 15,
                      fontWeight: 600,
                      color: COLORS.charcoal,
                    }}
                  >
                    ← Atrás
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!canNext()}
                  style={{
                    flex: 1,
                    padding: "16px",
                    borderRadius: 14,
                    border: "none",
                    background: canNext()
                      ? `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`
                      : "#ddd",
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: canNext() ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                    boxShadow: canNext() ? "0 4px 15px rgba(232,99,74,0.35)" : "none",
                  }}
                >
                  {step === totalSteps - 1 ? "🎵 Crear mi canción gratis →" : "Continuar →"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// --- Mini Player ---
function MiniPlayer({ song }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: 20,
        padding: "18px 20px",
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {song.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, color: COLORS.charcoal, fontSize: 14, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {song.title}
          </p>
          <p style={{ color: COLORS.warmGray, fontSize: 12 }}>{song.occasion}</p>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.white,
            fontSize: 16,
            flexShrink: 0,
            boxShadow: "0 2px 10px rgba(232,99,74,0.4)",
          }}
        >
          {playing ? "⏸" : "▶"}
        </button>
      </div>
      <AudioWave playing={playing} />
      <div style={{ marginTop: 10 }}>
        <div style={{ height: 4, background: COLORS.cream, borderRadius: 99, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.coralDark})`,
              borderRadius: 99,
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 11, color: COLORS.warmGray }}>
            {Math.floor((progress / 100) * 185)}s
          </span>
          <span style={{ fontSize: 11, color: COLORS.warmGray }}>3:05</span>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---
export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  // TODO: Implementar reproductor de audio real con archivos MP3 de muestra
  const sampleSongs = [
    { emoji: "🎂", title: "Canción para Abuela Rosa", occasion: "Cumpleaños 80" },
    { emoji: "💑", title: "Nuestros 10 Años Juntos", occasion: "Aniversario" },
    { emoji: "🎓", title: "El Día Que Lo Lograste", occasion: "Graduación" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        @keyframes wave {
          from { height: 4px; }
          to { height: 28px; }
        }
        @keyframes loadingBar {
          from { width: 0%; }
          to { width: 95%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .fade-in { animation: fadeInUp 0.6s ease forwards; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.cream}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.coral}; border-radius: 99px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${COLORS.warmWhite} 0%, ${COLORS.cream} 100%)`, fontFamily: "'Inter', sans-serif" }}>

        {/* HEADER */}
        <header style={{ padding: "12px 24px", position: "sticky", top: 0, zIndex: 100, background: "rgba(253,250,247,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontWeight: 800, color: COLORS.charcoal, fontSize: 22, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.5px" }}>
                SonglyGift<span style={{ color: COLORS.coral }}>.</span>
              </span>
            </a>
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: "10px 22px",
                borderRadius: 99,
                background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                color: COLORS.white,
                border: "none",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(232,99,74,0.3)",
                transition: "all 0.2s",
              }}
            >
              Crear canción →
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <section style={{ padding: "60px 24px 50px", textAlign: "center" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            {/* Trust badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: COLORS.white,
                borderRadius: 99,
                padding: "8px 16px",
                marginBottom: 28,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <Stars count={5} size={13} />
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.charcoal }}>4.7</span>
              <span style={{ fontSize: 13, color: COLORS.warmGray }}>· 3,620 reseñas en Trustpilot</span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 6vw, 60px)",
                color: COLORS.charcoal,
                lineHeight: 1.1,
                marginBottom: 20,
                letterSpacing: "-0.5px",
              }}
              className="fade-in"
            >
              Convierte tu historia en una canción{" "}
              <span style={{ color: COLORS.coral, fontStyle: "italic" }}>que nunca olvidarán</span>
            </h1>

            <p
              style={{
                color: COLORS.warmGray,
                fontSize: "clamp(16px, 2.5vw, 22px)",
                marginBottom: 36,
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 auto 36px",
              }}
            >
              Una canción personalizada única, escrita y producida especialmente para alguien que amas.
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <button
                onClick={() => setShowForm(true)}
                onMouseEnter={() => setHoveredBtn(true)}
                onMouseLeave={() => setHoveredBtn(false)}
                className="pulse"
                style={{
                  padding: "18px 40px",
                  borderRadius: 18,
                  background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                  color: COLORS.white,
                  border: "none",
                  fontSize: 19,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: hoveredBtn
                    ? "0 12px 30px rgba(232,99,74,0.5)"
                    : "0 6px 20px rgba(232,99,74,0.35)",
                  transition: "all 0.25s",
                  transform: hoveredBtn ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
                  letterSpacing: "-0.2px",
                }}
              >
                Obtén mi vista previa gratis →
              </button>
              <p style={{ color: COLORS.warmGray, fontSize: 13 }}>
                Listo en ~3 min · Solo pagas si te encanta
              </p>
            </div>

            {/* Social proof avatars */}
            <div style={{ marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <div style={{ display: "flex" }}>
                {["MG", "CL", "AM", "RS"].map((initials, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: [COLORS.coral, COLORS.sage, "#9B59B6", "#2980B9"][i],
                      border: `2px solid ${COLORS.warmWhite}`,
                      marginLeft: i > 0 ? -8 : 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: COLORS.white,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 13, color: COLORS.warmGray }}>
                <strong style={{ color: COLORS.charcoal }}>+12,000</strong> canciones creadas este mes
              </span>
            </div>
          </div>
        </section>

        {/* SAMPLE SONGS SECTION */}
        <section style={{ padding: "0 24px 60px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <p style={{ textAlign: "center", color: COLORS.warmGray, fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>
              🎵 Ejemplos de canciones creadas
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {sampleSongs.map((song, i) => (
                <MiniPlayer key={i} song={song} />
              ))}
            </div>
            {/* TODO: Reemplazar con reproductores de audio MP3 reales de canciones de muestra */}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: "60px 24px", background: COLORS.cream }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 4vw, 34px)",
                color: COLORS.charcoal,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Tan simple como 1 – 2 – 3
            </h2>
            <p style={{ color: COLORS.warmGray, textAlign: "center", fontSize: 14, marginBottom: 36 }}>
              De tu historia a su canción en minutos
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.white,
                    borderRadius: 20,
                    padding: "20px 22px",
                    border: step.border,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                  }}
                >
                  <div style={{ fontSize: 32 }}>{step.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ color: COLORS.coral, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>
                        {step.label}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: step.badgeColor,
                          background: step.badgeColor === COLORS.coral ? COLORS.coralLight : "#E8F5EE",
                          padding: "2px 8px",
                          borderRadius: 99,
                        }}
                      >
                        {step.badge}
                      </span>
                    </div>
                    <h3 style={{ fontWeight: 700, color: COLORS.charcoal, fontSize: 16, marginBottom: 4 }}>
                      {step.title}
                    </h3>
                    <p style={{ color: COLORS.warmGray, fontSize: 13, lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: "16px 36px",
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                  color: COLORS.white,
                  border: "none",
                  fontSize: 17,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(232,99,74,0.35)",
                  transition: "all 0.2s",
                  width: "100%",
                  maxWidth: 380,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(232,99,74,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,99,74,0.35)";
                }}
              >
                Empieza gratis ahora →
              </button>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: "60px 24px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 4vw, 34px)",
                color: COLORS.charcoal,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Lo que dicen nuestros clientes
            </h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 36 }}>
              <Stars count={5} />
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.charcoal }}>4.7</span>
              <span style={{ fontSize: 14, color: COLORS.warmGray }}>· 3,620 reseñas</span>
              <a
                href="https://www.trustpilot.com/review/app.songlygift.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: COLORS.trustpilot, fontWeight: 600, textDecoration: "none" }}
              >
                Ver en Trustpilot ↗
              </a>
            </div>

            {/* Featured testimonial carousel */}
            <div
              style={{
                background: COLORS.white,
                borderRadius: 24,
                padding: "28px 28px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
                border: `1px solid ${COLORS.border}`,
                marginBottom: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                }}
              />
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: testimonials[currentTestimonial].avatarBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: COLORS.white,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <p style={{ fontWeight: 700, color: COLORS.charcoal, fontSize: 15 }}>
                        {testimonials[currentTestimonial].name}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                        <Stars count={testimonials[currentTestimonial].rating} size={12} />
                        <span
                          style={{
                            fontSize: 11,
                            background: COLORS.coralLight,
                            color: COLORS.coral,
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 99,
                          }}
                        >
                          {testimonials[currentTestimonial].occasion}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: COLORS.warmGray }}>
                      {testimonials[currentTestimonial].date}
                    </span>
                  </div>
                  <p style={{ color: COLORS.charcoal, fontSize: 14, lineHeight: 1.7, marginTop: 8 }}>
                    "{testimonials[currentTestimonial].text}"
                  </p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  style={{
                    width: i === currentTestimonial ? 24 : 8,
                    height: 8,
                    borderRadius: 99,
                    background: i === currentTestimonial ? COLORS.coral : "#ddd",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Grid of mini testimonials */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
              {testimonials.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.white,
                    borderRadius: 16,
                    padding: "16px",
                    border: `1px solid ${COLORS.border}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    opacity: i === currentTestimonial ? 1 : 0.7,
                    transform: i === currentTestimonial ? "scale(1.01)" : "scale(1)",
                  }}
                  onClick={() => setCurrentTestimonial(i)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: t.avatarBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: COLORS.white,
                        flexShrink: 0,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.charcoal }}>{t.name}</p>
                      <Stars count={t.rating} size={10} />
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: COLORS.warmGray, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section style={{ padding: "60px 24px", background: COLORS.cream }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 4vw, 34px)",
                color: COLORS.charcoal,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Precios simples y transparentes
            </h2>
            <p style={{ color: COLORS.warmGray, textAlign: "center", fontSize: 14, marginBottom: 36 }}>
              Sin sorpresas. Solo pagas si te encanta.
            </p>

            <div
              style={{
                background: COLORS.white,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                border: `2px solid ${COLORS.coral}`,
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                  padding: "20px 28px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                  CANCIÓN PERSONALIZADA COMPLETA
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4 }}>
                  <span style={{ color: COLORS.white, fontSize: 48, fontWeight: 800, lineHeight: 1 }}>$34.99</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 8 }}>USD</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Vista previa 100% gratuita</p>
              </div>
              <div style={{ padding: "24px 28px" }}>
                {[
                  "✅ Letra original basada en tu historia",
                  "✅ Producción musical profesional",
                  "✅ Descarga en MP3 de alta calidad",
                  "✅ Enlace especial para compartir",
                  "✅ Disponible de por vida",
                  "✅ Retoques incluidos",
                  "🎁 Vista previa gratuita siempre",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom: i < 6 ? `1px solid ${COLORS.border}` : "none",
                      fontSize: 14,
                      color: COLORS.charcoal,
                      fontWeight: i === 6 ? 700 : 500,
                    }}
                  >
                    {item}
                  </div>
                ))}
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                    color: COLORS.white,
                    border: "none",
                    fontSize: 17,
                    fontWeight: 700,
                    cursor: "pointer",
                    marginTop: 20,
                    boxShadow: "0 6px 20px rgba(232,99,74,0.35)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Crea tu canción gratis →
                </button>
                {/* TODO: Integrar Stripe Checkout para el pago de $34.99 */}
              </div>
            </div>
          </div>
        </section>

        {/* OCCASIONS SECTION */}
        <section style={{ padding: "60px 24px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 4vw, 34px)",
                color: COLORS.charcoal,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Para cada momento especial
            </h2>
            <p style={{ color: COLORS.warmGray, textAlign: "center", fontSize: 14, marginBottom: 36 }}>
              Cada historia merece su propia canción
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setShowForm(true)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    padding: "20px 12px",
                    borderRadius: 18,
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.charcoal,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(232,99,74,0.15)";
                    e.currentTarget.style.borderColor = COLORS.coral;
                    e.currentTarget.style.color = COLORS.coral;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = COLORS.border;
                    e.currentTarget.style.color = COLORS.charcoal;
                  }}
                >
                  <span style={{ fontSize: 28 }}>{occ.emoji}</span>
                  <span>{occ.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={{ padding: "60px 24px", background: COLORS.cream }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 4vw, 34px)",
                color: COLORS.charcoal,
                textAlign: "center",
                marginBottom: 36,
              }}
            >
              Preguntas frecuentes
            </h2>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: "60px 24px 80px" }}>
          <div
            style={{
              maxWidth: 560,
              margin: "0 auto",
              background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
              borderRadius: 28,
              padding: "48px 36px",
              textAlign: "center",
              boxShadow: "0 16px 40px rgba(232,99,74,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎵</div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 4vw, 34px)",
                  color: COLORS.white,
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                Regala algo que nunca olvidarán
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
                Crea tu vista previa gratis en 3 minutos. Sin compromiso, sin tarjeta de crédito.
              </p>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: "18px 44px",
                  borderRadius: 16,
                  background: COLORS.white,
                  color: COLORS.coral,
                  border: "none",
                  fontSize: 18,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                }}
              >
                Empezar ahora — es gratis →
              </button>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 12 }}>
                Solo pagas $34.99 si te enamoras de ella
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            padding: "32px 24px",
            borderTop: `1px solid ${COLORS.border}`,
            background: COLORS.warmWhite,
          }}
        >
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontWeight: 800, color: COLORS.charcoal, fontSize: 20, marginBottom: 6 }}>
              SonglyGift<span style={{ color: COLORS.coral }}>.</span>
            </p>
            <p style={{ color: COLORS.warmGray, fontSize: 13, marginBottom: 16 }}>
              Convierte tu historia en una canción que nunca olvidarán
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
              {["Privacidad", "Términos", "Contacto", "Trustpilot"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: COLORS.warmGray,
                    fontSize: 13,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.coral)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.warmGray)}
                >
                  {link}
                </a>
              ))}
              {/* TODO: Añadir enlaces reales de política de privacidad y términos */}
            </div>
            <p style={{ color: COLORS.warmGray, fontSize: 12 }}>
              © 2024 SonglyGift. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>

      {showForm && <SongForm onClose={() => setShowForm(false)} />}
    </>
  );
}
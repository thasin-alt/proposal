/* ============================================================
   CONFIG — Banglish (romanized Bengali) version
   Change these to make it yours ❤️
   ============================================================ */
const CONFIG = {
  questions: [
    {
      text: "Ekta proshno korbo khuki?",
      sub: "amk bhalo lage?",
      options: ["Hoyto 👀", "haaaa"],
    },
    {
      text: "Ar ekta proshno.",
      sub: "ami ki tmr Priority?",
      options: ["Bolo na…", "ofcccc"],
    },
    {
      text: "Shotti kore bolo.",
      sub: "kokhono amar message dekhe hashi eshe geche?",
      options: ["Na 🙈", "Guilty"],
    },
    {
      text: "Sesh ekta kotha, tarpor ami main jinish ta bolbo…",
      sub: "ready to?",
      options: ["Bolo"],
    },
  ],
  finalHeadline: "Tumi shei chapter, jar expect kortepari nai.",
  finalSub: "Ar akhon shesh korte chai na.",
  finalQuestion: "Toh just ekta y question ache —",
  bigQuestion: "Amar hobe? 💫",
  acceptLabel: "ha hobo🫣💗",
  rejectLabel: "Na",
  successTitle: "akhon tmi amar bow😺💝",
  successMessage: "Best decision! tmk onak khoushi rakbo.",
  signatureLine: "Amar pakhi,",
}

/* ============================================================
   Small helpers
   ============================================================ */
const HEART_EMOJIS = ['❤️', '💗', '💕', '💖', '💘']
const randBetween = (min, max) => Math.random() * (max - min) + min
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ============================================================
   Ambient floating hearts drifting up in the background
   ============================================================ */
function renderFloatingHearts(count = 16) {
  const container = document.getElementById('heartsBg')
  container.innerHTML = ''
  for (let i = 0; i < count; i++) {
    const left = randBetween(2, 96)
    const size = randBetween(14, 30)
    const duration = randBetween(9, 18)
    const delay = randBetween(0, 10)
    const drift = randBetween(-40, 40)
    const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)]

    const span = document.createElement('span')
    span.className = 'lp-float-heart'
    span.style.left = `${left}%`
    span.style.fontSize = `${size}px`
    span.style.animationDuration = `${duration}s`
    span.style.animationDelay = `${delay}s`
    span.style.setProperty('--drift', `${drift}px`)
    span.textContent = emoji
    container.appendChild(span)
  }
}

/* ============================================================
   Celebration burst (confetti hearts), shown after acceptance
   ============================================================ */
function renderCelebrationBurst(count = 46) {
  const container = document.createElement('div')
  container.className = 'lp-celebration-burst'
  container.setAttribute('aria-hidden', 'true')

  for (let i = 0; i < count; i++) {
    const left = randBetween(0, 100)
    const size = randBetween(14, 34)
    const duration = randBetween(3.5, 6.5)
    const delay = randBetween(0, 2.5)
    const rotate = randBetween(-60, 60)
    const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)]

    const span = document.createElement('span')
    span.className = 'lp-confetti-heart'
    span.style.left = `${left}%`
    span.style.fontSize = `${size}px`
    span.style.animationDuration = `${duration}s`
    span.style.animationDelay = `${delay}s`
    span.style.setProperty('--rot', `${rotate}deg`)
    span.textContent = emoji
    container.appendChild(span)
  }
  return container
}

/* ============================================================
   Glass ripple — spawns a soft pink-gold ripple from the click point
   ============================================================ */
function spawnRipple(e) {
  const btn = e.currentTarget
  if (!btn) return
  if (prefersReducedMotion()) return

  const rect = btn.getBoundingClientRect()
  const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left
  const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top

  const ripple = document.createElement('span')
  ripple.className = 'lp-glass-ripple'
  ripple.setAttribute('aria-hidden', 'true')
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`

  btn.appendChild(ripple)
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
}

/* ============================================================
   Answer burst — small heart/sparkle explosion at the click point
   ============================================================ */
const BURST_EMOJIS = ['💗', '💕', '✨', '💖', '🌸']

function showAnswerBurst(x, y) {
  const el = document.createElement('div')
  el.className = 'lp-answer-burst'
  el.setAttribute('aria-hidden', 'true')
  el.style.left = `${x}px`
  el.style.top = `${y}px`

  const glow = document.createElement('span')
  glow.className = 'lp-answer-burst-glow'
  el.appendChild(glow)

  for (let i = 0; i < 8; i++) {
    const angle = i * 45 + Math.random() * 20 - 10
    const dist = 28 + Math.random() * 36
    const delay = i * 0.04
    const size = 12 + Math.random() * 10
    const emoji = BURST_EMOJIS[i % BURST_EMOJIS.length]

    const piece = document.createElement('span')
    piece.className = 'lp-answer-burst-piece'
    piece.style.setProperty('--angle', `${angle}deg`)
    piece.style.setProperty('--dist', `${dist}px`)
    piece.style.setProperty('--delay', `${delay}s`)
    piece.style.fontSize = `${size}px`
    piece.textContent = emoji
    el.appendChild(piece)
  }

  document.body.appendChild(el)
  setTimeout(() => el.remove(), 900)
}

/* ============================================================
   Question step transition: exit animation → advance → enter
   ============================================================ */
const EXIT_MS = 580

function advanceWithTransition(e, onStepChange) {
  const btn = e?.currentTarget
  if (btn) {
    const rect = btn.getBoundingClientRect()
    showAnswerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  const card = document.getElementById('lpCard')
  card.classList.add('lp-card--glow')
  setTimeout(() => card.classList.remove('lp-card--glow'), 700)

  const panel = card.querySelector('.lp-question-panel, .lp-stage, .lp-success-panel')
  if (panel) {
    panel.classList.remove('enter')
    panel.classList.add('exit')
  }

  setTimeout(() => {
    onStepChange()
  }, EXIT_MS)
}

/* ============================================================
   Dodge "No" button
   ============================================================ */
const VIEWPORT_PADDING = 16
const HOVER_BUFFER = 14
const YES_AVOID_PAD = 24
const FALLBACK_BTN_W = 100
const FALLBACK_BTN_H = 46

let dodgeCount = 0

function getViewportBounds(noBtn) {
  const btnW = noBtn?.offsetWidth || FALLBACK_BTN_W
  const btnH = noBtn?.offsetHeight || FALLBACK_BTN_H
  const edge = VIEWPORT_PADDING + HOVER_BUFFER

  return {
    btnW,
    btnH,
    minLeft: edge,
    minTop: edge,
    maxLeft: Math.max(edge, window.innerWidth - btnW - edge),
    maxTop: Math.max(edge, window.innerHeight - btnH - edge),
  }
}

function overlapsYes(yesBtn, left, top, btnW, btnH) {
  if (!yesBtn) return false
  const r = yesBtn.getBoundingClientRect()
  return !(
    left + btnW + YES_AVOID_PAD < r.left ||
    left > r.right + YES_AVOID_PAD ||
    top + btnH + YES_AVOID_PAD < r.top ||
    top > r.bottom + YES_AVOID_PAD
  )
}

function pickSafePosition(noBtn, yesBtn) {
  const { minLeft, minTop, maxLeft, maxTop, btnW, btnH } = getViewportBounds(noBtn)

  for (let i = 0; i < 30; i++) {
    const left = randBetween(minLeft, maxLeft)
    const top = randBetween(minTop, maxTop)
    if (!overlapsYes(yesBtn, left, top, btnW, btnH)) {
      return { left, top }
    }
  }
  return { left: minLeft, top: maxTop }
}

function placeInitial(noBtn, yesBtn) {
  const { minLeft, maxLeft, minTop, maxTop, btnW, btnH } = getViewportBounds(noBtn)
  const fallback = {
    left: Math.max(minLeft, Math.min(maxLeft, window.innerWidth / 2 - btnW / 2)),
    top: Math.max(minTop, Math.min(maxTop, minTop + 8)),
  }

  if (!yesBtn) return fallback

  for (let i = 0; i < 30; i++) {
    const left = randBetween(minLeft, maxLeft)
    const top = randBetween(minTop, maxTop)
    if (!overlapsYes(yesBtn, left, top, btnW, btnH)) {
      return { left, top }
    }
  }

  return fallback
}

const PLAYFUL_NUDGES = (count) =>
  count === 0
    ? ''
    : count < 3
      ? 'Nice try 😏'
      : count < 6
        ? 'Eta click hobe na…'
        : count < 10
          ? ' thamo picci 😑'
          : 'ami ki ato tay kharab🥺.'

function setupDodgeButton(noBtn, yesBtn, onDodge) {
  const applyPos = (pos) => {
    noBtn.style.left = `${pos.left}px`
    noBtn.style.top = `${pos.top}px`
  }

  applyPos(placeInitial(noBtn, yesBtn))
  requestAnimationFrame(() => applyPos(placeInitial(noBtn, yesBtn)))

  const handleRejectAttempt = (e) => {
    e.preventDefault()
    spawnRipple(e)
    applyPos(pickSafePosition(noBtn, yesBtn))
    onDodge?.()
  }

  noBtn.addEventListener('mouseenter', handleRejectAttempt)
  noBtn.addEventListener('touchstart', handleRejectAttempt, { passive: false })
  noBtn.addEventListener('click', handleRejectAttempt)

  const clampToViewport = () => {
    const { minLeft, minTop, maxLeft, maxTop } = getViewportBounds(noBtn)
    const currentLeft = parseFloat(noBtn.style.left) || 0
    const currentTop = parseFloat(noBtn.style.top) || 0
    applyPos({
      left: Math.min(Math.max(currentLeft, minLeft), maxLeft),
      top: Math.min(Math.max(currentTop, minTop), maxTop),
    })
  }
  window.addEventListener('resize', clampToViewport)
}

/* ============================================================
   Small decorative markup builders
   ============================================================ */
function flowerMarkup(side) {
  return `
    <div class="lp-flower lp-flower--${side}" aria-hidden="true">
      <div class="lp-flower-glow"></div>
      <div class="lp-flower-petals">
        <span class="lp-flower-petal" style="--i:0"></span>
        <span class="lp-flower-petal" style="--i:1"></span>
        <span class="lp-flower-petal" style="--i:2"></span>
        <span class="lp-flower-petal" style="--i:3"></span>
        <span class="lp-flower-petal" style="--i:4"></span>
        <span class="lp-flower-petal" style="--i:5"></span>
      </div>
      <div class="lp-flower-center"></div>
      <span class="lp-flower-sparkle"></span>
      <span class="lp-flower-sparkle"></span>
      <span class="lp-flower-sparkle"></span>
      <span class="lp-flower-leaf"></span>
    </div>`
}

function heartMarkup(side) {
  return `
    <div class="lp-heart lp-heart--${side}" aria-hidden="true">
      <div class="lp-heart-glow"></div>
      <div class="lp-heart-ring"></div>
      <div class="lp-heart-shape"></div>
      <span class="lp-heart-shine"></span>
      <span class="lp-heart-sparkle"></span>
      <span class="lp-heart-sparkle"></span>
    </div>`
}

/* ============================================================
   Main app state + render
   ============================================================ */
const totalQuestions = CONFIG.questions.length
let step = 0

function render() {
  const card = document.getElementById('lpCard')
  const isQuestionStep = step < totalQuestions
  const isProposalStep = step === totalQuestions
  const isAcceptedStep = step === totalQuestions + 1

  // Remove any lingering dodge button from a previous render
  const oldNoBtn = document.getElementById('lpNoBtn')
  if (oldNoBtn) oldNoBtn.remove()

  if (isQuestionStep) {
    const q = CONFIG.questions[step]
    card.innerHTML = `
      <div class="lp-question-panel enter">
        <div class="lp-q-progress">
          <span class="lp-q-step-label">${String(step + 1).padStart(2, '0')} / ${String(totalQuestions).padStart(2, '0')}</span>
          <div class="lp-q-progress-track" aria-hidden="true">
            <div class="lp-q-progress-fill" style="width:${((step + 1) / totalQuestions) * 100}%"></div>
          </div>
          <div class="lp-dots" role="progressbar" aria-valuenow="${step + 1}" aria-valuemin="1" aria-valuemax="${totalQuestions}">
            ${CONFIG.questions
        .map((_, i) => `<span class="lp-dot${i < step ? ' done' : ''}${i === step ? ' active' : ''}"></span>`)
        .join('')}
          </div>
        </div>
        <div class="lp-question-top">
          <div class="lp-question-hearts">
            ${heartMarkup('left')}
            ${heartMarkup('right')}
          </div>
          <div class="lp-question-header">
            ${flowerMarkup('left')}
            <div class="lp-question-header-text">
              <div class="lp-question-text">${q.text}</div>
              <div class="lp-question-sub">${q.sub}</div>
            </div>
            ${flowerMarkup('right')}
          </div>
        </div>
        <div class="lp-q-flourish" aria-hidden="true">♡ ♡ ♡</div>
        <div class="lp-options">
          ${q.options.map((opt) => `<button class="lp-btn lp-btn-ghost"><span class="lp-btn-label">${opt}</span></button>`).join('')}
        </div>
      </div>`

    card.querySelectorAll('.lp-options .lp-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        spawnRipple(e)
        advanceWithTransition(e, () => {
          step += 1
          render()
        })
      })
    })
  } else if (isProposalStep) {
    card.innerHTML = `
      <div class="lp-stage enter">
        <div class="lp-stage-inner">
          <div style="font-weight:bold" class="lp-signature-line">${CONFIG.signatureLine}</div>
          <div style="font-weight:bold" class="lp-headline">${CONFIG.finalHeadline}</div>
          <div style="font-weight:bold" class="lp-subline">${CONFIG.finalSub}</div>
          <div class="lp-subline" style="margin-top:6px;font-weight:bold">${CONFIG.finalQuestion}</div>
          <div style="font-weight:bold" class="lp-big-question">${CONFIG.bigQuestion}</div>

          <div class="lp-proposal-actions">
            <div class="lp-btn-row">
              <button id="lpYesBtn" class="lp-btn lp-btn-primary lp-btn-yes">
                <span class="lp-btn-label">${CONFIG.acceptLabel}</span>
              </button>
            </div>
            <div class="lp-nudge" id="lpNudge"></div>
          </div>
        </div>
      </div>`

    const yesBtn = document.getElementById('lpYesBtn')
    yesBtn.addEventListener('click', (e) => {
      spawnRipple(e)
      advanceWithTransition(e, () => {
        step += 1
        render()
      })
    })

    // Dodging "No" button, appended straight to <body> (like a React portal)
    const noBtn = document.createElement('button')
    noBtn.id = 'lpNoBtn'
    noBtn.type = 'button'
    noBtn.className = 'lp-btn-no'
    noBtn.setAttribute('aria-label', "This button can't actually be pressed")
    noBtn.innerHTML = `<span class="lp-btn-label">${CONFIG.rejectLabel}</span>`
    document.body.appendChild(noBtn)

    setupDodgeButton(noBtn, yesBtn, () => {
      dodgeCount += 1
      const nudge = document.getElementById('lpNudge')
      if (nudge) nudge.textContent = PLAYFUL_NUDGES(dodgeCount)
    })
  } else if (isAcceptedStep) {
    card.innerHTML = `
      <div class="lp-success-panel enter">
        <div class="lp-teddy">o((>ω< ))o💗</div>
        <div class="lp-success-title">${CONFIG.successTitle}</div>
        <div class="lp-success-msg">${CONFIG.successMessage}</div>
        <div class="lp-pulse-hearts">
          <span>❤️</span>
          <span>💖</span>
          <span>💕</span>
        </div>
      </div>`

    document.body.appendChild(renderCelebrationBurst())
  }
}

/* ============================================================
   Init
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderFloatingHearts()
  render()
})

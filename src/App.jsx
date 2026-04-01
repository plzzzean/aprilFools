import { useEffect, useRef, useState } from 'react'
import bride00 from './assets/bride00.jpeg'
import bride01 from './assets/bride01.jpeg'
import broom02 from './assets/broom02.jpeg'
import flower from './assets/flower.jpeg'
import hall from './assets/hall01.jpeg'
import map01 from './assets/map01.jpg'
import sea from './assets/sea.jpeg'

const galleryImages = [
  {
    src: flower,
    alt: '플라워 데코',
  },
  {
    src: bride01,
    alt: '신부 사진',
  },
  {
    src: hall,
    alt: '웨딩홀 사진',
  },
]

const contacts = [
  { role: 'GROOM', name: '김동준', phone: '010-1234-5678', href: 'tel:01012345678' },
  { role: 'BRIDE', name: '김하연', phone: '010-8765-4321', href: 'tel:01087654321' },
]

const invitationPortraits = [
  {
    role: 'GROOM',
    name: '김동준',
    src: broom02,
    alt: '신랑 김동준',
  },
  {
    role: 'BRIDE',
    name: '김하연',
    src: bride00,
    alt: '신부 김하연',
  },
]

function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`${className} reveal-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  )
}

function App() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAccountCopied, setIsAccountCopied] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSelectedImageIndex((currentIndex) => (currentIndex + 1) % galleryImages.length)
    }, 5200)

    return () => window.clearInterval(interval)
  }, [])

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText('3333-09-4745340')
      setIsAccountCopied(true)
      window.setTimeout(() => setIsAccountCopied(false), 2000)
    } catch {
      setIsAccountCopied(false)
    }
  }

  return (
    <div className="min-h-screen bg-white px-0 pb-6 pt-0 text-[#111111] sm:px-0 sm:pb-10 sm:pt-0">
      <main className="mx-auto max-w-[420px]">
        <section className="sticky top-0 min-h-[100svh] overflow-hidden bg-black text-white">
          <img
            src={sea}
            alt="신랑 신부 웨딩 사진"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.22)_35%,rgba(0,0,0,0.62)_100%)]" />

          <div className="relative flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
            <p className="text-center text-[10px] tracking-[0.4em] text-white/78">WEDDING INVITATION</p>

            <div className="pb-6 text-center">
              <p className="text-[11px] tracking-[0.28em] text-white/78">2026. 09. 05 SAT 1:00 PM</p>
              <h1 className="font-display mt-4 text-[28px] leading-[1.08] tracking-[0.05em] text-white sm:text-[36px] sm:tracking-[0.08em]">
                <span className="block sm:inline">DONGJUN</span>
                <span className="my-1 block text-white/50 sm:mx-2 sm:my-0 sm:inline">&amp;</span>
                <span className="block sm:inline">HAYEON</span>
              </h1>
              <p className="mt-4 text-[13px] leading-7 text-white/82">
                함께하는 모든 계절의 시작을
                <br />
                소중한 분들과 나누고 싶습니다
              </p>
              <div className="mt-8 flex justify-center">
                <div className="flex flex-col items-center gap-2 text-white/70">
                  <span className="text-[9px] tracking-[0.32em]">SCROLL</span>
                  <span className="h-10 w-px bg-white/45" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10 -mt-8 bg-white sm:-mt-10">
          <RevealSection
            className="border-b border-black/10 px-5 py-10 sm:px-6"
            delay={0}
          >
            <div className="text-center">
              <p className="font-display text-[11px] tracking-[0.32em] text-black/45">INVITATION</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                {invitationPortraits.map((portrait) => (
                  <div key={portrait.role}>
                    <div className="overflow-hidden bg-black/[0.03]">
                      <img
                        src={portrait.src}
                        alt={portrait.alt}
                        className="h-[180px] w-full object-cover sm:h-[220px]"
                      />
                    </div>
                    <p className="mt-3 text-[10px] tracking-[0.22em] text-black/42">{portrait.role}</p>
                    <p className="font-display mt-1 text-[20px] text-black">{portrait.name}</p>
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-5 max-w-[280px] text-[13px] leading-8 text-black/72">
                저희 두 사람이 사랑으로 하나 되어
                <br />
                평생을 함께할 소중한 약속을 합니다.
                <br />
                따뜻한 마음으로 오셔서
                <br />
                새로운 출발을 축복해 주시면 감사하겠습니다.
              </p>
            </div>
          </RevealSection>

          <RevealSection className="border-b border-black/10 px-5 py-10 sm:px-6" delay={40}>
            <div className="text-center">
              <p className="font-display text-[11px] tracking-[0.32em] text-black/45">WEDDING DAY & LOCATION</p>
              <p className="font-display mt-4 text-[24px] leading-tight text-black sm:text-[26px]">
                2026년 9월 5일 토요일
              </p>
              <p className="mt-2 text-[12px] tracking-[0.16em] text-black/58">오후 1시, 그랜드힐 컨벤션</p>

              <div className="mx-auto mt-7 h-px w-10 bg-black/20" />

              <h2 className="font-display mt-7 text-[26px] text-black sm:text-[28px]">그랜드힐 컨벤션</h2>
              <p className="mt-3 text-[13px] leading-7 text-black/72">
                서울시 강남구 역삼로 607
                <br />
                대치동 1004-3
              </p>
              <div className="mt-6 text-left text-[12px] leading-7 text-black/58">
                지하철 2호선 삼성역 1번 출구
                <br />
                셔틀버스 수시 운행, 도보 약 5분
                <br />
                버스 143, 146, 341, 360, 363, 401
                <br />
                자가용 이용 시 강남경찰서, 강남운전면허시험장 인근
              </div>
              <div className="mt-6 overflow-hidden border border-black/10 bg-black/[0.02]">
                <img
                  src={map01}
                  alt="그랜드힐컨벤션 오시는 길 지도"
                  className="h-[260px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <a
                href="https://map.naver.com/p/search/%EA%B7%B8%EB%9E%9C%EB%93%9C%ED%9E%90%EC%BB%A8%EB%B2%A4%EC%85%98/place/36462628?placePath=/home?entry=pll&from=nx&fromNxList=true&from=map&fromPanelNum=2&timestamp=202604011826&locale=ko&svcName=map_pcv5&searchText=%EA%B7%B8%EB%9E%9C%EB%93%9C%ED%9E%90%EC%BB%A8%EB%B2%A4%EC%85%98&c=14144074.0267016,4509879.9131324,15,0,0,0,dh"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center border border-black px-5 py-3 text-[11px] tracking-[0.2em] text-black transition hover:bg-black hover:text-white sm:w-auto"
              >
                NAVER MAP
              </a>
            </div>
          </RevealSection>

          <RevealSection className="border-b border-black/10 px-5 py-10 sm:px-6" delay={80}>
            <p className="font-display text-center text-[11px] tracking-[0.32em] text-black/45">GALLERY</p>
            <div className="mt-5">
              <div className="relative overflow-hidden bg-black/[0.03]">
                {galleryImages.map((image, index) => (
                  <img
                    key={image.alt}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1200 ${
                      index === selectedImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="pointer-events-none h-[420px] w-full sm:h-[520px]" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.alt}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`overflow-hidden border transition ${
                      index === selectedImageIndex ? 'border-black' : 'border-black/10'
                    }`}
                    aria-label={`${image.alt} 보기`}
                    aria-pressed={index === selectedImageIndex}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`h-24 w-full object-cover sm:h-28 ${
                        index === selectedImageIndex ? 'opacity-100' : 'opacity-70'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection className="border-b border-black/10 px-5 py-10 sm:px-6" delay={100}>
            <div className="text-center">
              <p className="font-display text-[11px] tracking-[0.32em] text-black/45">ACCOUNT</p>
              <p className="mt-5 text-[13px] leading-7 text-black/68">
                방문이 어려우신 분들을 위해
                <br />
                축하의 마음 전하실 계좌를 안내드립니다.
              </p>
              <div className="mt-6 border border-black/10 px-4 py-5">
                <p className="text-[11px] tracking-[0.22em] text-black/45">KAKAO BANK</p>
                <p className="font-display mt-3 text-[24px] text-black">류진</p>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <p className="text-[15px] tracking-[0.08em] text-black">3333-09-4745340</p>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="inline-flex h-8 w-8 items-center justify-center text-black/60 transition hover:text-black"
                    aria-label="계좌번호 복사"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="9" y="9" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M7 15H6a1 1 0 0 1-1-1V6.5A1.5 1.5 0 0 1 6.5 5h7.5A1 1 0 0 1 15 6v1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mt-3 text-[11px] text-black/45">
                  {isAccountCopied ? '계좌번호가 복사되었습니다.' : '오른쪽 아이콘을 눌러 복사할 수 있습니다.'}
                </p>
              </div>
            </div>
          </RevealSection>

          <RevealSection className="border-b border-black/10 px-5 py-10 sm:px-6" delay={120}>
            <div className="text-center">
              <p className="font-display text-[11px] tracking-[0.32em] text-black/45">CONTACT</p>
              <div className="mt-7 grid grid-cols-1 gap-5 text-left sm:grid-cols-2">
                {contacts.map((contact) => (
                  <div key={contact.role} className="border-t border-black/10 pt-4">
                    <p className="text-[10px] tracking-[0.28em] text-black/40">{contact.role}</p>
                    <p className="font-display mt-2 text-[24px] leading-none text-black">{contact.name}</p>
                    <p className="mt-2 text-[13px] text-black/65">{contact.phone}</p>
                    <a
                      href={contact.href}
                      className="mt-4 inline-flex items-center border-b border-black/40 pb-1 text-[11px] tracking-[0.18em] text-black/70"
                    >
                      CALL
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <footer className="px-5 py-8 text-center text-[10px] tracking-[0.24em] text-black/42 sm:px-6">
            FROM OUR FIRST DAY TO FOREVER
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App

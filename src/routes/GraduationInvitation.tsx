import { useEffect, useRef, useState } from 'react';
import { CEREMONY_START, getCeremonyTime } from './graduationTime';
import './GraduationInvitation.css';

function BackgroundMusic() {
  const context = useRef<AudioContext | null>(null);
  const interval = useRef<number | null>(null);
  const busy = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => () => {
    if (interval.current !== null) window.clearInterval(interval.current);
    void context.current?.close();
  }, []);

  async function toggleMusic() {
    if (busy.current) return;
    busy.current = true;
    try {
      if (context.current) {
        if (interval.current !== null) window.clearInterval(interval.current);
        interval.current = null;
        await context.current.close();
        context.current = null;
        setPlaying(false);
        return;
      }
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) { setError(true); return; }
      const audio = new AudioCtx();
      context.current = audio;
      await audio.resume();
      let note = 0;
      const playTone = () => {
        const frequencies = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        const now = audio.currentTime;
        osc.type = 'sine';
        osc.frequency.value = frequencies[note++ % frequencies.length];
        gain.gain.setValueAtTime(.0001, now);
        gain.gain.exponentialRampToValueAtTime(.036, now + .08);
        gain.gain.exponentialRampToValueAtTime(.0001, now + 1.1);
        osc.connect(gain).connect(audio.destination);
        osc.start(now);
        osc.stop(now + 1.12);
      };
      playTone();
      interval.current = window.setInterval(playTone, 650);
      setPlaying(true);
      setError(false);
    } catch {
      if (interval.current !== null) window.clearInterval(interval.current);
      interval.current = null;
      await context.current?.close().catch(() => {});
      context.current = null;
      setPlaying(false);
      setError(true);
    } finally {
      busy.current = false;
    }
  }

  return <button className="sound" type="button" id="musicBtn" aria-pressed={playing} onClick={() => void toggleMusic()}>
    {error ? 'KHÔNG HỖ TRỢ ÂM THANH' : playing ? '♫ TẮT NHẠC' : '♫ BẬT NHẠC'}
  </button>;
}

export function GraduationInvitation() {
  const root = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(Date.now);
  const { values } = getCeremonyTime(now);
  const started = now >= CEREMONY_START;

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    const refresh = () => setNow(Date.now());
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    element.classList.add('js-animations');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .13 });
    element.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => { observer.disconnect(); element.classList.remove('js-animations'); };
  }, []);

  useEffect(() => {
    const title = document.title;
    const language = document.documentElement.lang;
    const metadata = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="description"], meta[property="og:title"], meta[property="og:description"]'));
    const originals = metadata.map(meta => meta.content);
    document.title = 'Nguyễn Thành Trung | Graduation Ceremony 2026';
    document.documentElement.lang = 'vi';
    metadata.forEach(meta => { meta.content = meta.getAttribute('property') === 'og:title'
      ? document.title
      : 'Thư mời lễ tốt nghiệp Nguyễn Thành Trung – FPT University HCM, 10:00–12:00 ngày 07.11.2026'; });
    return () => {
      document.title = title;
      document.documentElement.lang = language;
      metadata.forEach((meta, i) => { meta.content = originals[i]; });
    };
  }, []);

  return <div className="graduation-site" ref={root}>

<header className="topbar"><div className="logo">ĐẠI HỌC FPT<br />TP. HỒ CHÍ MINH</div><div className="nav-actions"><span className="tiny">LỄ TỐT NGHIỆP 2026</span><BackgroundMusic /></div></header>
<main><div className="hero"><div className="halo" aria-hidden="true"></div><div className="arch" aria-hidden="true"></div><div className="arch two" aria-hidden="true"></div><div className="star a">✧</div><div className="star b">✧</div><div className="star c">✧</div><div className="hero-content"><div className="eyebrow">GRADUATION CEREMONY 2026</div><h1>Chặng Đường <em>Mới.</em></h1><div className="hero-line"></div><div className="eyebrow">TRÂN TRỌNG KÍNH MỜI BẠN ĐẾN CHUNG VUI CÙNG</div><div className="hero-name">NGUYỄN THÀNH TRUNG</div><div className="hero-date">07 THÁNG 11 NĂM 2026 — 10:00 – 12:00</div></div><div className="hero-bottom"><span>KỸ THUẬT PHẦN MỀM</span><span className="scroll-cue">CUỘN ĐỂ KHÁM PHÁ ↓</span></div></div>
<section className="intro"><div className="reveal"><div className="section-label">01 / LỜI MỜI TỪ TRUNG</div><h2>Khoảnh khắc <em>đáng nhớ.</em></h2><p>Sau những năm tháng học tập, những dự án, thử thách và kỷ niệm đáng nhớ, một cột mốc mới đã đến.</p><p>Trung trân trọng mời bạn đến chung vui trong buổi lễ tốt nghiệp. Sự hiện diện của bạn sẽ khiến ngày đặc biệt này trở nên trọn vẹn hơn.</p><p><strong>Nguyễn Thành Trung</strong><br />Cử nhân ngành Kỹ thuật phần mềm<br />Đại học FPT TP. Hồ Chí Minh</p></div><div className="reveal"><div className="stamp"><div className="stamp-inner"><img className="graduation-photo" src="/images/nguyen-thanh-trung-tot-nghiep.jpeg" alt="Ảnh tốt nghiệp của Nguyễn Thành Trung tại Đại học FPT" width={1366} height={2049} loading="lazy" decoding="async" /></div></div></div></section>
<div className="quote"><div className="section-label reveal">KHỞI ĐẦU MỚI</div><blockquote className="reveal">“Mỗi hành trình khép lại đều mở ra <em>một khởi đầu đầy hứa hẹn.</em>”</blockquote><div className="tiny reveal">HÀNH TRÌNH VẪN TIẾP DIỄN · 2026</div></div>
<section className="details"><div className="section-label reveal">02 / THÔNG TIN BUỔI LỄ</div><h2 className="reveal">Hẹn gặp bạn nhé.</h2><div className="detail-grid reveal"><div className="detail-item"><div className="section-label">NGÀY</div><div className="value">07.11.2026</div><p>Thứ Bảy</p></div><div className="detail-item"><div className="section-label">THỜI GIAN</div><div className="value">10:00 – 12:00</div><p>Giờ Việt Nam (GMT+7)</p></div><div className="detail-item"><div className="section-label">ĐỊA ĐIỂM</div><div className="value">Đại học FPT</div><p>7 Đ. D1, Tăng Nhơn Phú<br />Hồ Chí Minh 700000</p></div></div><a className="map-link reveal" href="https://www.google.com/maps/search/?api=1&query=FPT%20University%20HCM%207%20D1%20Tang%20Nhon%20Phu" target="_blank" rel="noopener noreferrer">XEM ĐƯỜNG ĐI ↗</a></section>
<section className="count-wrap"><div className="section-label reveal">03 / ĐẾM NGƯỢC</div><div className="count-title reveal">Đếm từng khoảnh khắc.</div><div className="count reveal" role="timer" aria-label="Đếm ngược đến lễ tốt nghiệp"><div><strong id="days">{String(values[0]).padStart(2, '0')}</strong><span>Ngày</span></div><div><strong id="hours">{String(values[1]).padStart(2, '0')}</strong><span>Giờ</span></div><div><strong id="minutes">{String(values[2]).padStart(2, '0')}</strong><span>Phút</span></div><div><strong id="seconds">{String(values[3]).padStart(2, '0')}</strong><span>Giây</span></div></div><p id="countMessage" style={{ fontSize: 12, margin: '35px auto 0', letterSpacing: '.1em' }}>{started ? 'NGÀY TỐT NGHIỆP ĐÃ ĐẾN — CÙNG CHUNG VUI NHÉ!' : '07 THÁNG 11 NĂM 2026 · 10:00 (GMT+7)'}</p></section>

</main><footer className="footer"><div className="section-label">VỚI TẤT CẢ LÒNG BIẾT ƠN</div><h2>Cảm ơn bạn đã<br /><em>đồng hành cùng Trung.</em></h2><small>NGUYỄN THÀNH TRUNG · ĐẠI HỌC FPT TP. HỒ CHÍ MINH · 2026</small></footer>

</div>;
}

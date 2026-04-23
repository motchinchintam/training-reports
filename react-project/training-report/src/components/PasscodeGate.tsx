import { useState } from 'react';

const CODE = '250798';
const SESSION_KEY = 'hub-unlocked';

interface PasscodeGateProps {
  onUnlock: () => void;
}

export function isHubUnlocked(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export default function PasscodeGate({ onUnlock }: PasscodeGateProps) {
  const [digits, setDigits] = useState('');
  const [error, setError]   = useState(false);
  const [shake, setShake]   = useState(false);

  function press(d: string) {
    if (digits.length >= 6) return;
    const next = digits + d;
    setDigits(next);
    setError(false);
    if (next.length === 6) {
      if (next === CODE) {
        sessionStorage.setItem(SESSION_KEY, '1');
        onUnlock();
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => { setDigits(''); setShake(false); }, 700);
      }
    }
  }

  function del() {
    setDigits(d => d.slice(0, -1));
    setError(false);
  }

  const KEYS = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['','0','⌫'],
  ];

  return (
    <div className="pg-overlay">
      <div className="pg-card">
        <div className="pg-lock">🔒</div>
        <h2 className="pg-title">Enter Passcode</h2>
        <p className="pg-sub">This area is protected. Enter your 6-digit passcode to continue.</p>

        {/* Dot indicators */}
        <div className={`pg-dots${shake ? ' pg-shake' : ''}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`pg-dot${i < digits.length ? ' pg-dot--filled' : ''}${error ? ' pg-dot--error' : ''}`} />
          ))}
        </div>
        {error && <p className="pg-error">Incorrect passcode. Try again.</p>}

        {/* Numpad */}
        <div className="pg-numpad">
          {KEYS.map((row, ri) => (
            <div key={ri} className="pg-numpad-row">
              {row.map((k, ki) => (
                k === '' ? (
                  <div key={ki} className="pg-key pg-key--empty" />
                ) : k === '⌫' ? (
                  <button key={ki} className="pg-key pg-key--del" onClick={del}>⌫</button>
                ) : (
                  <button key={ki} className="pg-key" onClick={() => press(k)}>{k}</button>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

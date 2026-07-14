'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BasedJoeyReport() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const ok = cookies.some(c => c.startsWith('dgt.forensic='));
    if (!ok) {
      router.replace('/based_joey');
    } else {
      setAuthed(true);
    }
  }, [router]);

  if (!authed) return null;

  return (
    <iframe
      src="/forensics/based_joey/report.html"
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      title="Forensic Profile — u/based_joey"
    />
  );
}

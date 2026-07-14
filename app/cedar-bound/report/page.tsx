'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CedarBoundReport() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Cookie check on client — middleware already guards server-side
    const cookies = document.cookie.split(';').map(c => c.trim());
    const ok = cookies.some(c => c.startsWith('dgt.forensic='));
    if (!ok) {
      router.replace('/cedar-bound');
    } else {
      setAuthed(true);
    }
  }, [router]);

  if (!authed) return null;

  return (
    <iframe
      src="/forensics/cedar-bound/report.html"
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      title="Forensic Profile — u/cedar-bound"
    />
  );
}

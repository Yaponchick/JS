
import React, { useState } from 'react';

const AutoQRGenerator: React.FC = () => {
  // 🔽 Твоя заранее заданная ссылка
  const defaultUrl = 'https://example.com';

  // Генерируем URL для QR-кода
  const [qrCodeUrl] = useState<string>(
    `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(defaultUrl)}`
  );

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'Arial' }}>
      <h2>Ваш QR-код</h2>
      <p>Ссылка: <code>{defaultUrl}</code></p>
      <div style={{ marginTop: '20px' }}>
        <img src={qrCodeUrl} alt="QR Code" style={{ border: '1px solid #ddd', padding: '8px' }} />
      </div>
    </div>
  );
};

export default AutoQRGenerator;

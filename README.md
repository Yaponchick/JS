
import React, { useState, FormEvent, useRef } from 'react';

const QRGenerator: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cardQrRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value.trim();

    if (!inputValue) return;

    // Сброс состояния
    setIsOpen(false);
    setQrCodeUrl('');

    // Генерация URL для QR-кода
    const apiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(inputValue)}`;
    setQrCodeUrl(apiQrUrl);

    // Через небольшую задержку показываем блок (чтобы избежать мерцания)
    setTimeout(() => {
      setIsOpen(true);
    }, 10);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Введите текст или ссылку"
          required
        />
        <button type="submit">Сгенерировать QR-код</button>
      </form>

      <div
        ref={cardQrRef}
        className={`card-qr ${isOpen ? 'open' : ''}`}
        style={{ marginTop: '20px', textAlign: 'center' }}
      >
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
      </div>
    </div>
  );
};

export default QRGenerator;

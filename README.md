
import React from 'react';
import QRCode from 'qrcode.react';

const QRAuthPage: React.FC = () => {
  const data = 'https://your-app.com/login/qr?token=abc123'; // что кодирует QR

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Отсканируйте QR-код для входа</h2>
      <QRCode
        value={data}
        size={200}           // размер: 200x200 пикселей
        level="H"            // уровень коррекции ошибок (H = высокий)
        includeMargin={true}
        bgColor="#ffffff"
        fgColor="#000000"
      />
      <p style={{ marginTop: '20px', color: '#666' }}>
        Откройте приложение и наведите камеру
      </p>
    </div>
  );
};

export default QRAuthPage;

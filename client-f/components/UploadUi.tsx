'use client';

import { useState } from 'react';
import { UploadButton } from '../utils/uploadthing';

export default function UploadUI() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-6">
      <h2 className="text-xl font-bold text-blue-800">📤 Загрузка изображения</h2>

      <UploadButton
        endpoint="imageUploader"
        onUploadBegin={() => console.log('Начало загрузки')}
        onClientUploadComplete={(res) => {
          const url = res?.[0]?.url;
          if (url) setImageUrl(url);
        }}
        onUploadError={(err) => alert('Ошибка: ' + err.message)}
        appearance={{
          button: 'bg-sky-600 text-white font-semibold px-4 py-2 rounded hover:bg-sky-700 transition',
        }}
      />

      {imageUrl && (
        <div className="space-y-2">
          <a href={imageUrl} target="_blank" className="text-blue-600 underline break-all">
            {imageUrl}
          </a>
          <img src={imageUrl} alt="Загруженное" className="rounded-lg border max-h-60 object-cover" />
        </div>
      )}
    </div>
  );
}

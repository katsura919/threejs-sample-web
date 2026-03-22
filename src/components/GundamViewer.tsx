'use client';

interface Props {
  modelId: string;
}

const EMBED_PARAMS = 'autostart=1&ui_theme=dark&ui_infos=0';

export default function GundamViewer({ modelId }: Props) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <iframe
        key={modelId}
        src={`https://sketchfab.com/models/${modelId}/embed?${EMBED_PARAMS}`}
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'auto' }}
      />
    </div>
  );
}

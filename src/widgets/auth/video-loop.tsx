'use client';

export function VideoLoop() {
  return (
    <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden rounded-lg p-4">
      <video
        className="w-full h-full object-cover rounded-lg"
        autoPlay
        loop
        muted
      >
        <source src="/auth-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

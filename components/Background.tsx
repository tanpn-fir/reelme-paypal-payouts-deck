export default function Background() {
  return (
    <div className="bg" aria-hidden>
      <video
        className="wave-video"
        src="/superai/wave-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
